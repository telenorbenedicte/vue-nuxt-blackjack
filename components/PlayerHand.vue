<template>
  <div class="player-hand">
    <h2 v-if="title">{{ title }}</h2>
    <div class="cards">
      <Card v-for="(card, index) in cards" :key="index" :card="card" class="player-card" />
    </div>
  </div>
</template>

<script>
import Card from './Card.vue';

export default {
  props: {
    cards: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      default: ''
    }
  },
  components: {
    Card
  }
};
</script>

<style scoped>
.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style> 