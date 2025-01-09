export interface Card {
  suit: string;
  rank: string;
  score: number;
}

export type Deck = Card[];

export function getCardScore(card: Card): number {
  if (['Jack', 'Queen', 'King'].includes(card.rank)) {
    return 10;
  } else if (card.rank === 'Ace') {
    return 11;
  } else {
    return parseInt(card.rank);
  }
} 