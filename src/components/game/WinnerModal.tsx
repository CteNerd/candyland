interface WinnerModalProps {
  winnerName: string;
  onPlayAgain: () => void;
  onGoHome: () => void;
}

export default function WinnerModal({ winnerName, onPlayAgain, onGoHome }: WinnerModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-8 max-w-md w-full transform animate-bounce-in">
        <div className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
            {winnerName} Wins!
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Congratulations on reaching the finish!
          </p>
          
          <div className="space-y-3">
            <button
              onClick={onPlayAgain}
              className="w-full px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg rounded-lg shadow-lg transform transition hover:scale-105"
            >
              Play Again
            </button>
            <button
              onClick={onGoHome}
              className="w-full px-8 py-4 bg-gray-500 hover:bg-gray-600 text-white font-bold text-lg rounded-lg shadow-lg transform transition hover:scale-105"
            >
              Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
