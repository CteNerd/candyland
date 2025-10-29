/**
 * Easy mode board preset.
 * A simple, kid-friendly layout with mostly color tiles and a few special tiles.
 */

import { BoardTile } from "../types";

export const easyBoard: BoardTile[] = [
  // Start tile
  { index: 0, type: "special", label: "Start" },
  
  // First section - basic colors
  { index: 1, type: "color", color: "red" },
  { index: 2, type: "color", color: "purple" },
  { index: 3, type: "color", color: "yellow" },
  { index: 4, type: "color", color: "blue" },
  { index: 5, type: "color", color: "orange" },
  { index: 6, type: "color", color: "green" },
  
  // Second section
  { index: 7, type: "color", color: "red" },
  { index: 8, type: "color", color: "purple" },
  { index: 9, type: "special", label: "Gumdrop Pass", jumpToIndex: 12 }, // Shortcut
  { index: 10, type: "color", color: "yellow" },
  { index: 11, type: "color", color: "blue" },
  { index: 12, type: "color", color: "orange" },
  
  // Third section
  { index: 13, type: "color", color: "green" },
  { index: 14, type: "color", color: "red" },
  { index: 15, type: "color", color: "purple" },
  { index: 16, type: "sticky", color: "yellow", skipTurns: 1 }, // Lose a turn
  { index: 17, type: "color", color: "blue" },
  { index: 18, type: "color", color: "orange" },
  
  // Fourth section
  { index: 19, type: "color", color: "green" },
  { index: 20, type: "color", color: "red" },
  { index: 21, type: "special", label: "Lollipop Woods" },
  { index: 22, type: "color", color: "purple" },
  { index: 23, type: "color", color: "yellow" },
  { index: 24, type: "color", color: "blue" },
  
  // Fifth section - approaching finish
  { index: 25, type: "color", color: "orange" },
  { index: 26, type: "color", color: "green" },
  { index: 27, type: "color", color: "red" },
  { index: 28, type: "color", color: "purple" },
  { index: 29, type: "special", label: "Candy Castle" },
  { index: 30, type: "color", color: "yellow" },
  
  // Final stretch
  { index: 31, type: "color", color: "blue" },
  { index: 32, type: "color", color: "orange" },
  { index: 33, type: "color", color: "green" },
  { index: 34, type: "color", color: "red" },
  
  // Finish tile
  { index: 35, type: "finish", label: "Finish", isFinish: true }
];
