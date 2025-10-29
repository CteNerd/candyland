interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark';
  colorblindMode: boolean;
  onThemeChange: (theme: 'light' | 'dark') => void;
  onColorblindModeChange: (enabled: boolean) => void;
  onExitToHome: () => void;
}

export default function SettingsDrawer({
  isOpen,
  onClose,
  theme,
  colorblindMode,
  onThemeChange,
  onColorblindModeChange,
  onExitToHome
}: SettingsDrawerProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-80 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-purple-900 dark:to-pink-900 shadow-2xl z-50 p-6 overflow-y-auto border-l-4 border-white/50">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-200" style={{ fontFamily: 'Comic Sans MS, cursive, sans-serif' }}>
            Settings
          </h2>
          <button
            onClick={onClose}
            className="text-purple-600 dark:text-purple-300 hover:text-purple-800 dark:hover:text-purple-100 text-3xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          {/* Theme Toggle */}
          <div>
            <label className="block text-lg font-semibold mb-3 text-purple-700 dark:text-purple-200" style={{ fontFamily: 'Comic Sans MS, cursive, sans-serif' }}>
              Theme
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => onThemeChange('light')}
                className={`flex-1 px-4 py-3 rounded-full font-semibold transition shadow-lg ${
                  theme === 'light'
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white scale-105'
                    : 'bg-white/50 dark:bg-purple-800/50 text-purple-700 dark:text-purple-200'
                }`}
                style={{ fontFamily: 'Comic Sans MS, cursive, sans-serif' }}
              >
                ☀️ Light
              </button>
              <button
                onClick={() => onThemeChange('dark')}
                className={`flex-1 px-4 py-3 rounded-full font-semibold transition shadow-lg ${
                  theme === 'dark'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white scale-105'
                    : 'bg-white/50 dark:bg-purple-800/50 text-purple-700 dark:text-purple-200'
                }`}
                style={{ fontFamily: 'Comic Sans MS, cursive, sans-serif' }}
              >
                🌙 Dark
              </button>
            </div>
          </div>

          {/* Colorblind Mode */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer p-4 rounded-2xl bg-white/50 dark:bg-purple-800/50 hover:bg-white/70 dark:hover:bg-purple-800/70 transition">
              <input
                type="checkbox"
                checked={colorblindMode}
                onChange={(e) => onColorblindModeChange(e.target.checked)}
                className="w-6 h-6 rounded accent-purple-600"
              />
              <div>
                <div className="text-lg font-semibold text-purple-700 dark:text-purple-200" style={{ fontFamily: 'Comic Sans MS, cursive, sans-serif' }}>
                  Colorblind Mode
                </div>
                <div className="text-sm text-purple-600 dark:text-purple-300">
                  Adds icons and labels to colors
                </div>
              </div>
            </label>
          </div>

          {/* Divider */}
          <hr className="border-purple-300 dark:border-purple-600" />

          {/* Exit to Home */}
          <button
            onClick={onExitToHome}
            className="w-full px-4 py-3 bg-gradient-to-r from-red-400 to-pink-400 hover:from-red-500 hover:to-pink-500 text-white font-bold rounded-full transition shadow-lg transform hover:scale-105"
            style={{ fontFamily: 'Comic Sans MS, cursive, sans-serif' }}
          >
            🏠 Exit to Home
          </button>
        </div>
      </div>
    </>
  );
}
