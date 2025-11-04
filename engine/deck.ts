/**
 * Deck creation, shuffling, and management utilities.
 * Pure TypeScript - no React imports.
 */

import { Card, CandyColor } from "./types";

/**
 * Creates a standard Candyland deck with:
 * - Single color cards (move to next tile of that color)
 * - Double color cards (move to second-next tile of that color)
 * - Special location cards (jump to named tiles)
 */
export function createDeck(): Card[] {
  const deck: Card[] = [];

  // Define card distribution
  const colors: CandyColor[] = ["red", "purple", "yellow", "blue", "orange", "green"];

  // Add single color cards (6 of each color)
  colors.forEach(color => {
    for (let i = 0; i < 6; i++) {
      deck.push({ kind: "single", color });
    }
  });

  // Add double color cards (4 of each color)
  colors.forEach(color => {
    for (let i = 0; i < 4; i++) {
      deck.push({ kind: "double", color });
    }
  });

  // Add special location cards
  deck.push({ kind: "special", targetLabel: "Gumdrop Pass" });
  deck.push({ kind: "special", targetLabel: "Lollipop Woods" });
  deck.push({ kind: "special", targetLabel: "Candy Castle" });
  deck.push({ kind: "special", targetLabel: "Peppermint Forest" });
  deck.push({ kind: "special", targetLabel: "Gumdrop Mountain" });

  return deck;
}

/**
 * Shuffles an array using Fisher-Yates algorithm.
 */
export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Draws a card from the deck.
 * If the deck is empty, reshuffles the discard pile into a new deck.
 * Returns the drawn card and updated deck/discard pile.
 */
export function drawCard(
  deck: Card[],
  discardPile: Card[]
): { card: Card; newDeck: Card[]; newDiscardPile: Card[] } {
  let currentDeck = [...deck];
  let currentDiscard = [...discardPile];

  // If deck is empty, reshuffle discard pile
  if (currentDeck.length === 0) {
    if (currentDiscard.length === 0) {
      // This shouldn't happen in normal gameplay, but handle it gracefully
      throw new Error("Both deck and discard pile are empty!");
    }
    currentDeck = shuffle(currentDiscard);
    currentDiscard = [];
  }

  // Draw the top card
  const card = currentDeck.shift()!;

  return {
    card,
    newDeck: currentDeck,
    newDiscardPile: currentDiscard
  };
}

/**
 * Adds a card to the discard pile.
 */
export function discardCard(card: Card, discardPile: Card[]): Card[] {
  return [...discardPile, card];
}
