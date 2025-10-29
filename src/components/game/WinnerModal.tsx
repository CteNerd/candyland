interface WinnerModalProps {
  winnerName: string;
  onPlayAgain: () => void;
  onGoHome: () => void;
}

export default function WinnerModal({ winnerName, onPlayAgain, onGoHome }: WinnerModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 dark:from-purple-900 dark:via-pink-900 dark:to-yellow-900 rounded-3xl shadow-2xl p-8 max-w-md w-full transform animate-bounce-in border-4 border-white/50">
        <div className="text-center">
          <div className="text-8xl mb-4 animate-bounce">🎉</div>
          <h2 className="text-5xl font-bold text-purple-700 dark:text-yellow-300 mb-2" style={{ fontFamily: 'Comic Sans MS, cursive, sans-serif' }}>
            {winnerName} Wins!
          </h2>
          <p className="text-2xl text-purple-600 dark:text-purple-200 mb-8" style={{ fontFamily: 'Comic Sans MS, cursive, sans-serif' }}>
            🏰 You reached the Candy Castle! 🏰
          </p>
          
          <div className="space-y-4">
            <button
              onClick={onPlayAgain}
              className="w-full px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white font-bold text-xl rounded-full shadow-2xl transform transition hover:scale-105"
              style={{ fontFamily: 'Comic Sans MS, cursive, sans-serif' }}
            >
              🎮 Play Again
            </button>
            <button
              onClick={onGoHome}
              className="w-full px-8 py-4 bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xl rounded-full shadow-2xl transform transition hover:scale-105"
              style={{ fontFamily: 'Comic Sans MS, cursive, sans-serif' }}
            >
              🏠 Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
