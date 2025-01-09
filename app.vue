<template>
  <div class="game-container">
    <PlayerHand :cards="playerCards" title="Player's Hand" class="player-hand" />
    
    <!-- Button container for positioning -->
    <div class="button-container">
      <button @click="drawCard" :disabled="gameOver">Hit</button>
      <button @click="stand" :disabled="gameOver || playerCards.length === 0">Stand</button>
    </div>
    
    <!-- Display dealer's cards or message if no cards drawn -->
    <div v-if="gameOver || dealerDrawing">
      <h2>Dealer's Hand</h2>
      <div v-if="dealerCards.length === 0">
        <p>The dealer hasn't drawn any cards.</p>
      </div>
      <PlayerHand v-else :cards="dealerCards" class="dealer-hand" />
    </div>

    <div v-if="gameOver">
      <h2>Scores:</h2>
      <p>Player Score: {{ playerScore }}</p>
      <p>Dealer Score: {{ dealerScore }}</p>
    </div>
    
    <!-- Display scores and result -->
    <div v-if="gameOver" class="result-container">
      <h2 class="result-text">{{ resultMessage }}</h2>
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

      // Trigger animation for the player's card
      this.$nextTick(() => {
        const cardElement = document.querySelector(`.player-card:last-child`);
        if (cardElement) {
          cardElement.classList.add('animate-card');
          setTimeout(() => {
            cardElement.classList.remove('animate-card');
          }, 1000); // Duration of the animation
        }
      });

      // Check if the player has busted
      if (this.calculateScore(this.playerCards) > 21) {
        console.log('Player busts!'); // Log the bust
        this.gameOver = true; // Set game over flag
        this.resultMessage = "Player bust! Dealer wins."; // Set result message
        // No need to call drawDealerCards() here
      }
    },
    stand() {
      this.dealerDrawing = true; // Set dealer drawing flag
      this.drawDealerCards(); // Start the dealer's turn
    },
    drawDealerCards() {
      const drawCardWithDelay = () => {
        if (this.calculateScore(this.dealerCards) < 20) {
          this.drawDealerCard(); // Draw a card for the dealer
          setTimeout(drawCardWithDelay, 1000); // Delay of 1 second before drawing the next card
        } else {
          this.gameOver = true; // Set game over flag
          this.determineWinner(); // Determine the winner
        }
      };
      drawCardWithDelay(); // Start the drawing process
    },
    drawDealerCard() {
      if (this.deck.length === 0) {
        alert("No more cards in the deck!");
        return;
      }
      const randomIndex = Math.floor(Math.random() * this.deck.length);
      const drawnCard: Card = this.deck.splice(randomIndex, 1)[0]; // Remove the card from the deck
      this.dealerCards.push(drawnCard); // Add the drawn card to dealer's hand

      // Trigger animation
      this.$nextTick(() => {
        const cardElement = document.querySelector(`.dealer-card:last-child`);
        if (cardElement) {
          cardElement.classList.add('animate-card');
          setTimeout(() => {
            cardElement.classList.remove('animate-card');
          }, 1000); // Duration of the animation
        }
      });
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

<style scoped>
.game-container {
  position: relative; /* Position relative for absolute positioning of buttons */
  height: 100vh; /* Full height of the viewport */
  overflow: hidden; /* Prevent overflow of animated cards */
}

.button-container {
  position: absolute; /* Position buttons absolutely */
  bottom: 20px; /* Distance from the bottom */
  right: 20px; /* Distance from the right */
}

.button-container button {
  margin-left: 10px; /* Space between buttons */
  padding: 15px 30px; /* Increase padding for bigger buttons */
  font-size: 18px; /* Increase font size */
  border: none; /* Remove default border */
  border-radius: 5px; /* Add rounded corners */
  background-color: #007bff; /* Button background color */
  color: white; /* Button text color */
  cursor: pointer; /* Change cursor to pointer */
  transition: background-color 0.3s; /* Smooth transition for hover effect */
}

.button-container button:disabled {
  background-color: #ccc; /* Grey background for disabled buttons */
  color: #666; /* Darker text color for disabled state */
  cursor: not-allowed; /* Change cursor to indicate disabled state */
}

.button-container button:hover {
  background-color: #0056b3; /* Darker background on hover */
}

.animate-card {
  animation: moveAndRotate 1s ease forwards; /* Animation for card drawing */
}

@keyframes moveAndRotate {
  0% {
    transform: translateY(100%) rotate(0deg); /* Start from bottom */
    opacity: 0; /* Start invisible */
  }
  50% {
    opacity: 1; /* Fade in */
  }
  100% {
    transform: translateY(0) rotate(360deg); /* Move to original position and rotate */
  }
}

.result-container {
  display: flex;
  flex-direction: column; /* Stack items vertically */
  align-items: center; /* Center horizontally */
  justify-content: center; /* Center vertically */
  height: 100%; /* Full height of the container */
}

.result-text {
  font-size: 36px; /* Increase font size */
  font-weight: bold; /* Make text bold */
  text-align: center; /* Center text */
  margin: 10px 0; /* Add some margin for spacing */
}
</style>
