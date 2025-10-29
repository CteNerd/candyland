/**
 * Game state reducer that manages all game state transitions.
 * Pure TypeScript - no React imports.
 */

import { GameState, GameAction, PlayerState, DifficultyLevel } from "./types";
import { easyBoard } from "./boardPresets/easy";
import { mediumBoard } from "./boardPresets/medium";
import { createDeck, shuffle, drawCard as drawCardFromDeck, discardCard } from "./deck";
import {
  movePawn,
  applyTileEffects,
  checkWinCondition,
  getNextPlayerIndex,
  formatCard
} from "./rules";

/**
 * Gets the board for a given difficulty level.
 */
function getBoardForDifficulty(difficulty: DifficultyLevel) {
  switch (difficulty) {
    case "easy":
      return easyBoard;
    case "medium":
      return mediumBoard;
    case "hard":
      throw new Error("Hard mode is not implemented yet!");
    default:
      return easyBoard;
  }
}

/**
 * Creates initial game state from configuration.
 */
export function createInitialState(): GameState {
  return {
    players: [],
    board: [],
    deck: [],
    discardPile: [],
    currentPlayerIndex: 0,
    skipTurnMap: {},
    difficulty: "easy",
    settings: {
      theme: "light",
      colorblindMode: false
    },
    turnLog: []
  };
}

/**
 * Main game reducer that handles all state transitions.
 */
export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "START_GAME": {
      const { players: playerConfigs, difficulty, settings } = action.payload;

      // Create player states
      const players: PlayerState[] = playerConfigs.map((config, index) => ({
        id: `p${index + 1}`,
        name: config.name,
        pawnColor: config.pawnColor,
        position: 0 // All start at position 0
      }));

      // Get board for difficulty
      const board = getBoardForDifficulty(difficulty);

      // Create and shuffle deck
      const deck = shuffle(createDeck());

      return {
        ...state,
        players,
        board,
        deck,
        discardPile: [],
        currentPlayerIndex: 0,
        skipTurnMap: {},
        winnerPlayerId: undefined,
        difficulty,
        settings,
        lastDrawnCard: undefined,
        turnLog: ["Game started!"]
      };
    }

    case "DRAW_CARD_AND_RESOLVE": {
      // Don't allow drawing if game is over
      if (state.winnerPlayerId) {
        return state;
      }

      const currentPlayer = state.players[state.currentPlayerIndex];
      const currentPlayerId = currentPlayer.id;

      // Check if current player should skip their turn
      if (state.skipTurnMap[currentPlayerId] > 0) {
        const newSkipTurnMap = { ...state.skipTurnMap };
        newSkipTurnMap[currentPlayerId]--;

        const newTurnLog = [
          ...state.turnLog,
          `${currentPlayer.name} skipped their turn.`
        ];

        // Move to next player
        const nextPlayerIndex = getNextPlayerIndex(
          state.currentPlayerIndex,
          state.players,
          newSkipTurnMap
        );

        return {
          ...state,
          skipTurnMap: newSkipTurnMap,
          currentPlayerIndex: nextPlayerIndex,
          turnLog: newTurnLog.slice(-10) // Keep last 10 entries
        };
      }

      // Draw a card
      const { card, newDeck, newDiscardPile } = drawCardFromDeck(
        state.deck,
        state.discardPile
      );

      // Move the pawn
      let newPosition = movePawn(state.board, currentPlayer.position, card);

      // Clamp to board length
      if (newPosition >= state.board.length) {
        newPosition = state.board.length - 1;
      }

      // Apply tile effects
      const landingTile = state.board[newPosition];
      const { newSkipTurnMap, jumpToIndex } = applyTileEffects(
        landingTile,
        currentPlayerId,
        state.skipTurnMap
      );

      // If there's a jump, apply it
      if (jumpToIndex !== undefined) {
        newPosition = jumpToIndex;
      }

      // Update player position
      const updatedPlayers = state.players.map(p =>
        p.id === currentPlayerId ? { ...p, position: newPosition } : p
      );

      // Build turn log message
      let logMessage = `${currentPlayer.name} drew ${formatCard(card)} → moved to tile ${newPosition}`;
      if (landingTile.label) {
        logMessage += ` (${landingTile.label})`;
      }
      if (landingTile.skipTurns) {
        logMessage += ` → skip next turn`;
      }
      if (jumpToIndex !== undefined) {
        logMessage += ` → jumped to tile ${jumpToIndex}`;
      }

      const newTurnLog = [...state.turnLog, logMessage];

      // Discard the card
      const finalDiscardPile = discardCard(card, newDiscardPile);

      // Check win condition
      const hasWon = checkWinCondition(state.board, newPosition);
      const winnerPlayerId = hasWon ? currentPlayerId : undefined;

      if (hasWon) {
        newTurnLog.push(`🎉 ${currentPlayer.name} wins! 🎉`);
      }

      // Move to next player
      const nextPlayerIndex = hasWon
        ? state.currentPlayerIndex
        : getNextPlayerIndex(state.currentPlayerIndex, state.players, newSkipTurnMap);

      return {
        ...state,
        players: updatedPlayers,
        deck: newDeck,
        discardPile: finalDiscardPile,
        skipTurnMap: newSkipTurnMap,
        currentPlayerIndex: nextPlayerIndex,
        winnerPlayerId,
        lastDrawnCard: card,
        turnLog: newTurnLog.slice(-10) // Keep last 10 entries
      };
    }

    case "UPDATE_SETTINGS": {
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload
        }
      };
    }

    case "RESET_GAME": {
      return createInitialState();
    }

    default:
      return state;
  }
}
