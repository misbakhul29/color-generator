import React, { useState, useCallback } from 'react';
import { getLuminance } from '../services/colorService';
import { X, Copy, Check, Download, Tailwind } from './Icons';
import { ExportFormat } from '../types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  primaryPalette: string[];
  secondaryPalette: string[];
  theme: 'light' | 'dark';
}

const shadeLabels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

const CodeSnippet: React.FC<{ code: string }> = ({ code }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative">
            <pre className="bg-slate-100 dark:bg-slate-900/70 p-4 rounded-lg text-sm overflow-x-auto">
                <code className="font-mono text-slate-800 dark:text-slate-300">{code}</code>
            </pre>
            <button
                onClick={handleCopy}
                className="absolute top-2 right-2 p-2 bg-slate-200 dark:bg-slate-700 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                title="Copy to clipboard"
            >
                {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
            </button>
        </div>
    );
};

const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, primaryPalette, secondaryPalette, theme }) => {
  const [activeTab, setActiveTab] = useState<ExportFormat>('Image');

  const generateCssVariables = useCallback(() => {
    let css = ':root {\n';
    primaryPalette.forEach((color, i) => {
      css += `  --primary-${shadeLabels[i]}: ${color};\n`;
    });
    css += '\n';
    secondaryPalette.forEach((color, i) => {
      css += `  --secondary-${shadeLabels[i]}: ${color};\n`;
    });
    css += '}';
    return css;
  }, [primaryPalette, secondaryPalette]);
  
  const generateJson = useCallback(() => {
    const json = {
      primary: Object.fromEntries(primaryPalette.map((color, i) => [shadeLabels[i], color])),
      secondary: Object.fromEntries(secondaryPalette.map((color, i) => [shadeLabels[i], color])),
    };
    return JSON.stringify(json, null, 2);
  }, [primaryPalette, secondaryPalette]);

  const generateTailwindConfig = useCallback(() => {
    const primary = primaryPalette.map((color, i) => `        ${shadeLabels[i]}: '${color}',`).join('\n');
    const secondary = secondaryPalette.map((color, i) => `        ${shadeLabels[i]}: '${color}',`).join('\n');

    return `// In your tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {\n${primary}\n        },
        secondary: {\n${secondary}\n        },
      },
    },
  },
};`;
  }, [primaryPalette, secondaryPalette]);

  const handleDownloadImage = useCallback(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const PADDING = 40;
    const COLUMN_WIDTH = 280;
    const COLUMN_GAP = 60;
    const HEADER_HEIGHT = 60;
    const ROW_HEIGHT = 50;
    const SHADE_BOX_WIDTH = 60;

    canvas.width = PADDING * 2 + COLUMN_WIDTH * 2 + COLUMN_GAP;
    canvas.height = PADDING * 2 + HEADER_HEIGHT + ROW_HEIGHT * 10;
    
    const isDark = theme === 'dark';
    ctx.fillStyle = isDark ? '#1e293b' : '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const drawPaletteColumn = (palette: string[], title: string, offsetX: number) => {
        ctx.font = 'bold 24px Inter, sans-serif';
        ctx.fillStyle = isDark ? '#f1f5f9' : '#1e293b';
        ctx.fillText(title, offsetX, PADDING + 30);
        
        palette.forEach((color, index) => {
            const y = PADDING + HEADER_HEIGHT + (index * ROW_HEIGHT);
            
            ctx.fillStyle = color;
            ctx.fillRect(offsetX, y, SHADE_BOX_WIDTH, ROW_HEIGHT);

            const isLight = getLuminance(color) > 0.5;
            ctx.fillStyle = isLight ? '#000000' : '#ffffff';
            ctx.font = 'bold 16px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(String(shadeLabels[index]), offsetX + SHADE_BOX_WIDTH / 2, y + ROW_HEIGHT / 2);

            ctx.fillStyle = isDark ? '#cbd5e1' : '#475569';
            ctx.font = '16px "Source Code Pro", monospace';
            ctx.textAlign = 'left';
            ctx.fillText(color, offsetX + SHADE_BOX_WIDTH + 20, y + ROW_HEIGHT / 2);
        });
    };

    drawPaletteColumn(primaryPalette, 'Primary', PADDING);
    drawPaletteColumn(secondaryPalette, 'Secondary', PADDING + COLUMN_WIDTH + COLUMN_GAP);

    const link = document.createElement('a');
    link.download = 'color-palette.png';
    link.href = canvas.toDataURL('image/png');
    link.click();

  }, [primaryPalette, secondaryPalette, theme]);

  if (!isOpen) return null;

  const renderContent = () => {
    switch(activeTab) {
        case 'Image':
            return (
                <div className="text-center">
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                        Download a high-quality PNG image of your color palette. Perfect for presentations or style guides.
                    </p>
                    <button
                        onClick={handleDownloadImage}
                        className="inline-flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 transform hover:scale-105 shadow-md"
                    >
                        <Download className="w-5 h-5" />
                        Download PNG
                    </button>
                </div>
            );
        case 'CSS':
            return <CodeSnippet code={generateCssVariables()} />;
        case 'JSON':
            return <CodeSnippet code={generateJson()} />;
        case 'Tailwind':
            return <CodeSnippet code={generateTailwindConfig()} />;
    }
  };
  
  return (
    <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in-fast" 
        role="dialog" 
        aria-modal="true"
        onClick={onClose}
    >
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-2xl m-4 border border-slate-200/50 dark:border-slate-700/50 transform transition-all animate-slide-up-fast"
           onClick={(e) => e.stopPropagation()}>
        <header className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Export Palette</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <X className="w-6 h-6 text-slate-500 dark:text-slate-400" />
          </button>
        </header>
        
        <div className="p-6">
          <div className="mb-6 border-b border-slate-200 dark:border-slate-700">
            <nav className="-mb-px flex space-x-6" aria-label="Tabs">
              {(['Image', 'CSS', 'JSON', 'Tailwind'] as ExportFormat[]).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap pb-3 px-1 border-b-2 font-semibold text-sm transition-colors flex items-center gap-2 ${
                    activeTab === tab
                      ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  {tab === 'Tailwind' && <Tailwind className="w-5 h-5" />}
                  {tab}
                </button>
              ))}
            </nav>
          </div>
          
          <div>{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;