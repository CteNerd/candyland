import Tile from './Tile';
import StartTile from './StartTile';
import FinishTile from './FinishTile';
import BoardBackground from './BoardBackground';
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

  // Calculate grid dimensions based on layout hints
  const maxRow = Math.max(...tiles.map(t => t.row ?? 0));
  const maxCol = Math.max(...tiles.map(t => t.col ?? 0));

  return (
    <div className="w-full overflow-x-auto pb-4 relative">
      <div className="min-w-max relative">
        {/* Background candy decorations */}
        <BoardBackground />
        
        {/* Render board in a positioned grid layout based on row/col */}
        <div 
          className="relative grid gap-6 p-8"
          style={{
            gridTemplateRows: `repeat(${maxRow + 1}, minmax(80px, auto))`,
            gridTemplateColumns: `repeat(${maxCol + 1}, minmax(80px, auto))`
          }}
        >
          {tiles.map((tile) => {
            const row = tile.row ?? Math.floor(tile.index / 10);
            const col = tile.col ?? tile.index % 10;
            const offsetX = tile.offsetX ?? 0;
            const offsetY = tile.offsetY ?? 0;
            
            const playersOnTile = playersByPosition[tile.index] || [];
            const pawns = playersOnTile.map((player) => (
              <Pawn
                key={player.id}
                player={player}
                colorblindMode={colorblindMode}
                small={playersOnTile.length > 2}
              />
            ));

            return (
              <div
                key={tile.index}
                style={{
                  gridRow: row + 1,
                  gridColumn: col + 1,
                  transform: `translate(${offsetX}px, ${offsetY}px)`
                }}
              >
                {tile.index === 0 ? (
                  <StartTile>{pawns}</StartTile>
                ) : tile.type === 'finish' ? (
                  <FinishTile>{pawns}</FinishTile>
                ) : (
                  <Tile tile={tile} colorblindMode={colorblindMode}>
                    {pawns}
                  </Tile>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
