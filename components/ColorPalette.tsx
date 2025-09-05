import React, { useState } from 'react';
import { Copy, Check } from './Icons';
import { getLuminance } from '../services/colorService';

interface ColorPaletteProps {
  title: string;
  colors: string[];
  displayColors?: string[];
}

const shadeLabels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

const ColorPalette: React.FC<ColorPaletteProps> = ({ title, colors, displayColors }) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{title}</h3>
      <div className="rounded-xl overflow-hidden border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
        {colors.map((color, index) => {
          const displayColor = displayColors ? displayColors[index] : color;
          const isLight = getLuminance(displayColor) > 0.5;
          const textColor = isLight ? 'text-slate-900' : 'text-white';
          const buttonColor = isLight ? 'text-slate-500 hover:text-slate-900' : 'text-slate-400 hover:text-white';

          const shade = shadeLabels[index];

          return (
            <div
              key={`${color}-${index}`}
              className="flex items-center justify-between p-3"
              style={{ backgroundColor: displayColor }}
            >
              <div className={`flex items-baseline gap-4 ${textColor}`}>
                <span className="font-bold w-8">{shade}</span>
                <span className="font-mono text-sm">{color}</span>
              </div>
              <button 
                onClick={() => handleCopy(color)}
                className={`${buttonColor} transition-colors`}
                title={`Copy ${color}`}
              >
                {copiedHex === color ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ColorPalette;