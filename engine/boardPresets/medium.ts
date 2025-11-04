/**
 * Medium mode board preset.
 * More challenging than easy mode with more sticky tiles and setbacks.
 */

import { BoardTile } from "../types";

export const mediumBoard: BoardTile[] = [
  // Start tile
  { index: 0, type: "special", label: "Start" },
  
  // First section
  { index: 1, type: "color", color: "red" },
  { index: 2, type: "color", color: "purple" },
  { index: 3, type: "color", color: "yellow" },
  { index: 4, type: "sticky", color: "blue", skipTurns: 1 }, // Early challenge
  { index: 5, type: "color", color: "orange" },
  { index: 6, type: "color", color: "green" },
  
  // Second section
  { index: 7, type: "color", color: "red" },
  { index: 8, type: "special", label: "Peppermint Forest", jumpToIndex: 11 }, // Small shortcut
  { index: 9, type: "color", color: "purple" },
  { index: 10, type: "color", color: "yellow" },
  { index: 11, type: "color", color: "blue" },
  { index: 12, type: "color", color: "orange" },
  
  // Third section - trickier
  { index: 13, type: "color", color: "green" },
  { index: 14, type: "color", color: "red" },
  { index: 15, type: "sticky", color: "purple", skipTurns: 1 }, // Sticky tile
  { index: 16, type: "color", color: "yellow" },
  { index: 17, type: "special", label: "Molasses Swamp", jumpToIndex: 8 }, // Setback!
  { index: 18, type: "color", color: "blue" },
  { index: 19, type: "color", color: "orange" },
  
  // Fourth section
  { index: 20, type: "color", color: "green" },
  { index: 21, type: "color", color: "red" },
  { index: 22, type: "color", color: "purple" },
  { index: 23, type: "special", label: "Gumdrop Mountain", jumpToIndex: 28 }, // Big shortcut
  { index: 24, type: "color", color: "yellow" },
  { index: 25, type: "sticky", color: "blue", skipTurns: 1 },
  { index: 26, type: "color", color: "orange" },
  
  // Fifth section
  { index: 27, type: "color", color: "green" },
  { index: 28, type: "color", color: "red" },
  { index: 29, type: "color", color: "purple" },
  { index: 30, type: "color", color: "yellow" },
  { index: 31, type: "special", label: "Licorice Lagoon", skipTurns: 1 }, // Sticky special tile
  { index: 32, type: "color", color: "blue" },
  
  // Sixth section - near finish
  { index: 33, type: "color", color: "orange" },
  { index: 34, type: "color", color: "green" },
  { index: 35, type: "color", color: "red" },
  { index: 36, type: "sticky", color: "purple", skipTurns: 1 }, // Final challenge
  { index: 37, type: "color", color: "yellow" },
  { index: 38, type: "color", color: "blue" },
  
  // Final stretch
  { index: 39, type: "color", color: "orange" },
  { index: 40, type: "color", color: "green" },
  { index: 41, type: "special", label: "Candy Castle" },
  { index: 42, type: "color", color: "red" },
  { index: 43, type: "color", color: "purple" },
  { index: 44, type: "color", color: "yellow" },
  
  // Finish tile
  { index: 45, type: "finish", label: "Finish", isFinish: true }
];
