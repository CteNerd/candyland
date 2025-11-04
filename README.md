# Candyland Web Game

A browser-based implementation of a Candyland-style board game built with React, TypeScript, and Vite. This game supports 2-4 players in local pass-and-play mode with full accessibility features including dark mode and colorblind mode.

## Features

- ✨ **Local Multiplayer**: 2-4 players taking turns on the same device
- 🎨 **Accessibility**: Dark/light themes and colorblind mode with icons
- 🎯 **Three Difficulty Levels**: Easy, Medium, and Hard (coming soon)
- 🎮 **Classic Gameplay**: Draw cards, move pawns, reach the finish first
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile
- 🚀 **Fast & Modern**: Built with Vite for instant hot reload

## Build Status

![Build Status](https://github.com/CteNerd/candyland/actions/workflows/webpack.yml/badge.svg)

## Live Demo

Play the game at: https://ctenerd.github.io/candyland/

## How to Play

1. **Setup**: Choose the number of players (2-4), enter names, and select pawn colors
2. **Select Difficulty**: Choose Easy or Medium mode
3. **Game Options**: Toggle dark mode or colorblind mode as needed
4. **Start Game**: Players take turns drawing cards to move their pawns
5. **Win**: First player to reach the finish tile wins!

### Game Rules

- Draw a card on your turn
- Single color cards move you to the next tile of that color
- Double color cards move you to the second-next tile of that color
- Special cards teleport you to named locations
- Some tiles make you skip your next turn
- First to the finish wins!

## Development

### Prerequisites

- Node.js 20+ (https://nodejs.org/)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/CteNerd/candyland.git
   cd candyland
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Available Scripts

#### `npm run dev`

Runs the app in development mode with hot reload.
Open [http://localhost:5173/candyland/](http://localhost:5173/candyland/) to view it in the browser.

#### `npm run build`

Builds the app for production to the `dist` folder.
The build is optimized and minified for the best performance.

#### `npm run preview`

Previews the production build locally.

### Project Structure

```
candyland/
├── engine/              # Pure TypeScript game logic (no React)
│   ├── types.ts         # Type definitions
│   ├── deck.ts          # Deck management
│   ├── rules.ts         # Turn resolution logic
│   ├── reducer.ts       # Game state reducer
│   └── boardPresets/    # Board configurations
│       ├── easy.ts
│       ├── medium.ts
│       └── hard.ts
├── src/
│   ├── components/      # React components
│   │   └── game/        # Game-specific components
│   ├── context/         # React context providers
│   ├── screens/         # Main screen components
│   ├── App.tsx          # Main app component
│   └── main.tsx         # Entry point
├── index.html           # HTML template
├── vite.config.ts       # Vite configuration
└── tailwind.config.js   # Tailwind CSS configuration
```

## Deployment to GitHub Pages

The game automatically deploys to GitHub Pages when changes are pushed to the `main` branch.

### Manual Deployment

You can also deploy manually using:

```bash
npm run build
npm run deploy
```

### Configuration

The game is configured to deploy to GitHub Pages with:
- Base path: `/candyland/`
- Hash-based routing for proper navigation
- Static asset optimization

## Technical Details

### Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3
- **Routing**: React Router 6 (hash-based)
- **State Management**: React Context + useReducer

### Game Engine Architecture

The game logic is separated into the `/engine` folder with pure TypeScript code (no React dependencies). This allows:
- Easy testing of game logic
- Potential reuse in a backend for online multiplayer
- Clear separation of concerns

Key modules:
- **types.ts**: All TypeScript interfaces and types
- **deck.ts**: Card creation, shuffling, and drawing
- **rules.ts**: Movement, tile effects, win conditions
- **reducer.ts**: State management following the algorithm in SPEC.md
- **boardPresets/**: Predefined board layouts for each difficulty

### Accessibility Features

- **Theme Support**: Light and dark modes
- **Colorblind Mode**: Icons and labels added to colors
- **Keyboard Navigation**: Full keyboard support
- **Responsive**: Works on all screen sizes

## Future Enhancements

- 🌐 Online multiplayer support
- 🎲 Hard mode with procedurally generated boards
- 💾 Save/resume game functionality
- 🎵 Sound effects and music
- 📊 Game statistics and achievements

## Contributing

This is a demonstration project. Feel free to fork and modify for your own use.

## License

This project is for demonstration purposes. The Candyland game concept is owned by Hasbro. This implementation is not affiliated with or endorsed by Hasbro.

## Learn More

- [SPEC.md](SPEC.md) - Full technical specification
- [React Documentation](https://reactjs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
