import type { PlayerState } from '@engine/types';
import Pawn from './Pawn';

interface TurnPanelProps {
  currentPlayer: PlayerState;
  onDrawCard: () => void;
  canDraw: boolean;
  isSkipping: boolean;
  colorblindMode: boolean;
}

export default function TurnPanel({
  currentPlayer,
  onDrawCard,
  canDraw,
  isSkipping,
  colorblindMode
}: TurnPanelProps) {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/50 dark:to-pink-900/50 backdrop-blur-sm rounded-3xl shadow-xl p-6 border-2 border-white/50 dark:border-purple-500/50">
      <h2 className="text-2xl font-bold mb-4 text-purple-700 dark:text-purple-200" style={{ fontFamily: 'Comic Sans MS, cursive, sans-serif' }}>
        ✨ Current Turn
      </h2>
      
      <div className="flex items-center gap-4 mb-6">
        <Pawn player={currentPlayer} colorblindMode={colorblindMode} />
        <div>
          <div className="text-xl font-semibold text-purple-900 dark:text-purple-100">
            {currentPlayer.name}
          </div>
          <div className="text-sm text-purple-600 dark:text-purple-300">
            Position: {currentPlayer.position}
          </div>
        </div>
      </div>

      <button
        onClick={onDrawCard}
        disabled={!canDraw}
        className={`w-full py-4 px-6 rounded-full font-bold text-lg transition-all ${
          canDraw
            ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white shadow-2xl transform hover:scale-105 hover:shadow-purple-500/50'
            : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed'
        }`}
        style={{
          fontFamily: 'Comic Sans MS, cursive, sans-serif',
          boxShadow: canDraw ? '0 4px 15px rgba(168, 85, 247, 0.4)' : 'none'
        }}
      >
        {isSkipping ? '⏭️ Skip Turn' : '🎴 Draw Card'}
      </button>
    </div>
  );
}
