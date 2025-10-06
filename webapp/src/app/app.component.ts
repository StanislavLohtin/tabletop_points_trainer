import {Component, OnInit, signal} from '@angular/core';
import {Card, CARDS, Empire, EmpireDeck, EMPIRES, Layout, LAYOUTS} from "./shared";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public empires = signal<Empire[]>(EMPIRES);
  public allCards = signal<Card[]>(CARDS);
  private playerTracker = 0;

  public playersCards = signal<Card[][]>([
    [], // Player 1 (Top)
    [], // Player 2 (Left)
    [], // Player 3 (Right)
    [], // Player 4 (Bottom)
  ]);
  public groupedEmpireDecks: EmpireDeck[] = this.buildDecks();
  public draggedEmpireIndex = signal<number | null>(null);
  public orderedEmpires = signal<Empire[]>([]);
  protected layouts: Layout[] = LAYOUTS;
  protected showingPoints = false;

  getEmpireCards(empireId: number): Card[] {
    return this.allCards().filter((card: Card) => card.empire.id === empireId);
  }

  resetGame(): void {
    // Reset playersCards to four empty arrays
    this.playersCards.set([[], [], [], []]);
    this.playerTracker = 0;
    this.groupedEmpireDecks = this.buildDecks();
    console.log("Game state reset! Player hands are now empty.");
  }

  ngOnInit(): void {
    this.resetGame();
    this.resetEmpireOrder();
  }

  addCardToPlayer(card: Card) {
    if (this.playerTracker >= 28) {
      return;
    }
    this.playersCards()[this.playerTracker % 4].push(card);
    this.playerTracker++;
    this.pickCardFromDeck(card);
  }

  pickCardFromDeck(card: Card) {
    this.groupedEmpireDecks.map(deck => deck.cards.indexOf(card) > -1 ? deck.cards.splice(deck.cards.indexOf(card), 1) : '');
  }

  buildDecks(): EmpireDeck[] {
    return EMPIRES.map(empire => {
      const cards = CARDS.filter(card => card.empire.id === empire.id);

      const sortedCards = cards.slice().sort((a, b) => {
        const hasLetterA = !!a.letter;
        const hasLetterB = !!b.letter;
        if (hasLetterA && !hasLetterB) {
          return 1; // A comes after B (A is placed on top)
        }
        if (!hasLetterA && hasLetterB) {
          return -1; // A comes before B (B is placed on top)
        }
        if (hasLetterA && hasLetterB) {
          return b.letter!.localeCompare(a.letter!);
        }
        return a.value - b.value;
      });

      return {
        empire: empire,
        cards: sortedCards
      };
    });
  }

  onDragStart(index: number): void {
    this.draggedEmpireIndex.set(index);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault(); // Necessary to allow dropping
  }

  onDrop(dropIndex: number): void {
    const startIndex = this.draggedEmpireIndex();
    if (startIndex === null || startIndex === dropIndex) {
      this.draggedEmpireIndex.set(null);
      return;
    }

    this.orderedEmpires.update(currentEmpires => {
      const newOrder = [...currentEmpires];
      const [removed] = newOrder.splice(startIndex, 1);
      newOrder.splice(dropIndex, 0, removed);
      return newOrder;
    });

    this.draggedEmpireIndex.set(null);
  }

  resetEmpireOrder(): void {
    this.orderedEmpires.set([...EMPIRES]);
  }

  applyLayout(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const layoutId = selectElement.value;
    const layout = this.layouts.find(l => l.id + '' == layoutId);

    if (!layout) return;

    this.playersCards.set([[], [], [], []]);
    this.allCards.set([...CARDS]);

    const dealtCardIds = new Set<number>();
    const newPlayerHands: Card[][] = [[], [], [], []];

    layout.distribution.forEach((playerCards, playerIndex) => {
      playerCards.cards.forEach(card => {
        if (card && !dealtCardIds.has(card.id)) {
          newPlayerHands[playerIndex].push(card);
          this.pickCardFromDeck(card);
          dealtCardIds.add(card.id);
        }
      });
    });

    this.playersCards.set(newPlayerHands);
    this.allCards.update(currentCards => currentCards.filter(c => !dealtCardIds.has(c.id)));
    this.playerTracker = dealtCardIds.size;
  }

  private findCard(empireName: string, letter: string): Card | undefined {
    const empire = EMPIRES.find(e => e.name.toLowerCase() === empireName.toLowerCase());
    if (!empire) {
      console.warn(`Empire "${empireName}" not found.`);
      return undefined;
    }
    return CARDS.find(c => c.empire.id === empire.id && c.letter === letter);
  }

  togglePoints() {
    this.showingPoints = !this.showingPoints;
  }

  getEmpiresRating(e: Empire): number {
    return 7 - this.orderedEmpires().indexOf(e);
  }

  calculatePointsForPlayer(playerIndex: number) {
    return this.playersCards()[playerIndex].map(c => c.value * this.getEmpiresRating(c.empire)).reduce((a, b) => a + b, 0);
  }
}
