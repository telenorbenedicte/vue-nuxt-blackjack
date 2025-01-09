<template>
  <div>
    <PlayerHand :cards="playerCards" title="Player's Hand" />
    <button @click="drawCard">Hit</button>
    <button @click="stand">Stand</button>
    
    <!-- Display dealer's cards only after the player stands -->
    <div v-if="gameOver || dealerDrawing">
      <h2>Dealer's Hand</h2>
      <PlayerHand :cards="dealerCards" />
    </div>
    
    <!-- Display scores and result -->
    <div v-if="gameOver">
      <h2>Scores:</h2>
      <p>Player Score: {{ playerScore }}</p>
      <p>Dealer Score: {{ dealerScore }}</p>
      <h2>{{ resultMessage }}</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Card, Deck, getCardScore } from './types'; // Import the types and score function

export default defineComponent({
  data() {
    return {
      playerCards: [] as Card[], // Updated to single player
      dealerCards: [] as Card[], // Add dealer's cards
      deck: this.createDeck() as Deck, // Use Deck type
      gameOver: false, // Track if the game is over
      resultMessage: '', // Message to display the result
      dealerDrawing: false // Track if the dealer is drawing
    };
  },
  computed: {
    playerScore() {
      return this.calculateScore(this.playerCards); // Updated to single player
    },
    dealerScore() {
      return this.calculateScore(this.dealerCards);
    }
  },
  methods: {
    createDeck(): Deck {
      const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
      const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
      const deck: Deck = [];
      for (const suit of suits) {
        for (const rank of ranks) {
          deck.push({ suit, rank, score: getCardScore({ suit, rank, score: 0 }) }); // Initialize score
        }
      }
      return deck;
    },
    drawCard() {
      if (this.deck.length === 0) {
        alert("No more cards in the deck!");
        return;
      }
      const randomIndex = Math.floor(Math.random() * this.deck.length);
      const drawnCard: Card = this.deck.splice(randomIndex, 1)[0]; // Remove the card from the deck
      this.playerCards.push(drawnCard); // Add the drawn card to player's hand
    },
    stand() {
      this.dealerDrawing = true; // Set dealer drawing flag
      // Dealer's turn to draw cards
      while (this.calculateScore(this.dealerCards) < 20) {
        this.drawDealerCard();
      }
      this.gameOver = true; // Set game over flag
      this.determineWinner(); // Determine the winner
    },
    drawDealerCard() {
      if (this.deck.length === 0) {
        alert("No more cards in the deck!");
        return;
      }
      const randomIndex = Math.floor(Math.random() * this.deck.length);
      const drawnCard: Card = this.deck.splice(randomIndex, 1)[0]; // Remove the card from the deck
      this.dealerCards.push(drawnCard); // Add the drawn card to dealer's hand
    },
    calculateScore(cards: Card[]): number {
      let score = 0;
      let aces = 0;

      for (const card of cards) {
        score += card.score;
        if (card.rank === 'Ace') {
          aces += 1; // Count Aces for adjustment
        }
      }

      // Adjust for Aces if score exceeds 21
      while (score > 21 && aces > 0) {
        score -= 10; // Count Ace as 1 instead of 11
        aces -= 1;
      }

      return score;
    },
    determineWinner() {
      const playerFinalScore = this.playerScore; // Updated to single player
      const dealerFinalScore = this.dealerScore;

      if (playerFinalScore > 21) {
        this.resultMessage = "Player bust! Dealer wins.";
      } else if (dealerFinalScore > 21 || playerFinalScore > dealerFinalScore) {
        this.resultMessage = "Player wins!";
      } else {
        this.resultMessage = "The dealer wins...";
      }
    }
  }
});
</script>
