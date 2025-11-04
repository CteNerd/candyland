import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { DifficultyLevel } from '@engine/types';

const PAWN_COLORS = [
  { name: 'Red', value: '#ef4444' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Green', value: '#22c55e' },
  { name: 'Yellow', value: '#facc15' },
  { name: 'Purple', value: '#a855f7' },
  { name: 'Orange', value: '#f97316' }
];

interface PlayerConfig {
  name: string;
  pawnColor: string;
}

export default function SetupScreen() {
  const navigate = useNavigate();
  const { dispatch } = useGame();
  
  const [numPlayers, setNumPlayers] = useState(2);
  const [players, setPlayers] = useState<PlayerConfig[]>([
    { name: 'Player 1', pawnColor: '#ef4444' },
    { name: 'Player 2', pawnColor: '#3b82f6' }
  ]);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('easy');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [colorblindMode, setColorblindMode] = useState(false);

  const handleNumPlayersChange = (num: number) => {
    setNumPlayers(num);
    const newPlayers = [...players];
    
    // Add or remove players as needed
    while (newPlayers.length < num) {
      const defaultColors = ['#ef4444', '#3b82f6', '#22c55e', '#facc15'];
      newPlayers.push({
        name: `Player ${newPlayers.length + 1}`,
        pawnColor: defaultColors[newPlayers.length % defaultColors.length]
      });
    }
    
    if (newPlayers.length > num) {
      newPlayers.splice(num);
    }
    
    setPlayers(newPlayers);
  };

  const handlePlayerNameChange = (index: number, name: string) => {
    const newPlayers = [...players];
    newPlayers[index].name = name;
    setPlayers(newPlayers);
  };

  const handlePlayerColorChange = (index: number, color: string) => {
    const newPlayers = [...players];
    newPlayers[index].pawnColor = color;
    setPlayers(newPlayers);
  };

  const handleStartGame = () => {
    dispatch({
      type: 'START_GAME',
      payload: {
        players,
        difficulty,
        settings: {
          theme,
          colorblindMode
        }
      }
    });
    navigate('/game');
  };

  const isValid = players.every(p => p.name.trim() !== '');

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 dark:from-gray-900 dark:to-blue-900 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
            <h1 className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-8">
              Game Setup
            </h1>

            {/* Number of Players */}
            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">
                Number of Players
              </label>
              <div className="flex gap-2">
                {[2, 3, 4].map(num => (
                  <button
                    key={num}
                    onClick={() => handleNumPlayersChange(num)}
                    className={`px-6 py-2 rounded-lg font-semibold transition ${
                      numPlayers === num
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Player Configuration */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4">Players</h2>
              <div className="space-y-4">
                {players.map((player, index) => (
                  <div key={index} className="flex gap-4 items-center">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={player.name}
                        onChange={(e) => handlePlayerNameChange(index, e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        placeholder={`Player ${index + 1} name`}
                      />
                    </div>
                    <div className="w-48">
                      <select
                        value={player.pawnColor}
                        onChange={(e) => handlePlayerColorChange(index, e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      >
                        {PAWN_COLORS.map(color => (
                          <option key={color.value} value={color.value}>
                            {color.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div
                      className="w-12 h-12 rounded-full border-2 border-gray-300 dark:border-gray-600"
                      style={{ backgroundColor: player.pawnColor }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Difficulty */}
            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">
                Difficulty
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setDifficulty('easy')}
                  className={`px-6 py-2 rounded-lg font-semibold transition ${
                    difficulty === 'easy'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  Easy
                </button>
                <button
                  onClick={() => setDifficulty('medium')}
                  className={`px-6 py-2 rounded-lg font-semibold transition ${
                    difficulty === 'medium'
                      ? 'bg-yellow-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  Medium
                </button>
                <button
                  disabled
                  className="px-6 py-2 rounded-lg font-semibold bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed"
                >
                  Hard (Coming Soon)
                </button>
              </div>
            </div>

            {/* Settings */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4">Settings</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={theme === 'dark'}
                    onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
                    className="w-5 h-5 rounded"
                  />
                  <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={colorblindMode}
                    onChange={(e) => setColorblindMode(e.target.checked)}
                    className="w-5 h-5 rounded"
                  />
                  <span className="text-gray-700 dark:text-gray-300">Colorblind Mode (adds icons to colors)</span>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-between mt-8">
              <button
                onClick={() => navigate('/')}
                className="px-8 py-3 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-lg transition"
              >
                Back
              </button>
              <button
                onClick={handleStartGame}
                disabled={!isValid}
                className={`px-8 py-3 font-bold rounded-lg transition ${
                  isValid
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Start Game
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
