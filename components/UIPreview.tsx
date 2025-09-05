import React, { useState } from 'react';

interface UIPreviewProps {
  primaryPalette: string[];
  secondaryPalette: string[];
}

const shadeLabels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

const UIPreview: React.FC<UIPreviewProps> = ({ primaryPalette, secondaryPalette }) => {
  const [isPrimaryPressed, setIsPrimaryPressed] = useState(false);
  
  const cssVariables: React.CSSProperties = {};
  
  primaryPalette.forEach((color, index) => {
    cssVariables[`--p-${shadeLabels[index]}` as any] = color;
  });
  secondaryPalette.forEach((color, index) => {
    cssVariables[`--s-${shadeLabels[index]}` as any] = color;
  });

  const handlePrimaryClick = () => {
    setIsPrimaryPressed(true);
    setTimeout(() => {
      setIsPrimaryPressed(false);
    }, 200);
  };

  return (
    <div 
      className="bg-slate-100 dark:bg-slate-900/40 p-4 rounded-lg border border-slate-200/80 dark:border-slate-700/60 space-y-6"
      style={cssVariables}
    >
      {/* Card Component */}
      <div className="rounded-lg shadow-md overflow-hidden transition-transform transform hover:-translate-y-1" style={{ backgroundColor: `var(--p-50)`, color: `var(--p-800)`}}>
        <img src="https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=400&auto=format&fit=crop" alt="Lotion bottle" className="w-full h-32 object-cover"/>
        <div className="p-4">
          <h4 className="font-bold text-lg" style={{ color: `var(--p-900)`}}>Organic Body Lotion</h4>
          <p className="text-sm mt-1" style={{ color: `var(--p-600)`}}>A soothing and moisturizing lotion for all skin types.</p>
          <div className="mt-4 flex justify-between items-center">
            <span className="font-bold text-xl" style={{ color: `var(--p-900)`}}>$24.99</span>
            <span className="px-3 py-1 text-xs font-semibold rounded-full" style={{ backgroundColor: `var(--s-200)`, color: `var(--s-800)`}}>On Sale!</span>
          </div>
        </div>
      </div>
      
      {/* Buttons */}
      <div className="flex items-center gap-4">
        <button 
          className="flex-1 font-semibold py-2 px-4 rounded-lg shadow transition-all transform hover:scale-105 hover:brightness-110" 
          style={{ 
            backgroundColor: isPrimaryPressed ? `var(--p-400)` : `var(--p-500)`, 
            color: `var(--p-50)`
          }}
          onClick={handlePrimaryClick}
        >
          Primary Action
        </button>
        <button className="flex-1 font-semibold py-2 px-4 rounded-lg shadow transition-all transform hover:scale-105 hover:brightness-110" style={{ backgroundColor: `var(--s-500)`, color: `var(--s-50)`}}>
          Secondary Action
        </button>
      </div>

      {/* Form Input */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1" style={{ color: `var(--p-700)`}}>Subscribe to our newsletter</label>
        <div className="flex gap-2">
          <input 
            type="email" 
            id="email" 
            placeholder="you@example.com" 
            className="flex-grow px-3 py-2 rounded-md border-2 focus:outline-none focus:ring-2"
            style={{ 
              backgroundColor: `var(--p-100)`, 
              borderColor: `var(--p-300)`,
              color: `var(--p-900)`,
              '--tw-ring-color': `var(--p-500)`
            } as React.CSSProperties}
          />
          <button className="font-semibold py-2 px-4 rounded-lg shadow" style={{ backgroundColor: `var(--p-600)`, color: `var(--p-50)`}}>
            Submit
          </button>
        </div>
      </div>

       {/* Notification */}
       <div className="p-4 rounded-lg flex items-start gap-3" style={{ backgroundColor: `var(--s-100)`, color: `var(--s-800)`}}>
        <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: `var(--s-500)`, color: `var(--s-50)`}}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
        </div>
        <div>
          <h5 className="font-bold" style={{ color: `var(--s-900)`}}>Quick Tip</h5>
          <p className="text-sm">Use complementary colors for high-contrast call-to-actions.</p>
        </div>
      </div>
    </div>
  );
};

export default UIPreview;