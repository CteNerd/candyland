import Tile from './Tile';
import Pawn from './Pawn';
import type { BoardTile as BoardTileType, PlayerState } from '@engine/types';

interface BoardProps {
  tiles: BoardTileType[];
  players: PlayerState[];
  colorblindMode: boolean;
}

export default function Board({ tiles, players, colorblindMode }: BoardProps) {
  // Group players by position for rendering
  const playersByPosition = players.reduce((acc, player) => {
    if (!acc[player.position]) {
      acc[player.position] = [];
    }
    acc[player.position].push(player);
    return acc;
  }, {} as Record<number, PlayerState[]>);

  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="min-w-max">
        {/* Render board in a grid layout */}
        <div className="grid grid-cols-6 md:grid-cols-10 gap-4 p-4">
          {tiles.map((tile) => (
            <Tile key={tile.index} tile={tile} colorblindMode={colorblindMode}>
              {playersByPosition[tile.index]?.map((player) => (
                <Pawn
                  key={player.id}
                  player={player}
                  colorblindMode={colorblindMode}
                  small={playersByPosition[tile.index].length > 2}
                />
              ))}
            </Tile>
          ))}
        </div>
      </div>
    </div>
  );
}
