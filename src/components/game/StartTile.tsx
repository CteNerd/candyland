interface StartTileProps {
  children?: React.ReactNode;
}

export default function StartTile({ children }: StartTileProps) {
  return (
    <div className="relative flex flex-col items-center">
      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-white via-blue-50 to-purple-100 dark:from-gray-700 dark:via-purple-800 dark:to-purple-900 border-4 border-dashed border-purple-400 dark:border-purple-500 flex flex-col items-center justify-center shadow-2xl transform hover:scale-105 transition-transform">
        <div className="text-3xl mb-1">🏁</div>
        <div className="text-xs font-bold text-purple-700 dark:text-purple-300">START</div>
      </div>
      {/* Pawns container - positioned on the tile */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-wrap gap-1 justify-center max-w-20">
        {children}
      </div>
    </div>
  );
}
