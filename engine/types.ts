/**
 * Core type definitions for the Candyland game engine.
 * No React imports - pure TypeScript only.
 */

export type CandyColor = "red" | "purple" | "yellow" | "blue" | "orange" | "green";

export type DifficultyLevel = "easy" | "medium" | "hard";

export interface PlayerState {
  id: string;        // "p1", "p2", "p3", "p4"
  name: string;      // Player's display name
  pawnColor: string; // Color for the pawn (hex or color name)
  position: number;  // Current tile index on the board
}

export interface BoardTile {
  index: number;               // Position in the board array (0 = start)
  type: "color" | "special" | "sticky" | "finish";
  color?: CandyColor;          // For "color" tiles
  label?: string;              // Named tiles (e.g., "Gumdrop Mountain")
  jumpToIndex?: number;        // Teleport destination
  skipTurns?: number;          // Number of turns to skip
  isFinish?: boolean;          // Marks the final tile
}

export interface Card {
  kind: "single" | "double" | "special";
  color?: CandyColor;    // For "single" and "double" cards
  targetLabel?: string;  // For "special" cards: board label to jump to
}

export interface UserSettings {
  theme: "light" | "dark";
  colorblindMode: boolean;
}

export interface GameState {
  players: PlayerState[];
  board: BoardTile[];
  deck: Card[];
  discardPile: Card[];
  currentPlayerIndex: number;
  skipTurnMap: { [playerId: string]: number }; // Outstanding skip turns per player
  winnerPlayerId?: string;
  difficulty: DifficultyLevel;
  settings: UserSettings;
  lastDrawnCard?: Card;
  turnLog: string[];
}

export type GameAction =
  | { type: "START_GAME"; payload: GameConfig }
  | { type: "DRAW_CARD_AND_RESOLVE" }
  | { type: "UPDATE_SETTINGS"; payload: Partial<UserSettings> }
  | { type: "RESET_GAME" };

export interface GameConfig {
  players: Array<{ name: string; pawnColor: string }>;
  difficulty: DifficultyLevel;
  settings: UserSettings;
}

// Color metadata for UI rendering
export interface ColorMetadata {
  baseColorClass: string; // Tailwind class
  label: string;          // Single letter label
  icon: string;           // Emoji or icon
  hex: string;            // Hex color for styling
}

export const COLOR_METADATA: Record<CandyColor, ColorMetadata> = {
  red: {
    baseColorClass: "bg-red-500",
    label: "R",
    icon: "🍓",
    hex: "#ef4444"
  },
  purple: {
    baseColorClass: "bg-purple-500",
    label: "P",
    icon: "🍇",
    hex: "#a855f7"
  },
  yellow: {
    baseColorClass: "bg-yellow-400",
    label: "Y",
    icon: "🍋",
    hex: "#facc15"
  },
  blue: {
    baseColorClass: "bg-blue-500",
    label: "B",
    icon: "💧",
    hex: "#3b82f6"
  },
  orange: {
    baseColorClass: "bg-orange-500",
    label: "O",
    icon: "🍊",
    hex: "#f97316"
  },
  green: {
    baseColorClass: "bg-green-500",
    label: "G",
    icon: "🍏",
    hex: "#22c55e"
  }
};
