import type { PlayerState } from '@engine/types';

interface PawnProps {
  player: PlayerState;
  colorblindMode: boolean;
  small?: boolean;
}

export default function Pawn({ player, colorblindMode, small = false }: PawnProps) {
  const sizeClass = small ? 'w-6 h-6 text-xs' : 'w-8 h-8 text-sm';
  
  return (
    <div
      className={`${sizeClass} rounded-full border-2 border-white shadow-lg flex items-center justify-center font-bold text-white`}
      style={{ backgroundColor: player.pawnColor }}
      title={player.name}
    >
      {colorblindMode && (
        <span className="text-white">
          {player.name.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
}
