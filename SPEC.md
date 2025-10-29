# Candyland Web Game – Functional & Technical Specification (v0.2)

## 0. Goal / Scope

We are building a browser-based version of Candyland that:
- Runs fully client-side in any modern browser (desktop/tablet/phone).
- Can be played locally, same device, 2–4 players taking turns.
- Uses recognizable Candyland-style rules: draw a card, move pawn, first to finish wins.
- Requires no backend for the first release.
- Can be deployed to GitHub Pages (static hosting).

Out of scope for v0.2:
- Online multiplayer / remote play.
- User accounts / sign-in.
- Persistent save + resume.
- Chat / voice.
- Analytics, ads, monetization.

We will design the core logic so it can later support remote multiplayer and dynamic boards without a total rewrite.


## 1. Gameplay Rules / Mechanics

### 1.1 Players
- 2–4 players per game.
- Players enter a display name and pick a pawn color.
- Turn order is fixed by join order (Player 1 → Player 2 → ... → Player N → repeat).

### 1.2 Board
The game board is a path of tiles, start to finish.

Each tile has:
- A color (red / purple / yellow / blue / orange / green), OR
- A special behavior (jump, lose turn, finish, etc.).

We support difficulty modes:

#### Easy Mode
- Static board loaded from a file.
- Kid-friendly layout: mostly color tiles, a few simple special tiles.
- Stored as code in `engine/boardPresets/easy.ts`.

#### Medium Mode
- Static board loaded from a file, but slightly more challenging.
- Adds more “sticky” tiles (lose next turn), forced teleports, or mild setbacks.
- Stored as code in `engine/boardPresets/medium.ts`.

#### Hard Mode (Future / not shipped in v0.2)
- Dynamic board, procedurally generated at runtime.
- Branches, traps, setbacks.
- Likely needs a backend to make sure all connected players see the same generated board.
- For v0.2: we include `"hard"` in types and UI, but it will be disabled.

All modes share the same `BoardTile` interface.

### 1.3 Cards / Movement
The deck contains:
- Single-color cards → move to the next tile of that color.
- Double-color cards → move to the second next tile of that color.
- Special location cards → jump directly to a named tile (might move you backward).

Turn flow:
1. Current player taps "Draw Card".
2. Reveal the top card.
3. Move pawn according to that card.
4. Apply any tile effects on the landing tile.
5. Check win condition.

Deck behavior:
- Drawn cards go to a discard pile.
- If the draw pile is empty, reshuffle the discard pile into a new draw pile.

### 1.4 Tile Effects
Supported effects in v0.2:
- `jumpToIndex`: landing here teleports you elsewhere.
- `skipTurns`: landing here causes you to skip X of your future turns.
- `isFinish`: marks the final tile.

Multiple pawns can share the same tile.

### 1.5 Skip Turns
If a tile has `skipTurns = 1`, that player skips exactly their next turn.

### 1.6 Win Condition
- First player to reach or pass the final tile wins immediately.
- Show end-of-game modal with winner name and replay option.


## 2. User Experience / UI Flows

### 2.1 Home Screen
- Game title (placeholder name until IP questions are sorted — we should not ship this under "Candy Land" branding publicly).
- Buttons:
  - “Start Local Game”
  - “Online Game (Coming Soon)” (disabled)
- Link to repo / About.

### 2.2 New Game Setup Screen
Inputs:
- Number of players (2–4).
- For each player:
  - Name (defaults like “Player 1”, “Player 2”…).
  - Pawn color.
- Difficulty:
  - Easy (default)
  - Medium
  - Hard (visible but disabled in v0.2)

Accessibility / Theme options:
- Theme: Light or Dark.
- Colorblind Mode: On/Off.

Action:
- “Start Game” initializes game state and navigates to Game Screen.

### 2.3 Game Screen
Responsive layout:
- **Board Area**
  - Visual path of tiles.
  - Pawns shown on their current tile.
  - If multiple pawns land together, they render offset/stacked.

- **Control / Status Panel**
  - “Current Turn: Player X”
  - “Draw Card” button
  - Last drawn card summary
  - Recent move log, e.g.:
    - “Player 2 drew Double Blue → moved to 24 → skip next turn”

- **Settings Button**
  - Opens Settings drawer/modal (see below).

