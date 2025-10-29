# Visual & Theming Spec (v2.1)

## Purpose

v2 delivered game flow and rules (see SPEC.md).  
v2.1 focuses on *how the game looks and feels* so it's closer to the physical Candy Land board instead of a grid of boxes.

This doc defines:
1. Board layout presentation
2. Tile and pawn styling
3. Landmark sections / zones
4. Global theme (color, background, typography)
5. HUD / UI chrome design
6. Accessibility requirements that must remain true

Game rules, reducer logic, turn order, difficulty modes, etc. from `SPEC.md` (v2) do **not** change here. v2.1 is visual / presentation.


---

## 1. Board Layout

### 1.1 Curved / winding path, not a rectangular grid
- The game path should look like a candy trail that snakes across the board, similar to the physical game.
- Tiles should be arranged so they *appear* to curve left/right/down rather than forming perfectly aligned rows/columns.
- The path should visually "turn corners" several times.

**Acceptance (v2.1):**
- The rendered board path is not shown as a perfect grid.
- Tiles are placed in bands/rows that change direction, creating a snake-like path.
- There are visible turns in direction (left → right → left → downward, etc.).

**Implementation suggestion:**
Extend the board data to include layout hints per tile:
```ts
interface BoardTile {
  index: number;
  type: "color" | "special" | "sticky" | "finish";
  color?: CandyColor;
  label?: string;
  jumpToIndex?: number;
  skipTurns?: number;
  isFinish?: boolean;

  // NEW FOR VISUAL LAYOUT
  row?: number;
  col?: number;
  offsetX?: number; // pixel nudge to break perfect grid alignment
  offsetY?: number; // pixel nudge to break perfect grid alignment
}
```

Then render tiles inside a relatively positioned container using these coordinates to fake curvature.

### 1.2 Background world
- Behind the trail should be a candy/fantasy world instead of plain white.
- For v2.1 this can be pastel gradients plus candy-themed SVGs / emoji clusters (gumdrops, cupcakes, lollipops).
- The board should feel like it sits *on top of* a world, not like isolated boxes floating in dev UI.

**Acceptance (v2.1):**
- The board component includes a background layer (`BoardBackground`) with candy/fantasy decoration.
- The tile path sits above that layer.

### 1.3 Start and Finish presentation
- The Start tile should visually look like a "START" marker (frosted/outlined tile) and be clearly labeled.
- The Finish tile should feel like a final destination (castle, crown, or checkered flag).
- Finish tile should pop: glow, unique border, or a custom icon.

**Acceptance (v2.1):**
- Start tile uses a unique visual (e.g. frosted gray/white tile with "START").
- Finish tile uses its own component (e.g. candy castle tile, gold/glow tile, or flag tile) and is clearly not "just another color square."
- Finish tile includes an icon that implies "goal" (castle / crown / flag).


---

## 2. Tile Styling

### 2.1 Shape & look
- Tiles should read like candy pieces, not like neutral wireframe cards.
- Rounded corners with high radius.
- Soft drop shadow / inner shadow.
- A subtle glossy highlight near the top-left for a "candy" feel.

**Acceptance (v2.1):**
- Default color tiles render with:
  - Rounded candy shape
  - Bold fill color
  - Gloss/shine or inner shadow
- No harsh gray box borders around every tile.

### 2.2 Color tiles
We keep the six core colors from v2 (`red`, `purple`, `yellow`, `blue`, `orange`, `green`) and still map them to movement rules.

For each color tile:
- The tile background uses that color as a solid base.
- An icon or badge sits in the center (🍓 for red, 🍇 for purple, 🍋 for yellow, 💧 for blue, 🍊 for orange, 🍏 for green, etc.).
- Tile index / debug text is visually de-emphasized (tiny or hidden in production mode).

**Acceptance (v2.1):**
- Icons/emojis/images are the main visual for tiles, not tiny and secondary.
- The color swatch dominates the tile.
- (For colorblind mode) each tile clearly shows an icon or label, not just the fill color.

### 2.3 Special / Landmark tiles
Some tiles represent zones/landmarks, e.g. "Lollipop Woods" or "Marshmallow Cottage."

