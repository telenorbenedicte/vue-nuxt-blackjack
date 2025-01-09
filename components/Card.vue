<template>
  <div class="card">
    <p class="rank">{{ card.rank }}</p>
    <div class="suit" v-html="getSuitIcon(card.suit)"></div>
  </div>
</template>

<script>
import { suits } from './suits';

export default {
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  methods: {
    getSuitIcon(suit) {
      switch (suit) {
        case 'Hearts':
          return suits.hearts;
        case 'Diamonds':
          return suits.diamonds;
        case 'Clubs':
          return suits.clubs;
        case 'Spades':
          return suits.spades;
        default:
          return '';
      }
    }
  }
};
</script>

<style scoped>
.card {
  width: 100px;
  height: 140px;
  border: 1px solid #000;
  border-radius: 8px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 5px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  font-family: 'Arial', sans-serif;
}

.rank {
  font-size: 24px;
  font-weight: bold;
}

.suit {
  width: 24px;
  height: 24px;
}
</style> 