### 2.4 Turn Interaction
1. User taps “Draw Card.”
2. Card animates into view (flip/reveal).
3. Pawn animates to its new tile.
4. If win => Winner modal.
5. Otherwise, advance to next player's turn, skipping any players who are still under skip-turn penalty.

### 2.5 Winner Modal
- “[Player X] Wins 🎉”
- “Play Again” (restarts setup with previous values)
- “Home”

### 2.6 Settings Drawer / Modal (In-Game)
Options:
- Light / Dark mode toggle.
- Colorblind mode toggle.
- (Future) High contrast / Larger text toggles.
- “Exit to Home.”

Settings changes affect only visuals (theme, icon overlays, etc.) not game logic.


## 3. Accessibility & Theming

Accessibility is part of baseline requirements, not a later enhancement.

### 3.1 Colorblind Mode
When enabled:
- Tiles and cards are not only color-coded; they also display an icon / pattern / label.
  - Example: Red tile might also show a 🍓 icon or “R”.
  - Blue tile might also show a 🌊 icon or “B”.
- Pawns include player initials or a badge so you don’t rely on color alone.

Implementation idea:
- Each game color maps to:
  ```ts
  {
    baseColorClass: string; // Tailwind class
    label: string;          // "R", "B", etc.
    icon: string;           // e.g. emoji or SVG key
  }
  ```
- Components render either just `baseColorClass` OR `baseColorClass + label/icon` depending on colorblind mode.

### 3.2 Light / Dark Mode
- Global theme class on the root (`theme-light` or `theme-dark`).
- Tailwind utility variants or CSS variables to change backgrounds, text colors, borders.
- User can toggle in Setup Screen or mid-game in Settings.

### 3.3 High Contrast / Large Text (Future)
- We will expose these in UI as “coming soon” or disabled toggles.
- Not required to function in v0.2, but we’re reserving the surface area.

Result: We normalize that “Settings” exists from day one, so we don’t bolt it on later.


## 4. Core Game State Model

All state is in memory on the client. Refreshing the browser resets the game.

```ts
interface GameState {
  players: PlayerState[];
  board: BoardTile[];
  deck: Card[];
  discardPile: Card[];
  currentPlayerIndex: number;
  skipTurnMap: { [playerId: string]: number }; // outstanding skip turns per player
  winnerPlayerId?: string;
  difficulty: DifficultyLevel; // "easy" | "medium" | "hard"
  settings: UserSettings;
}

interface PlayerState {
  id: string;        // "p1", "p2", ...
  name: string;      // "Layla", "Buddy", etc.
  pawnColor: string; // hex or Tailwind color token
  position: number;  // index in board array
}

interface BoardTile {
  index: number;               // 0 = start
  type: "color" | "special" | "sticky" | "finish";
  color?: CandyColor;          // only for "color"
  label?: string;              // e.g. "Gumdrop Mountain"
  jumpToIndex?: number;        // forced teleport destination
  skipTurns?: number;          // e.g. 1 means lose next turn
  isFinish?: boolean;          // helper to mark the final tile
}

type CandyColor = "red" | "purple" | "yellow" | "blue" | "orange" | "green";

interface Card {
  kind: "single" | "double" | "special";
  color?: CandyColor;    // for "single"/"double"
  targetLabel?: string;  // for "special": board label to jump to
}

type DifficultyLevel = "easy" | "medium" | "hard";

interface UserSettings {
  theme: "light" | "dark";
  colorblindMode: boolean;
  // future: highContrast?: boolean;
  // future: largeText?: boolean;
}
```

### Turn Resolution (Reducer-driven)
Algorithm:
1. Check if current player is skipping.
   - If `skipTurnMap[playerId] > 0`:
     - Decrement that number.
     - Log “Player X skipped their turn.”
     - Advance to next player.
     - End.
2. Draw a card:
   - If `deck.length === 0`, reshuffle `discardPile` back into `deck`.
   - `card = deck.shift()`.
3. Move pawn:
   - Single/Double color:
     - Find next or 2nd-next tile of that color ahead of the pawn.
     - Move pawn to that index.
     - If that index is beyond last tile, clamp to last tile (win).
   - Special:
     - Jump directly to the tile whose `label` matches `card.targetLabel`, even if it’s behind you.