In v2.1 these tiles must stand out:
- Larger or differently styled tile (e.g. signboard style, patterned background).
- Includes a visible label *inside* or attached to the tile.
- May include a mini illustration (cupcake house, lollipop forest, peppermint bridge, etc.) next to it.

**Acceptance (v2.1):**
- Special tiles are not visually identical to normal color tiles.
- Special tiles either:
  - Render bigger (1.2x scale), OR
  - Render with a banner/callout style tile.
- The label (e.g. "Lollipop Woods") is readable right on the board, not only in a sidebar.

To support this, extend `BoardTile` further for visuals:
```ts
interface BoardTile {
  // ...previous fields...

  emphasize?: boolean;   // render bigger / banner-style
  landmarkArt?: string;  // key for a themed illustration to render nearby
}
```

### 2.4 Sticky / skip-turn tiles
- Tiles that cause "lose a turn" or similar should show an "X", sticky goo, or hazard overlay.
- That hazard marker should still be visible even if 2+ pawns sit on the tile.

**Acceptance (v2.1):**
- Sticky tiles visibly communicate "bad tile" on the board itself (not only in the turn log).
- Marker is rendered both as a background overlay AND as a floating badge above the tile (so it doesn't get hidden by pawns).


---

## 3. Landmarks / Zones

The physical board moves through themed areas (gingerbread house, licorice guy, etc.). We will do our own candy-themed zones to avoid IP, but copy the idea of "you are now in a new world section."

For v2.1:
- Each major special tile marks entry into a named zone such as:
  - "Marshmallow Cottage"
  - "Lollipop Woods"
  - "Peppermint Bridge"
  - "Cupcake Castle" (finish)

Each zone should have:
1. A named special tile.
2. A decorative illustration / cluster of themed art positioned behind or next to that portion of the path.

**Acceptance (v2.1):**
- For each special tile, we render:
  - The tile itself (banner-style, labeled).
  - A nearby decorative element (SVG / emoji cluster / illustration div).
- Zone names appear in the board area, not only in logs.

We do NOT need fully custom drawn art in v2.1. Placeholder illustrations (SVG candy house, simple lollipop forest shape, etc.) are acceptable.


---

## 4. Pawns / Player Markers

### 4.1 Pawn visual style
- Pawns should look like candy tokens or gumdrop pieces instead of plain "P" circles.
- Each pawn gets:
  - A body color (player color selection).
  - Player initial or avatar letter for colorblind clarity.

### 4.2 Pawn placement
- Pawns should sit directly *on top* of their tile in the path.
- If multiple players share a tile:
  - Slight horizontal offset so they appear grouped.
  - No vertical "legend row" under the board.

**Acceptance (v2.1):**
- Pawns render on the actual board path, not in a separate row underneath.
- Multi-pawn stacking is handled visually in-tile (offset or layered token stack).


---

## 5. HUD / UI Chrome

HUD = side panel / turn info / draw card button.

The current HUD in v2 looks like an admin dashboard. We want it to feel like part of the game world.

### 5.1 Turn panel styling
- The "Current Turn" card and "Draw Card" button should sit on soft, candy-themed panels.
- Panels use pastel backgrounds (lavender, cotton-candy pink, mint) with rounded corners and a soft drop shadow (not gray border).
- Typography should feel playful / rounded, not corporate.

### 5.2 "Draw Card" button
- The button should feel like a candy/jelly button:
  - Rounded pill shape or big-radius corners
  - Gradient or glossy highlight
  - Bold, high-contrast text
- No flat purple rectangle with hard edges.

### 5.3 Card reveal area
- The "you drew this card" view should look like you're flipping an oversized Candyland card:
  - Big tile color / icon dominates the card face.
  - The card back can have a candy swirl / pastel gradient style.
- This should visually match the board aesthetic.

### 5.4 Header / Settings
- The top header bar ("Candyland Game" in v2) should get a playful gradient background instead of plain white/gray.
- The title should look like a game title logo, not a nav breadcrumb.
- It's okay to keep the Settings gear icon in the top-right, but the bar behind it should now match the candy theme (pink→purple, yellow→pink, etc.).

**Acceptance (v2.1):**
- Turn panel, Draw Card button, Card Reveal panel, and Header/Settings all use candy/pastel styling.
- UI cards no longer look like generic white dashboards with gray borders.


---

## 6. Responsiveness

We still support desktop, tablet, and phone.

v2.1 layout rules:
- Desktop: Board (big) on the right, HUD (turn panel + draw card + log) on the left.
- Tablet / phone: Stack vertically:
  1. Board
  2. Turn panel
  3. Log / card reveal

**Acceptance (v2.1):**
- The layout gracefully stacks on smaller widths.
- Tiles and pawns are still readable at iPad landscape scale.


---

## 7. Accessibility & Theming (must remain)

These requirements from v2 still apply, and the new visuals must honor them:

### 7.1 Colorblind Mode
- Every colored tile shows an icon, emoji, or letter badge in addition to its background color.
- Pawns have player initials or letter overlays so you can identify them without relying on the pawn color.

### 7.2 Light / Dark Mode
- Light mode = bright candy world.
- Dark mode = "candy at night" vibe (deep purples/navies, glowing candy colors), not just generic dark gray.
- Icons and text remain readable in both modes.

**Acceptance (v2.1):**
- Board, tiles, pawns, HUD, and header all theme correctly in both light and dark modes.
- Colorblind mode works in both themes (the identifying icon/badge must remain visible and high-contrast).


---

## 8. Dev Notes / Implementation Guidance

### 8.1 Board layout engine
We do NOT need true bezier curves yet.
For v2.1, we can fake curvature by:
- Adding `row`, `col`, and small `offsetX`/`offsetY` values per tile.
- Rendering tiles in a relative container with `position: absolute; left: calc(...); top: calc(...);`
- Flipping direction every band of ~8-12 tiles to mimic a snake path.

Game logic remains 1D (index 0 → N). Rendering becomes 2D candy trail.

### 8.2 Special tiles / landmarks
Add presentational fields to tiles (`emphasize`, `landmarkArt`) and give those tiles a unique component:
- `<LandmarkTile />` instead of `<CandyTile />`
- Show larger tile shape/border and embedded label, e.g. "Lollipop Woods"
- Render a background illustration div near it

### 8.3 HUD restyle
Refactor left-side (or bottom on mobile) HUD panels into themed components:
- `<TurnPanel />`
- `<CardReveal />`
- `<CandyButton />` for Draw Card (reusable)

These components should:
- Use pastel gradients / candy gloss.
- Use rounded corners / pill shapes.
- Use playful font (rounded, not system default if possible).

### 8.4 Theme context
We already have `settings.theme` and `settings.colorblindMode` from v2. Keep those and apply to:
- Board background (light vs dark world)
- Tile backgrounds and shadows
- Pawn tokens
- HUD panels and header bar


---

## 9. Acceptance Criteria Summary (v2.1)

To consider v2.1 complete:

1. **Board trail looks like a winding candy path**, not a strict grid.
2. **Tiles look like candy pieces** (rounded, glossy, colorful) without harsh gray wireframe borders.
3. **Special/landmark tiles are visually distinct "zones"** with labels and background candy illustrations (e.g. "Lollipop Woods").
4. **Start and Finish tiles have unique visuals**: clearly marked "START" and a special "castle/finish" tile.
5. **Player pawns render ON the path tiles** and visually read like gumdrop/candy tokens with initials.
6. **HUD / Draw Card panel is candy-themed** (pastel cards, candy button, playful header gradient) instead of enterprise dashboard cards.
7. **Board + HUD are responsive**: desktop has side panel layout, mobile/tablet stack vertically.
8. **Accessibility still works**:
   - Colorblind mode shows icons/labels, not just raw color.
   - Light & dark modes both theme the candy world (not just switch to gray/black).
   - Pawns and tiles remain distinguishable in all modes.

If all of the above are true, the game moves from “functional prototype” (v2) to “visually feels like Candy Land” (v2.1).
