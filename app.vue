<template>
  <div>
    <PlayerHand :cards="player1Cards" />
    <PlayerHand :cards="player2Cards" />
    <button @click="drawCard">Draw Card</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      player1Cards: [],
      player2Cards: [],
      deck: this.createDeck() // Initialize the deck
    };
  },
  methods: {
    createDeck() {
      const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
      const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
      const deck = [];
      for (const suit of suits) {
        for (const rank of ranks) {
          deck.push({ suit, rank });
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
      const drawnCard = this.deck.splice(randomIndex, 1)[0]; // Remove the card from the deck
      this.player1Cards.push(drawnCard); // Add the drawn card to player 1's hand (you can modify this logic)
    }
  }
};
</script>
