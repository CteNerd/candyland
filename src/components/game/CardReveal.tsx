import type { Card } from '@engine/types';
import { COLOR_METADATA } from '@engine/types';

interface CardRevealProps {
  card?: Card;
  colorblindMode: boolean;
}

export default function CardReveal({ card, colorblindMode }: CardRevealProps) {
  if (!card) {
    return (
      <div className="w-48 h-64 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg shadow-lg flex items-center justify-center border-4 border-white">
        <div className="text-white text-6xl">🎴</div>
      </div>
    );
  }

  const renderCardContent = () => {
    if (card.kind === 'single' && card.color) {
      const colorMeta = COLOR_METADATA[card.color];
      return (
        <div className="space-y-4">
          <div className="text-white text-lg font-semibold">Single</div>
          <div className={`w-24 h-24 ${colorMeta.baseColorClass} rounded-lg border-4 border-white shadow-lg flex items-center justify-center text-4xl`}>
            {colorblindMode && colorMeta.icon}
          </div>
          {colorblindMode && (
            <div className="text-white text-2xl font-bold">{colorMeta.label} - {card.color}</div>
          )}
        </div>
      );
    }

    if (card.kind === 'double' && card.color) {
      const colorMeta = COLOR_METADATA[card.color];
      return (
        <div className="space-y-4">
          <div className="text-white text-lg font-semibold">Double</div>
          <div className="flex gap-2">
            <div className={`w-16 h-20 ${colorMeta.baseColorClass} rounded-lg border-4 border-white shadow-lg flex items-center justify-center text-2xl`}>
              {colorblindMode && colorMeta.icon}
            </div>
            <div className={`w-16 h-20 ${colorMeta.baseColorClass} rounded-lg border-4 border-white shadow-lg flex items-center justify-center text-2xl`}>
              {colorblindMode && colorMeta.icon}
            </div>
          </div>
          {colorblindMode && (
            <div className="text-white text-2xl font-bold">{colorMeta.label} - {card.color}</div>
          )}
        </div>
      );
    }

    if (card.kind === 'special' && card.targetLabel) {
      return (
        <div className="space-y-4">
          <div className="text-white text-lg font-semibold">Special</div>
          <div className="text-white text-4xl">✨</div>
          <div className="text-white text-xl font-bold">{card.targetLabel}</div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="w-48 h-64 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg shadow-2xl flex flex-col items-center justify-center border-4 border-white transform transition-transform hover:scale-105">
      {renderCardContent()}
    </div>
  );
}
