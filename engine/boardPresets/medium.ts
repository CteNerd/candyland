/**
 * Medium mode board preset.
 * More challenging than easy mode with more sticky tiles and setbacks.
 */

import { BoardTile } from "../types";

export const mediumBoard: BoardTile[] = [
  // Start tile - bottom left
  { index: 0, type: "special", label: "Start", row: 0, col: 0 },
  
  // First section - moving right
  { index: 1, type: "color", color: "red", row: 0, col: 1 },
  { index: 2, type: "color", color: "purple", row: 0, col: 2 },
  { index: 3, type: "color", color: "yellow", row: 0, col: 3 },
  { index: 4, type: "sticky", color: "blue", skipTurns: 1, row: 0, col: 4 },
  { index: 5, type: "color", color: "orange", row: 0, col: 5 },
  { index: 6, type: "color", color: "green", row: 0, col: 6 },
  
  // Curve up
  { index: 7, type: "color", color: "red", row: 1, col: 6, offsetX: 10 },
  { index: 8, type: "special", label: "Peppermint Forest", jumpToIndex: 11, row: 2, col: 6, emphasize: true, landmarkArt: "🌲", offsetX: 15 },
  
  // Snake back left (row 2-3)
  { index: 9, type: "color", color: "purple", row: 3, col: 6 },
  { index: 10, type: "color", color: "yellow", row: 3, col: 5 },
  { index: 11, type: "color", color: "blue", row: 3, col: 4 },
  { index: 12, type: "color", color: "orange", row: 3, col: 3 },
  
  // Continue left
  { index: 13, type: "color", color: "green", row: 3, col: 2 },
  { index: 14, type: "color", color: "red", row: 3, col: 1 },
  { index: 15, type: "sticky", color: "purple", skipTurns: 1, row: 3, col: 0 },
  { index: 16, type: "color", color: "yellow", row: 2, col: 0, offsetX: -10 },
  { index: 17, type: "special", label: "Molasses Swamp", jumpToIndex: 8, row: 4, col: 0, emphasize: true, landmarkArt: "🌊" },
  { index: 18, type: "color", color: "blue", row: 5, col: 0 },
  { index: 19, type: "color", color: "orange", row: 5, col: 1 },
  
  // Snake right (row 5)
  { index: 20, type: "color", color: "green", row: 5, col: 2 },
  { index: 21, type: "color", color: "red", row: 5, col: 3 },
  { index: 22, type: "color", color: "purple", row: 5, col: 4 },
  { index: 23, type: "special", label: "Gumdrop Mountain", jumpToIndex: 28, row: 5, col: 5, emphasize: true, landmarkArt: "⛰️" },
  { index: 24, type: "color", color: "yellow", row: 5, col: 6 },
  { index: 25, type: "sticky", color: "blue", skipTurns: 1, row: 6, col: 6, offsetX: 10 },
  { index: 26, type: "color", color: "orange", row: 7, col: 6, offsetX: 15 },
  
  // Snake left (row 7)
  { index: 27, type: "color", color: "green", row: 7, col: 5 },
  { index: 28, type: "color", color: "red", row: 7, col: 4 },
  { index: 29, type: "color", color: "purple", row: 7, col: 3 },
  { index: 30, type: "color", color: "yellow", row: 7, col: 2 },
  { index: 31, type: "special", label: "Licorice Lagoon", skipTurns: 1, row: 7, col: 1, emphasize: true, landmarkArt: "🍬" },
  { index: 32, type: "color", color: "blue", row: 7, col: 0 },
  
  // Go up left side
  { index: 33, type: "color", color: "orange", row: 8, col: 0 },
  { index: 34, type: "color", color: "green", row: 9, col: 0 },
  
  // Snake right (row 9)
  { index: 35, type: "color", color: "red", row: 9, col: 1 },
  { index: 36, type: "sticky", color: "purple", skipTurns: 1, row: 9, col: 2 },
  { index: 37, type: "color", color: "yellow", row: 9, col: 3 },
  { index: 38, type: "color", color: "blue", row: 9, col: 4 },
  
  // Final stretch
  { index: 39, type: "color", color: "orange", row: 9, col: 5 },
  { index: 40, type: "color", color: "green", row: 9, col: 6 },
  { index: 41, type: "special", label: "Candy Castle", row: 10, col: 6, emphasize: true, landmarkArt: "🏰", offsetX: 10 },
  { index: 42, type: "color", color: "red", row: 10, col: 5 },
  { index: 43, type: "color", color: "purple", row: 10, col: 4 },
  { index: 44, type: "color", color: "yellow", row: 10, col: 3 },
  
  // Finish tile - center
  { index: 45, type: "finish", label: "Finish", isFinish: true, row: 10, col: 2 }
];
