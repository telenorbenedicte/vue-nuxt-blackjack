<template>
  <div>
    <PlayerHand :cards="player1Cards" />
    <PlayerHand :cards="player2Cards" />
    <button @click="drawCard">Hit</button>
    <button @click="stand">Stand</button>
    <PlayerHand :cards="dealerCards" />
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
    },
    stand() {
      // Dealer's turn to draw cards
      while (this.calculateScore(this.dealerCards) < 20) {
        this.drawDealerCard();
      }
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
    }
  }
});
</script>
