import React, { useEffect } from "react";
import { Pawn } from "../types/pawn";

type PlayerSignupProps = {
    index: number;
    player: Pawn;
    onChange: (index: number, player: Pawn, errors: { name: string, color: string }) => void;
};

export default function PlayerSignup(props: PlayerSignupProps) {
    const [playerName, setPlayerName] = React.useState(props.player.name);
    const [playerColor, setPlayerColor] = React.useState(props.player.name);
    const [errors, setErrors] = React.useState({ name: "", color: "" });

    const validateName = (name: string) => {
        if (name.trim() === "") {
            return "Name cannot be empty";
        }
        return "";
    };

    const validateColor = (color: string) => {
        if (color === "Pick a color") {
            return "Please select a valid color";
        }
        return "";
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newName = event.target.value;
        setPlayerName(newName);
        setErrors((prevErrors) => ({ ...prevErrors, name: validateName(newName) }));
    };

    const handleColorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newColor = event.target.value
        setPlayerColor(newColor);
        setErrors((prevErrors) => ({ ...prevErrors, color: validateColor(newColor) }));
    };

    const handleBlur = () => {
        const updatedPlayer = { ...props.player, name: playerName, color: playerColor };
        props.onChange(props.index, updatedPlayer, errors);
    };

    return (
        <div onBlur={handleBlur}>
            <label>Name</label>
            <input placeholder={playerName} onChange={handleNameChange} />
            {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
            <label>Color</label>
            <select value={playerColor} onChange={handleColorChange}>
                <option>Pick a color</option>
                <option value="Red">Red</option>
                <option value="Blue">Blue</option>
                <option value="Green">Green</option>
                <option value="Yellow">Yellow</option>
            </select>
            {errors.color && <span style={{ color: "red" }}>{errors.color}</span>}
        </div>
    );
}
