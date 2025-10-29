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
    if (tile.type === 'sticky') {
      return 'bg-amber-600 dark:bg-amber-700';
    }
    return 'bg-pink-100 dark:bg-purple-900';
  };

  const getIcon = () => {
    if (tile.color) {
      return COLOR_METADATA[tile.color].icon;
    }
    if (tile.type === 'sticky') {
      return '🍯';
    }
    if (tile.jumpToIndex !== undefined) {
      return '🌀';
    }
    if (tile.landmarkArt) {
      return tile.landmarkArt;
    }
    return null;
  };

  const getLabel = () => {
    if (tile.label && tile.emphasize) {
      return tile.label;
    }
    if (tile.color && colorblindMode) {
      return COLOR_METADATA[tile.color].label;
    }
    return null;
  };

  // Special landmark tile styling
  if (tile.emphasize) {
    return (
      <div className="relative flex flex-col items-center">
        <div className="w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 dark:from-pink-600 dark:via-purple-700 dark:to-blue-800 border-4 border-white dark:border-purple-500 shadow-2xl flex flex-col items-center justify-center transform hover:scale-105 transition-transform">
          <div className="text-4xl mb-1">{getIcon()}</div>
          {tile.label && (
            <div className="text-xs font-bold text-white dark:text-purple-100 text-center px-2 bg-purple-600 dark:bg-purple-800 rounded-full py-1">
              {tile.label}
            </div>
          )}
        </div>
        {/* Pawns container - positioned on the tile */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-wrap gap-1 justify-center max-w-24">
          {children}
        </div>
      </div>
    );
  }

  // Regular candy tile
  return (
    <div className="relative flex flex-col items-center">
      <div
        className={`w-16 h-16 md:w-20 md:h-20 rounded-3xl ${getColorClass()} border-2 border-white dark:border-gray-600 flex items-center justify-center text-3xl md:text-4xl shadow-lg transform hover:scale-105 transition-transform`}
        style={{
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), inset 0 -2px 4px rgba(0, 0, 0, 0.1), inset 0 2px 4px rgba(255, 255, 255, 0.3)'
        }}
      >
        {getIcon()}
        {colorblindMode && !getIcon() && getLabel() && (
          <span className="text-white font-bold text-xl drop-shadow-lg">{getLabel()}</span>
        )}
      </div>
      {/* Show tile index only in debug mode or when needed */}
      {process.env.NODE_ENV === 'development' && tile.index > 0 && (
        <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          {tile.index}
        </div>
      )}
      {/* Pawns container - positioned on the tile */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-wrap gap-1 justify-center max-w-16 md:max-w-20">
        {children}
      </div>
    </div>
  );
}
