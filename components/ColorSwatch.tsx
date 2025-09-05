import React, { useState } from 'react';
import { Copy, Check } from './Icons';

interface ColorSwatchProps {
  title: string;
  color: string;
  displayColor?: string;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ title, color, displayColor }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl overflow-hidden shadow-lg border border-slate-200/50 dark:border-slate-700/50">
      <div className="h-40 w-full" style={{ backgroundColor: displayColor || color }}></div>
      <div className="p-4 bg-white/80 dark:bg-slate-800/80">
        <h3 className="font-semibold text-slate-600 dark:text-slate-300">{title}</h3>
        <div className="flex justify-between items-center mt-1">
          <p className="font-mono text-lg text-slate-900 dark:text-white">{color}</p>
          <button onClick={handleCopy} className="text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors">
            {copied ? <Check className="w-5 h-5 text-green-500 dark:text-green-400" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorSwatch;