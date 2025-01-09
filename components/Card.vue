<template>
  <div class="card">
    <p class="rank">{{ card.rank }}</p>
    <p class="suit">{{ card.suit }}</p>
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
  width: 100px; /* Set a fixed width for the card */
  height: 140px; /* Set a fixed height for the card */
  border: 1px solid #000; /* Black border */
  border-radius: 8px; /* Rounded corners */
  background-color: white; /* White background */
  display: flex; /* Use flexbox for centering */
  flex-direction: column; /* Stack content vertically */
  align-items: center; /* Center horizontally */
  justify-content: center; /* Center vertically */
  margin: 5px; /* Space between cards */
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3); /* Shadow for depth */
  font-family: 'Arial', sans-serif; /* Font style */
}

.rank {
  font-size: 24px; /* Larger font for rank */
  font-weight: bold; /* Bold rank */
}

.suit {
  font-size: 18px; /* Smaller font for suit */
}
</style> 