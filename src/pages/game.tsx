import React, { useEffect } from "react";
import CardGenerator from "../components/cardGenerator";
import PlayerSignup from "../components/playerSignup";
import { Pawn } from "../types/pawn";
import PlayerTable from "../components/playerTable";
import "./game.css";

const initPlayers: Pawn[] = [
    { color: 'Green', name: 'Player 1' },
    { color: 'Yellow', name: 'Player 2' },
    { color: 'Red', name: 'Player 3' },
    { color: 'Blue', name: 'Player 4' }
];

export default function Game() {
    const [players, setPlayers] = React.useState<Pawn[]>([]);
    const [tableVis, setTableVis] = React.useState(false);
    const [errors, setErrors] = React.useState({ players: "", inputError: true });

    function handlePlayerChange(index: number, player: Pawn, errors: { name: string, color: string }): void {
        setErrors((prevErrors) => ({ ...prevErrors, inputError: errors.name !== "" || errors.color !== "" }));
        // ensure there is only one player per color selection
        const existingPlayerIndex = players.findIndex(p => p.color === player.color);
        if (existingPlayerIndex !== -1 && existingPlayerIndex !== index) {
            setErrors((prevErrors) => ({ ...prevErrors, players: `Player with the same color ${player.color} already exists.` }));
            return;
        }
        // update the player at the given index
        const updatedPlayers = [...players];
        updatedPlayers[index] = player;
        setPlayers(updatedPlayers);

        validatePlayers();
    }

    function validatePlayers() {
        console.log(`Validating players: ${players.length}`);
        if (players.length < 0) {
            setErrors((prevErrors) => ({ ...prevErrors, players: "Please fill in all players" }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, players: "" }));
        }
    }

    function handleStartGame() {
        const nonInitPlayers = players.filter(player => !initPlayers.some(initPlayer => initPlayer.name === player.name));
        nonInitPlayers.forEach(player => {
            console.log(`Player: ${player.name}, Color: ${player.color}`);
        });
        setPlayers(nonInitPlayers);
        setTableVis(true);
    }

    return (
        <div className="container">
            <h1>Players</h1>
            <div style={{ display: !tableVis ? "block" : "none" }}>
                {initPlayers.map((player, index) => (
                    <div key={index}>
                        <PlayerSignup index={index} player={player} onChange={handlePlayerChange} />
                        
                    </div>
                ))}
                {errors.players && <span style={{ color: "red" }}>{errors.players}</span>}
                <button onClick={handleStartGame} disabled={errors.inputError || errors.players !== ""}>Start Game</button>
            </div>
            <hr className="styled-hr" />
            <PlayerTable players={players} display={tableVis} />
            <hr className="styled-hr"  hidden={!tableVis} />
            <CardGenerator players={players} numberOfPlayers={players.length} drawEnabled={tableVis}/>
        </div>
    );
}