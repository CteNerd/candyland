/**
 * Easy mode board preset.
 * A simple, kid-friendly layout with mostly color tiles and a few special tiles.
 */

import { BoardTile } from "../types";

export const easyBoard: BoardTile[] = [
  // Start tile - bottom left
  { index: 0, type: "special", label: "Start", row: 0, col: 0 },
  
  // First section - moving right (bottom row)
  { index: 1, type: "color", color: "red", row: 0, col: 1 },
  { index: 2, type: "color", color: "purple", row: 0, col: 2 },
  { index: 3, type: "color", color: "yellow", row: 0, col: 3 },
  { index: 4, type: "color", color: "blue", row: 0, col: 4 },
  { index: 5, type: "color", color: "orange", row: 0, col: 5 },
  { index: 6, type: "color", color: "green", row: 0, col: 6 },
  
  // Curve up (right side going up)
  { index: 7, type: "color", color: "red", row: 1, col: 6, offsetX: 10 },
  { index: 8, type: "color", color: "purple", row: 2, col: 6, offsetX: 20 },
  { index: 9, type: "special", label: "Gumdrop Pass", jumpToIndex: 12, row: 3, col: 6, emphasize: true, landmarkArt: "🍭" },
  
  // Snake back left (row 3)
  { index: 10, type: "color", color: "yellow", row: 3, col: 5 },
  { index: 11, type: "color", color: "blue", row: 3, col: 4 },
  { index: 12, type: "color", color: "orange", row: 3, col: 3 },
  
  // Continue left then curve down
  { index: 13, type: "color", color: "green", row: 3, col: 2 },
  { index: 14, type: "color", color: "red", row: 3, col: 1 },
  { index: 15, type: "color", color: "purple", row: 3, col: 0 },
  { index: 16, type: "sticky", color: "yellow", skipTurns: 1, row: 2, col: 0, offsetX: -10 },
  
  // Go up left side
  { index: 17, type: "color", color: "blue", row: 4, col: 0 },
  { index: 18, type: "color", color: "orange", row: 5, col: 0 },
  
  // Snake right (row 5)
  { index: 19, type: "color", color: "green", row: 5, col: 1 },
  { index: 20, type: "color", color: "red", row: 5, col: 2 },
  { index: 21, type: "special", label: "Lollipop Woods", row: 5, col: 3, emphasize: true, landmarkArt: "🌳" },
  { index: 22, type: "color", color: "purple", row: 5, col: 4 },
  { index: 23, type: "color", color: "yellow", row: 5, col: 5 },
  { index: 24, type: "color", color: "blue", row: 5, col: 6 },
  
  // Curve up right side
  { index: 25, type: "color", color: "orange", row: 6, col: 6, offsetX: 10 },
  { index: 26, type: "color", color: "green", row: 7, col: 6, offsetX: 20 },
  
  // Snake left (row 7)
  { index: 27, type: "color", color: "red", row: 7, col: 5 },
  { index: 28, type: "color", color: "purple", row: 7, col: 4 },
  { index: 29, type: "special", label: "Candy Castle", row: 7, col: 3, emphasize: true, landmarkArt: "🏰" },
  { index: 30, type: "color", color: "yellow", row: 7, col: 2 },
  
  // Final stretch to finish
  { index: 31, type: "color", color: "blue", row: 7, col: 1 },
  { index: 32, type: "color", color: "orange", row: 8, col: 1, offsetY: 10 },
  { index: 33, type: "color", color: "green", row: 8, col: 2, offsetY: 10 },
  { index: 34, type: "color", color: "red", row: 8, col: 3, offsetY: 10 },
  
  // Finish tile - center top
  { index: 35, type: "finish", label: "Finish", isFinish: true, row: 8, col: 4, offsetY: 10 }
];
