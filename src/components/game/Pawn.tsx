import type { PlayerState } from '@engine/types';

interface PawnProps {
  player: PlayerState;
  colorblindMode: boolean;
  small?: boolean;
}

export default function Pawn({ player, small = false }: PawnProps) {
  const sizeClass = small ? 'w-7 h-9 text-xs' : 'w-9 h-11 text-sm';
  
  return (
    <div
      className={`${sizeClass} rounded-t-full rounded-b-lg border-2 border-white shadow-xl flex items-center justify-center font-bold text-white relative transform hover:scale-110 transition-transform`}
      style={{ 
        backgroundColor: player.pawnColor,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2), inset 0 -1px 2px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.4)'
      }}
      title={player.name}
    >
      {/* Gumdrop shine effect */}
      <div className="absolute top-1 left-1 right-1 h-2 bg-white opacity-30 rounded-t-full"></div>
      {/* Player initial - always shown for accessibility */}
      <span className="relative z-10 text-white drop-shadow-lg">
        {player.name.charAt(0).toUpperCase()}
      </span>
    </div>
  );
}
