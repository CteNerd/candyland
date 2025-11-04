/**
 * Game rules and turn resolution logic.
 * Pure TypeScript - no React imports.
 */

import { BoardTile, Card, PlayerState, CandyColor } from "./types";

/**
 * Finds the next tile of a specific color starting from a given position.
 * Returns the tile index or -1 if not found.
 */
export function findNextColorTile(
  board: BoardTile[],
  startPosition: number,
  color: CandyColor,
  occurrence: 1 | 2 = 1
): number {
  let found = 0;
  
  for (let i = startPosition + 1; i < board.length; i++) {
    if (board[i].color === color) {
      found++;
      if (found === occurrence) {
        return i;
      }
    }
  }
  
  // If we didn't find enough occurrences, return the last tile (finish)
  return board.length - 1;
}

/**
 * Finds a tile by its label.
 * Returns the tile index or -1 if not found.
 */
export function findTileByLabel(board: BoardTile[], label: string): number {
  const index = board.findIndex(tile => tile.label === label);
  return index;
}

/**
 * Moves a player's pawn based on the drawn card.
 * Returns the new position.
 */
export function movePawn(
  board: BoardTile[],
  currentPosition: number,
  card: Card
): number {
  if (card.kind === "single" && card.color) {
    return findNextColorTile(board, currentPosition, card.color, 1);
  } else if (card.kind === "double" && card.color) {
    return findNextColorTile(board, currentPosition, card.color, 2);
  } else if (card.kind === "special" && card.targetLabel) {
    const targetIndex = findTileByLabel(board, card.targetLabel);
    return targetIndex !== -1 ? targetIndex : currentPosition;
  }
  
  return currentPosition;
}

/**
 * Applies tile effects when a pawn lands on a tile.
 * Returns updated skip turn count and possibly a new position (if jumped).
 */
export function applyTileEffects(
  tile: BoardTile,
  playerId: string,
  skipTurnMap: { [playerId: string]: number }
): {
  newSkipTurnMap: { [playerId: string]: number };
  jumpToIndex?: number;
} {
  const newSkipTurnMap = { ...skipTurnMap };

  // Apply skip turns
  if (tile.skipTurns) {
    newSkipTurnMap[playerId] = (newSkipTurnMap[playerId] || 0) + tile.skipTurns;
  }

  // Apply jump
  if (tile.jumpToIndex !== undefined) {
    return { newSkipTurnMap, jumpToIndex: tile.jumpToIndex };
  }

  return { newSkipTurnMap };
}

/**
 * Checks if a player has reached the finish tile.
 */
export function checkWinCondition(
  board: BoardTile[],
  position: number
): boolean {
  return board[position]?.isFinish === true;
}

/**
 * Gets the next player index, skipping players who are still under skip-turn penalty.
 * Returns the next eligible player index.
 */
export function getNextPlayerIndex(
  currentPlayerIndex: number,
  players: PlayerState[],
  skipTurnMap: { [playerId: string]: number }
): number {
  const numPlayers = players.length;
  let nextIndex = (currentPlayerIndex + 1) % numPlayers;
  let attempts = 0;

  // Keep advancing until we find a player who isn't skipping
  while (attempts < numPlayers) {
    const player = players[nextIndex];
    if (!skipTurnMap[player.id] || skipTurnMap[player.id] === 0) {
      return nextIndex;
    }
    nextIndex = (nextIndex + 1) % numPlayers;
    attempts++;
  }

  // If all players are skipping (shouldn't happen), return the next in rotation
  return (currentPlayerIndex + 1) % numPlayers;
}

/**
 * Formats a card for display in the turn log.
 */
export function formatCard(card: Card): string {
  if (card.kind === "single") {
    return `Single ${card.color}`;
  } else if (card.kind === "double") {
    return `Double ${card.color}`;
  } else if (card.kind === "special") {
    return `Special: ${card.targetLabel}`;
  }
  return "Unknown card";
}
