import type { Card } from '@engine/types';
import { COLOR_METADATA } from '@engine/types';

interface CardRevealProps {
  card?: Card;
  colorblindMode: boolean;
}

export default function CardReveal({ card, colorblindMode }: CardRevealProps) {
  if (!card) {
    return (
      <div className="w-48 h-64 bg-gradient-to-br from-purple-400 to-pink-400 dark:from-purple-600 dark:to-pink-600 rounded-3xl shadow-2xl flex items-center justify-center border-4 border-white/50">
        <div className="text-white text-6xl">🎴</div>
      </div>
    );
  }

  const renderCardContent = () => {
    if (card.kind === 'single' && card.color) {
      const colorMeta = COLOR_METADATA[card.color];
      return (
        <div className="space-y-4">
          <div className="text-white text-lg font-semibold" style={{ fontFamily: 'Comic Sans MS, cursive, sans-serif' }}>Single</div>
          <div 
            className={`w-24 h-24 ${colorMeta.baseColorClass} rounded-3xl border-4 border-white shadow-2xl flex items-center justify-center text-5xl`}
            style={{
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2), inset 0 -2px 4px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.3)'
            }}
          >
            {colorMeta.icon}
          </div>
          {colorblindMode && (
            <div className="text-white text-xl font-bold drop-shadow-lg">{colorMeta.label} - {card.color}</div>
          )}
        </div>
      );
    }

    if (card.kind === 'double' && card.color) {
      const colorMeta = COLOR_METADATA[card.color];
      return (
        <div className="space-y-4">
          <div className="text-white text-lg font-semibold" style={{ fontFamily: 'Comic Sans MS, cursive, sans-serif' }}>Double</div>
          <div className="flex gap-3">
            <div 
              className={`w-16 h-20 ${colorMeta.baseColorClass} rounded-3xl border-4 border-white shadow-2xl flex items-center justify-center text-3xl`}
              style={{
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2), inset 0 -2px 4px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.3)'
              }}
            >
              {colorMeta.icon}
            </div>
            <div 
              className={`w-16 h-20 ${colorMeta.baseColorClass} rounded-3xl border-4 border-white shadow-2xl flex items-center justify-center text-3xl`}
              style={{
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2), inset 0 -2px 4px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.3)'
              }}
            >
              {colorMeta.icon}
            </div>
          </div>
          {colorblindMode && (
            <div className="text-white text-xl font-bold drop-shadow-lg">{colorMeta.label} - {card.color}</div>
          )}
        </div>
      );
    }

    if (card.kind === 'special' && card.targetLabel) {
      return (
        <div className="space-y-4">
          <div className="text-white text-lg font-semibold" style={{ fontFamily: 'Comic Sans MS, cursive, sans-serif' }}>Special</div>
          <div className="text-white text-5xl">✨</div>
          <div className="text-white text-xl font-bold drop-shadow-lg">{card.targetLabel}</div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="w-48 h-64 bg-gradient-to-br from-purple-600 to-pink-600 dark:from-purple-700 dark:to-pink-700 rounded-3xl shadow-2xl flex flex-col items-center justify-center border-4 border-white/50 transform transition-transform hover:scale-105">
      {renderCardContent()}
    </div>
  );
}
