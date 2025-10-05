import {Component, OnInit, signal} from '@angular/core';
import {Card, CARDS, Empire, EMPIRES} from "./enums";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public empires = signal<Empire[]>(EMPIRES);
  public allCards = signal<Card[]>(CARDS);

  // State for cards in players' hands (4 players)
  // Initialized with empty hands
  public playersCards = signal<Card[][]>([
    [], // Player 1 (Top)
    [], // Player 2 (Left)
    [], // Player 3 (Right)
    [], // Player 4 (Bottom)
  ]);

  // Helper to get cards for a specific empire
  getEmpireCards(empireId: number): Card[] {
    return this.allCards().filter((card: Card) => card.empire.id === empireId);
  }

  // Resets all player hands to be empty
  resetGame(): void {
    // Reset playersCards to four empty arrays
    this.playersCards.set([[], [], [], []]);
    console.log("Game state reset! Player hands are now empty.");
  }

  // Demonstration: Deal a few cards on initialization
  ngOnInit(): void {
    // Example: Deal 2 cards to each player
    const cardsToDeal = this.allCards().slice(0, 8); // Get first 8 cards

    this.playersCards.set([
      [cardsToDeal[0], cardsToDeal[4]], // P1 gets card 1, 5
      [cardsToDeal[1], cardsToDeal[5]], // P2 gets card 2, 6
      [cardsToDeal[2], cardsToDeal[6]], // P3 gets card 3, 7
      [cardsToDeal[3], cardsToDeal[7]], // P4 gets card 4, 8
    ]);
  }
}
