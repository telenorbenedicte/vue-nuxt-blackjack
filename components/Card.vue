<template>
  <div class="card">
    <p>{{ card.rank }} of {{ card.suit }}</p>
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.card {
  border: 1px solid #000;
  padding: 10px;
  margin: 5px;
}
</style> 