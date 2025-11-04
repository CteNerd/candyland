import { COLOR_METADATA } from '@engine/types';
import type { BoardTile as BoardTileType } from '@engine/types';

interface TileProps {
  tile: BoardTileType;
  colorblindMode: boolean;
  children?: React.ReactNode;
}

export default function Tile({ tile, colorblindMode, children }: TileProps) {
  const getColorClass = () => {
    if (tile.color) {
      return COLOR_METADATA[tile.color].baseColorClass;
    }
    if (tile.type === 'finish') {
      return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
    }
    if (tile.type === 'sticky') {
      return 'bg-gray-400';
    }
    return 'bg-gray-200 dark:bg-gray-700';
  };

  const getIcon = () => {
    if (tile.color && colorblindMode) {
      return COLOR_METADATA[tile.color].icon;
    }
    if (tile.type === 'finish') {
      return '🏁';
    }
    if (tile.type === 'sticky') {
      return '🍯';
    }
    if (tile.jumpToIndex !== undefined) {
      return '🌀';
    }
    return null;
  };

  const getLabel = () => {
    if (tile.label) {
      return tile.label;
    }
    if (tile.color && colorblindMode) {
      return COLOR_METADATA[tile.color].label;
    }
    return null;
  };

  return (
    <div className="relative flex flex-col items-center">
      <div
        className={`w-16 h-16 md:w-20 md:h-20 rounded-lg ${getColorClass()} border-2 border-gray-400 dark:border-gray-600 flex items-center justify-center text-2xl shadow-md transition-transform hover:scale-105`}
      >
        {getIcon()}
        {colorblindMode && !getIcon() && getLabel() && (
          <span className="text-white font-bold text-xl">{getLabel()}</span>
        )}
      </div>
      {tile.label && (
        <div className="text-xs mt-1 text-center text-gray-700 dark:text-gray-300 max-w-20">
          {tile.label}
        </div>
      )}
      {tile.index > 0 && (
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {tile.index}
        </div>
      )}
      {/* Pawns container */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
        {children}
      </div>
    </div>
  );
}
