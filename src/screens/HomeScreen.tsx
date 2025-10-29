import { Link } from 'react-router-dom';
import { useGame } from '../context/GameContext';

export default function HomeScreen() {
  const { state } = useGame();
  
  return (
    <div className={state.settings.theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 dark:from-gray-900 dark:to-purple-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center">
          <h1 className="text-6xl font-bold text-purple-600 dark:text-purple-400 mb-4">
            🍭 Candyland Game
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
            A colorful adventure for 2-4 players!
          </p>
          
          <div className="space-y-4">
            <Link to="/setup">
              <button className="w-full max-w-md px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xl rounded-lg shadow-lg transform transition hover:scale-105">
                Start Local Game
              </button>
            </Link>
            
            <button 
              disabled 
              className="w-full max-w-md px-8 py-4 bg-gray-400 text-white font-bold text-xl rounded-lg shadow-lg cursor-not-allowed opacity-50"
            >
              Online Game (Coming Soon)
            </button>
          </div>
          
          <div className="mt-12 text-sm text-gray-600 dark:text-gray-400">
            <p>A browser-based implementation inspired by the classic Candyland game.</p>
            <p className="mt-2">
              <a 
                href="https://github.com/CteNerd/candyland" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-600 dark:text-purple-400 hover:underline"
              >
                View on GitHub
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
