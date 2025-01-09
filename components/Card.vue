<template>
  <div class="card">
    <img :src="getCardImage(card)" 
         :alt="`${card.rank} of ${card.suit} (Score: ${card.score})`" 
         class="card-image" />
  </div>
</template>

<script>
const cardImages = {
  'ace-of-hearts': '/images/cards/048-ace-of-hearts.png',
  'two-of-hearts': '/images/cards/049-two-of-hearts.png',
  'three-of-hearts': '/images/cards/050-three-of-hearts.png',
  'four-of-hearts': '/images/cards/051-four-of-hearts.png',
  'five-of-hearts': '/images/cards/052-five-of-hearts.png',
  'six-of-hearts': '/images/cards/053-six-of-hearts.png',
  'seven-of-hearts': '/images/cards/054-seven-of-hearts.png',
  'eight-of-hearts': '/images/cards/041-eight-of-clubs.png',
  'nine-of-hearts': '/images/cards/058-nine-of-hearts.png',
  'ten-of-hearts': '/images/cards/059-ten-of-hearts.png',
  'jack-of-hearts': '/images/cards/075-jack.png',
  'queen-of-hearts': '/images/cards/060-queen-of-hearts.png',
  'king-of-hearts': '/images/cards/061-king-of-hearts.png',
  
  'ace-of-diamonds': '/images/cards/019-ace-of-diamonds.png',
  'two-of-diamonds': '/images/cards/020-two-of-diamonds.png',
  'three-of-diamonds': '/images/cards/021-three-of-diamonds.png',
  'four-of-diamonds': '/images/cards/022-four-of-diamonds.png',
  'five-of-diamonds': '/images/cards/024-five-of-diamonds.png',
  'six-of-diamonds': '/images/cards/025-six-of-diamonds.png',
  'seven-of-diamonds': '/images/cards/026-seven-of-diamonds.png',
  'eight-of-diamonds': '/images/cards/027-eight-of-diamonds.png',
  'nine-of-diamonds': '/images/cards/028-nine-of-diamonds.png',
  'ten-of-diamonds': '/images/cards/029-ten-of-diamonds.png',
  'jack-of-diamonds': '/images/cards/030-jack-of-diamonds.png',
  'queen-of-diamonds': '/images/cards/031-queen.png',
  'king-of-diamonds': '/images/cards/032-king-of-diamonds.png',
  
  'ace-of-clubs': '/images/cards/033-ace-of-clubs.png',
  'two-of-clubs': '/images/cards/035-two-of-clubs.png',
  'three-of-clubs': '/images/cards/036-three-of-clubs.png',
  'four-of-clubs': '/images/cards/037-four-of-clubs.png',
  'five-of-clubs': '/images/cards/038-five-of-clubs.png',
  'six-of-clubs': '/images/cards/039-six-of-clubs.png',
  'seven-of-clubs': '/images/cards/040-seven-of-clubs.png',
  'eight-of-clubs': '/images/cards/041-eight-of-clubs.png',
  'nine-of-clubs': '/images/cards/042-nine-of-clubs.png',
  'ten-of-clubs': '/images/cards/043-ten-of-clubs.png',
  'jack-of-clubs': '/images/cards/044-jack-of-clubs.png',
  'queen-of-clubs': '/images/cards/046-queen-of-clubs.png',
  'king-of-clubs': '/images/cards/047-king-of-clubs.png',
  
  'ace-of-spades': '/images/cards/005-ace-of-spades.png',
  'two-of-spades': '/images/cards/006-two-of-spades.png',
  'three-of-spades': '/images/cards/007-three-of-spades.png',
  'four-of-spades': '/images/cards/008-four-of-spades.png',
  'five-of-spades': '/images/cards/009-five-of-spades.png',
  'six-of-spades': '/images/cards/010-six-of-spades.png',
  'seven-of-spades': '/images/cards/011-seven-of-spades.png',
  'eight-of-spades': '/images/cards/013-eight-of-spades.png',
  'nine-of-spades': '/images/cards/014-nine-of-spades.png',
  'ten-of-spades': '/images/cards/015-ten-of-spades.png',
  'jack-of-spades': '/images/cards/016-jack-of-spades.png',
  'queen-of-spades': '/images/cards/017-queen-of-spades.png',
  'king-of-spades': '/images/cards/018-king-of-spades.png',
};

export default {
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  methods: {
    getCardImage(card) {
      // Construct the key based on the card's rank and suit
      const rank = card.rank.toLowerCase().replace(/ /g, '-'); // Replace spaces with hyphens
      const suit = card.suit.toLowerCase().replace(/ /g, '-'); // Replace spaces with hyphens
      const key = `${rank}-of-${suit}`; // Create the key
      const imagePath = cardImages[key]; // Get the image path

      // Check if the image path is valid
      if (!imagePath) {
        console.error(`Image not found for card: ${card.rank} of ${card.suit} (Key: ${key})`);
      }

      return imagePath || ''; // Return the image path or an empty string if not found
    }
  }
};
</script>

<style scoped>
.card {
  width: 100px; /* Set a fixed width for the card */
  height: 140px; /* Set a fixed height for the card */
  display: flex; /* Use flexbox for centering */
  align-items: center; /* Center horizontally */
  justify-content: center; /* Center vertically */
  margin: 5px; /* Space between cards */
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3); /* Shadow for depth */
}

.card-image {
  width: 100%; /* Make the image fill the card */
  height: auto; /* Maintain aspect ratio */
}
</style> 