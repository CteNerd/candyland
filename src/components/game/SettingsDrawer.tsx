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
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-2xl z-50 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Settings
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          {/* Theme Toggle */}
          <div>
            <label className="block text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
              Theme
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => onThemeChange('light')}
                className={`flex-1 px-4 py-2 rounded-lg font-semibold transition ${
                  theme === 'light'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                ☀️ Light
              </button>
              <button
                onClick={() => onThemeChange('dark')}
                className={`flex-1 px-4 py-2 rounded-lg font-semibold transition ${
                  theme === 'dark'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                🌙 Dark
              </button>
            </div>
          </div>

          {/* Colorblind Mode */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={colorblindMode}
                onChange={(e) => onColorblindModeChange(e.target.checked)}
                className="w-5 h-5 rounded"
              />
              <div>
                <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Colorblind Mode
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Adds icons and labels to colors
                </div>
              </div>
            </label>
          </div>

          {/* Divider */}
          <hr className="border-gray-300 dark:border-gray-600" />

          {/* Exit to Home */}
          <button
            onClick={onExitToHome}
            className="w-full px-4 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition"
          >
            Exit to Home
          </button>
        </div>
      </div>
    </>
  );
}