4. Apply landing tile effects:
   - `jumpToIndex`: teleport pawn there.
   - `skipTurns`: set `skipTurnMap[playerId] = skipTurns`.
   - `isFinish === true`: set `winnerPlayerId`.
5. Push card into `discardPile`.
6. If `winnerPlayerId` is set, game over.
7. Otherwise, advance `currentPlayerIndex` to the next player (skipping anyone who still has skipTurn pending).

This logic lives in `/engine` (pure TypeScript), not in React components, so later we can reuse it on a backend for real online games.


## 5. Frontend Tech Stack

### 5.1 Framework
- React + TypeScript.
- Vite build.
- React Router with hash-based routing (e.g. `/#/setup`, `/#/game`) so it works cleanly on GitHub Pages (no server to handle deep links).

### 5.2 State Management
- A reducer or Zustand store that:
  - Holds `GameState`.
  - Exposes actions like:
    - `startGame(config)`
    - `drawCardAndResolveTurn()`
    - `updateSettings({ theme, colorblindMode })`
    - `resetGame()`

### 5.3 Styling
- TailwindCSS.
- Root `<div>` (or `<body>`) gets theme class (`theme-light` / `theme-dark`).
- Components check `colorblindMode` to decide if they render color swatch only vs color + icon/label.

### 5.4 Components (initial set)
- `<HomeScreen />`
- `<SetupScreen />`
- `<GameScreen />`
  - `<Board />`
    - `<Tile />`
    - `<Pawn />`
  - `<TurnPanel />`
  - `<CardReveal />`
  - `<WinnerModal />`
  - `<SettingsDrawer />`

Animations (Framer Motion or CSS transitions):
- Card flip.
- Pawn hop.
- Winner modal fade in.


## 6. Deployment / Hosting

Target: GitHub Pages.

Workflow:
1. Repo contains game source.
2. `vite build` creates static assets in `/dist`.
3. `/dist` is pushed to a `gh-pages` branch.
4. GitHub Pages serves the game at that branch’s URL.

We avoid AWS infra for v0.2 because everything runs client-side in-memory. We can migrate to AWS (Amplify / CloudFront / Lambda / DynamoDB) later when we add:
- Online multiplayer,
- Server-backed authoritative game state,
- Dynamic boards for Hard mode.


## 7. Future (Post v0.2)

### 7.1 Hard Mode / Dynamic Board
- Procedurally build a board with traps/branches.
- Needs a stable shared definition for all players, so likely requires a backend once multiplayer exists.
- For now: UI can show “Hard (Coming Soon)” and engine can throw “Not implemented” if asked to start with `"hard"`.

### 7.2 Online Multiplayer
- Multiple devices join the same game.
- Server becomes the source of truth for:
  - GameState
  - Deck order
  - Board layout (especially for dynamic boards)
- Realtime sync (WebSockets).
- Likely AWS-backed in the future (Lambda + DynamoDB + API Gateway WebSocket).

### 7.3 Persistence
- Save game / resume game.
- Store in localStorage for solo device play.
- Later: store per-session in DynamoDB for online play.

### 7.4 Accessibility Extras
- Working high-contrast theme.
- Scalable “large text” mode for low-vision players.


## 8. Milestones / Work Plan

### Milestone 1 — Engine and Presets
- Define all types (`GameState`, `BoardTile`, `Card`, etc.).
- Create `engine/boardPresets/easy.ts` and `engine/boardPresets/medium.ts`.
- Create placeholder `engine/boardPresets/hard.ts` that throws “Not implemented yet.”
- Build deck creation / shuffle / draw logic.
- Build reducer-driven turn resolution with skip turns, teleports, win condition.
- Add unit tests.

### Milestone 2 — UI / Local Play
- Build HomeScreen → SetupScreen → GameScreen (hash routes).
- Implement SetupScreen (players, difficulty, theme, colorblind).
- Implement GameScreen (board render, pawns, Draw Card button, turn log).
- Show Settings drawer.
- Show Winner modal.

### Milestone 3 — Accessibility + Theming
- Light/dark theme toggle.
- Colorblind mode that adds icon/label to colored tiles, cards, and pawns.
- Responsive layout so kids can play on an iPad.

### Milestone 4 — Deploy to GitHub Pages
- Add build + deploy step.
- Publish public URL.
- Document usage in README.
