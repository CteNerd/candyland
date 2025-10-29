import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import Board from '../components/game/Board';
import TurnPanel from '../components/game/TurnPanel';
import CardReveal from '../components/game/CardReveal';
import WinnerModal from '../components/game/WinnerModal';
import SettingsDrawer from '../components/game/SettingsDrawer';

export default function GameScreen() {
  const navigate = useNavigate();
  const { state, dispatch } = useGame();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Redirect to setup if no game is started
  if (state.players.length === 0) {
    navigate('/setup');
    return null;
  }

  const currentPlayer = state.players[state.currentPlayerIndex];
  const isSkipping = state.skipTurnMap[currentPlayer?.id] > 0;
  const canDraw = !state.winnerPlayerId;

  const handleDrawCard = () => {
    dispatch({ type: 'DRAW_CARD_AND_RESOLVE' });
  };

  const handlePlayAgain = () => {
    navigate('/setup');
  };

  const handleGoHome = () => {
    dispatch({ type: 'RESET_GAME' });
    navigate('/');
  };

  const handleThemeChange = (theme: 'light' | 'dark') => {
    dispatch({
      type: 'UPDATE_SETTINGS',
      payload: { theme }
    });
  };

  const handleColorblindModeChange = (colorblindMode: boolean) => {
    dispatch({
      type: 'UPDATE_SETTINGS',
      payload: { colorblindMode }
    });
  };

  const winner = state.winnerPlayerId
    ? state.players.find(p => p.id === state.winnerPlayerId)
    : undefined;

  return (
    <div className={state.settings.theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950">
        {/* Header with candy gradient */}
        <div className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 dark:from-pink-700 dark:via-purple-800 dark:to-blue-900 shadow-xl p-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg" style={{ fontFamily: 'Comic Sans MS, cursive, sans-serif' }}>
              🍭 Candyland Game 🍬
            </h1>
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="px-6 py-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              ⚙️ Settings
            </button>
          </div>
        </div>

        {/* Main Game Area */}
        <div className="max-w-7xl mx-auto p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Panel - Turn Info and Card */}
            <div className="lg:col-span-1 space-y-6">
              <TurnPanel
                currentPlayer={currentPlayer}
                onDrawCard={handleDrawCard}
                canDraw={canDraw}
                isSkipping={isSkipping}
                colorblindMode={state.settings.colorblindMode}
              />

              {/* Card Display */}
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-purple-900/50 dark:to-pink-900/50 backdrop-blur-sm rounded-3xl shadow-xl p-6 border-2 border-white/50 dark:border-purple-500/50">
                <h3 className="text-xl font-bold mb-4 text-purple-700 dark:text-purple-200" style={{ fontFamily: 'Comic Sans MS, cursive, sans-serif' }}>
                  {state.lastDrawnCard ? '🎴 Last Card Drawn' : '🎴 Draw a card to start!'}
                </h3>
                <div className="flex justify-center">
                  <CardReveal
                    card={state.lastDrawnCard}
                    colorblindMode={state.settings.colorblindMode}
                  />
                </div>
              </div>

              {/* Turn Log */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-indigo-900/50 dark:to-purple-900/50 backdrop-blur-sm rounded-3xl shadow-xl p-6 border-2 border-white/50 dark:border-purple-500/50">
                <h3 className="text-xl font-bold mb-4 text-purple-700 dark:text-purple-200" style={{ fontFamily: 'Comic Sans MS, cursive, sans-serif' }}>
                  📜 Turn Log
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {state.turnLog.slice().reverse().map((log, index) => (
                    <div
                      key={index}
                      className="text-sm text-purple-900 dark:text-purple-100 border-b border-purple-200 dark:border-purple-700 pb-2"
                    >
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Panel - Board */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-white/80 to-purple-50/80 dark:from-purple-900/50 dark:to-indigo-900/50 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border-2 border-white/50 dark:border-purple-500/50">
                <h3 className="text-2xl font-bold mb-4 text-purple-700 dark:text-purple-200" style={{ fontFamily: 'Comic Sans MS, cursive, sans-serif' }}>
                  🎮 Game Board
                </h3>
                <Board
                  tiles={state.board}
                  players={state.players}
                  colorblindMode={state.settings.colorblindMode}
                />
              </div>

              {/* Player Status */}
              <div className="mt-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-pink-900/50 dark:to-purple-900/50 backdrop-blur-sm rounded-3xl shadow-xl p-6 border-2 border-white/50 dark:border-purple-500/50">
                <h3 className="text-xl font-bold mb-4 text-purple-700 dark:text-purple-200" style={{ fontFamily: 'Comic Sans MS, cursive, sans-serif' }}>
                  👥 Players
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {state.players.map((player) => (
                    <div
                      key={player.id}
                      className={`p-4 rounded-2xl border-2 ${
                        player.id === currentPlayer.id
                          ? 'border-purple-500 bg-purple-100 dark:bg-purple-800/30 shadow-lg'
                          : 'border-purple-200 dark:border-purple-600 bg-white/50 dark:bg-purple-900/20'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className="w-6 h-6 rounded-full border-2 border-white shadow"
                          style={{ backgroundColor: player.pawnColor }}
                        />
                        <div className="font-semibold text-purple-900 dark:text-purple-100">
                          {player.name}
                        </div>
                      </div>
                      <div className="text-sm text-purple-700 dark:text-purple-300">
                        Position: {player.position}
                      </div>
                      {state.skipTurnMap[player.id] > 0 && (
                        <div className="text-xs text-red-600 dark:text-red-400 mt-1">
                          Skip {state.skipTurnMap[player.id]} turn(s)
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Winner Modal */}
        {winner && (
          <WinnerModal
            winnerName={winner.name}
            onPlayAgain={handlePlayAgain}
            onGoHome={handleGoHome}
          />
        )}

        {/* Settings Drawer */}
        <SettingsDrawer
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          theme={state.settings.theme}
          colorblindMode={state.settings.colorblindMode}
          onThemeChange={handleThemeChange}
          onColorblindModeChange={handleColorblindModeChange}
          onExitToHome={handleGoHome}
        />
      </div>
    </div>
  );
}
