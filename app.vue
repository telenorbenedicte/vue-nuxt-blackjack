<template>
  <div>
    <PlayerHand :cards="player1Cards" />
    <PlayerHand :cards="player2Cards" />
    <button @click="drawCard">Hit</button>
    <button @click="stand">Stand</button>
    <PlayerHand :cards="dealerCards" />
    
    <!-- Display scores and result -->
    <div v-if="gameOver">
      <h2>Scores:</h2>
      <p>Player 1 Score: {{ player1Score }}</p>
      <p>Player 2 Score: {{ player2Score }}</p>
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
      player1Cards: [] as Card[], // Use Card type
      player2Cards: [] as Card[], // Use Card type
      dealerCards: [] as Card[], // Add dealer's cards
      deck: this.createDeck() as Deck, // Use Deck type
      gameOver: false, // Track if the game is over
      resultMessage: '' // Message to display the result
    };
  },
  computed: {
    player1Score() {
      return this.calculateScore(this.player1Cards);
    },
    player2Score() {
      return this.calculateScore(this.player2Cards);
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
      this.player1Cards.push(drawnCard); // Add the drawn card to player 1's hand
    },
    stand() {
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
      const player1FinalScore = this.player1Score;
      const player2FinalScore = this.player2Score;
      const dealerFinalScore = this.dealerScore;

      if (player1FinalScore > 21 && player2FinalScore > 21) {
        this.resultMessage = "Both players bust! Dealer wins.";
      } else if (dealerFinalScore > 21 || player1FinalScore > dealerFinalScore) {
        this.resultMessage = "Player 1 wins!";
      } else if (player2FinalScore > dealerFinalScore) {
        this.resultMessage = "Player 2 wins!";
      } else {
        this.resultMessage = "The dealer wins...";
      }
    }
  }
});
</script>
