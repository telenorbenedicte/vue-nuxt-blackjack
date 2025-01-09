<template>
  <div>
    <PlayerHand :cards="player1Cards" />
    <PlayerHand :cards="player2Cards" />
    <button @click="drawCard">Hit</button>
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
      deck: this.createDeck() as Deck // Use Deck type
    };
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
    }
  }
});
</script>
