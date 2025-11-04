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
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 dark:from-gray-900 dark:to-purple-900">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow-md p-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl font-bold text-purple-600 dark:text-purple-400">
              🍭 Candyland Game
            </h1>
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg font-semibold transition"
            >
              ⚙️ Settings
            </button>
          </div>
        </div>

        {/* Main Game Area */}
        <div className="max-w-7xl mx-auto p-4">
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
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                  {state.lastDrawnCard ? 'Last Card Drawn' : 'Draw a card to start!'}
                </h3>
                <div className="flex justify-center">
                  <CardReveal
                    card={state.lastDrawnCard}
                    colorblindMode={state.settings.colorblindMode}
                  />
                </div>
              </div>

              {/* Turn Log */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                  Turn Log
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {state.turnLog.slice().reverse().map((log, index) => (
                    <div
                      key={index}
                      className="text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 pb-2"
                    >
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Panel - Board */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                  Game Board
                </h3>
                <Board
                  tiles={state.board}
                  players={state.players}
                  colorblindMode={state.settings.colorblindMode}
                />
              </div>

              {/* Player Status */}
              <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                  Players
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {state.players.map((player) => (
                    <div
                      key={player.id}
                      className={`p-4 rounded-lg border-2 ${
                        player.id === currentPlayer.id
                          ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className="w-6 h-6 rounded-full border-2 border-white shadow"
                          style={{ backgroundColor: player.pawnColor }}
                        />
                        <div className="font-semibold text-gray-800 dark:text-gray-200">
                          {player.name}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
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
