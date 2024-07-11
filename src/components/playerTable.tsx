import { Pawn } from "../types/pawn";
import "./playersTable.css";

interface PlayerTableProps {
    players: Pawn[];
    display: boolean;
}

const PlayerTable: React.FC<PlayerTableProps> = (props: PlayerTableProps) => {
    return (
        <table style={{ display: props.display ? "block" : "none" }}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Color</th>
                </tr>
            </thead>
            <tbody>
                {props.players.map((player, index) => (
                    <tr key={index}>
                        <td>{player.name}</td>
                        <td>{player.color}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default PlayerTable;