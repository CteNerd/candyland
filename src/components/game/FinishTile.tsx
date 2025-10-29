interface FinishTileProps {
  children?: React.ReactNode;
}

export default function FinishTile({ children }: FinishTileProps) {
  return (
    <div className="relative flex flex-col items-center">
      <div className="w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-gradient-to-br from-yellow-300 via-amber-400 to-orange-500 dark:from-yellow-500 dark:via-amber-600 dark:to-orange-700 border-4 border-yellow-500 dark:border-yellow-600 flex flex-col items-center justify-center shadow-2xl transform hover:scale-105 transition-transform animate-pulse">
        <div className="text-4xl mb-1">🏰</div>
        <div className="text-sm font-bold text-white drop-shadow-lg">FINISH</div>
      </div>
      {/* Pawns container - positioned on the tile */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-wrap gap-1 justify-center max-w-24">
        {children}
      </div>
    </div>
  );
}
