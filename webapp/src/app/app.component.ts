import {Component, OnInit, signal} from '@angular/core';
import {Card, CARDS, Empire, EmpireDeck, EMPIRES} from "./shared";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public empires = signal<Empire[]>(EMPIRES);
  public allCards = signal<Card[]>(CARDS);
  private playerTracker = 0;

  // State for cards in players' hands (4 players)
  // Initialized with empty hands
  public playersCards = signal<Card[][]>([
    [], // Player 1 (Top)
    [], // Player 2 (Left)
    [], // Player 3 (Right)
    [], // Player 4 (Bottom)
  ]);
  public groupedEmpireDecks: EmpireDeck[] = this.buildDecks();

  // Helper to get cards for a specific empire
  getEmpireCards(empireId: number): Card[] {
    return this.allCards().filter((card: Card) => card.empire.id === empireId);
  }

  // Resets all player hands to be empty
  resetGame(): void {
    // Reset playersCards to four empty arrays
    this.playersCards.set([[], [], [], []]);
    this.playerTracker = 0;
    this.groupedEmpireDecks = this.buildDecks();
    console.log("Game state reset! Player hands are now empty.");
  }

  // Demonstration: Deal a few cards on initialization
  ngOnInit(): void {
    // Example: Deal 2 cards to each player
    this.resetGame();
  }

  addCardToPlayer(card: Card) {
    this.playersCards()[this.playerTracker % 4].push(card);
    this.playerTracker++;
    this.groupedEmpireDecks.map(deck => deck.cards.indexOf(card) > -1 ? deck.cards.splice(deck.cards.indexOf(card), 1) : '');
  }

  buildDecks(): EmpireDeck[] {
    return EMPIRES.map(empire => {
      // 1. Filter cards for the current empire
      const cards = CARDS.filter(card => card.empire.id === empire.id);

      // 2. Sort cards by value in descending order
      // Highest value card will have the highest index (i) and thus the highest z-index/translate-X
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
}
