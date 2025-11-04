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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
        Current Turn
      </h2>
      
      <div className="flex items-center gap-4 mb-6">
        <Pawn player={currentPlayer} colorblindMode={colorblindMode} />
        <div>
          <div className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            {currentPlayer.name}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Position: {currentPlayer.position}
          </div>
        </div>
      </div>

      <button
        onClick={onDrawCard}
        disabled={!canDraw}
        className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all ${
          canDraw
            ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg transform hover:scale-105'
            : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed'
        }`}
      >
        {isSkipping ? 'Skip Turn' : 'Draw Card'}
      </button>
    </div>
  );
}
