import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { ColorHarmony, ColorResearchResponse, ColorSimulationType, GeneratorTool } from './types';
import { generateSecondaryColor, getRandomHexColor, getContrastRatio, getWcagReport, WcagLevel, generateColorShades, simulateColor } from './services/colorService';
import { researchColor } from './services/geminiService';
import ColorSwatch from './components/ColorSwatch';
import ColorPalette from './components/ColorPalette';
import Loader from './components/Loader';
import ExportModal from './components/ExportModal';
import UIPreview from './components/UIPreview';
import { WandSparkles, BrainCircuit, Shuffle, Copy, Check, Info, Sun, Moon, HeartHandshake, Building, Bookmark, Download } from './components/Icons';

const harmonyOptions: { value: ColorHarmony; label: string }[] = [
  { value: ColorHarmony.COMPLEMENTARY, label: 'Complementary' },
  { value: ColorHarmony.ANALOGOUS, label: 'Analogous' },
  { value: ColorHarmony.TRIADIC, label: 'Triadic' },
  { value: ColorHarmony.SPLIT_COMPLEMENTARY, label: 'Split-Comp' },
];

const simulationOptions: { value: ColorSimulationType; label: string }[] = [
    { value: ColorSimulationType.NONE, label: 'None' },
    { value: ColorSimulationType.PROTANOPIA, label: 'Protanopia' },
    { value: ColorSimulationType.DEUTERANOPIA, label: 'Deuteranopia' },
    { value: ColorSimulationType.TRITANOPIA, label: 'Tritanopia' },
    { value: ColorSimulationType.ACHROMATOPSIA, label: 'Achromatopsia' },
];

const WcagBadge: React.FC<{ level: WcagLevel }> = ({ level }) => {
  const styles = {
    Fail: 'bg-red-200 text-red-800 dark:bg-red-900/50 dark:text-red-300',
    AA: 'bg-green-200 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    AAA: 'bg-emerald-200 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300',
  };
  return (
    <span className={`px-3 py-1 font-bold rounded-full text-xs ${styles[level]}`}>
      {level}
    </span>
  );
};

const App: React.FC = () => {
  const [primaryColor, setPrimaryColor] = useState<string>('#4f46e5');
  const [secondaryColor, setSecondaryColor] = useState<string>('#e5a146');
  const [harmony, setHarmony] = useState<ColorHarmony>(ColorHarmony.COMPLEMENTARY);
  const [researchData, setResearchData] = useState<ColorResearchResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedAccent, setCopiedAccent] = useState<string | null>(null);
  const [isPrimaryForeground, setIsPrimaryForeground] = useState(true);
  const [simulationType, setSimulationType] = useState<ColorSimulationType>(ColorSimulationType.NONE);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [activeTool, setActiveTool] = useState<GeneratorTool>('ui-preview');
  
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleGeneratePalette = useCallback(() => {
    const newSecondary = generateSecondaryColor(primaryColor, harmony);
    setSecondaryColor(newSecondary);
  }, [primaryColor, harmony]);
  
  useEffect(() => {
    handleGeneratePalette();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [primaryColor, harmony]);

  const handleRandomizePrimary = () => {
    const randomColor = getRandomHexColor();
    setPrimaryColor(randomColor);
  };

  const handleResearch = async () => {
    setIsLoading(true);
    setError(null);
    setResearchData(null);
    try {
      const data = await researchColor(primaryColor);
      setResearchData(data);
    } catch (err) {
      setError('Failed to fetch color research. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const foregroundColor = isPrimaryForeground ? primaryColor : secondaryColor;
  const backgroundColor = isPrimaryForeground ? secondaryColor : primaryColor;
  const contrastRatio = getContrastRatio(foregroundColor, backgroundColor);
  const contrastReport = getWcagReport(contrastRatio);

  const primaryPalette = useMemo(() => generateColorShades(primaryColor), [primaryColor]);
  const secondaryPalette = useMemo(() => generateColorShades(secondaryColor), [secondaryColor]);

  const simulatedPrimaryColor = useMemo(() => simulateColor(primaryColor, simulationType), [primaryColor, simulationType]);
  const simulatedSecondaryColor = useMemo(() => simulateColor(secondaryColor, simulationType), [secondaryColor, simulationType]);
  const simulatedPrimaryPalette = useMemo(() => primaryPalette.map(c => simulateColor(c, simulationType)), [primaryPalette, simulationType]);
  const simulatedSecondaryPalette = useMemo(() => secondaryPalette.map(c => simulateColor(c, simulationType)), [secondaryPalette, simulationType]);

  return (
    <>
    <div className="min-h-screen text-slate-800 dark:text-slate-200 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-screen-2xl mx-auto">
        <header className="relative text-center mb-10 lg:mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
            AI Color Palette Generator
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Create beautiful, accessible color palettes with color theory, then research your choices with AI.
          </p>
          <div className="absolute top-0 right-0">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 text-slate-600 dark:text-slate-300 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 transition-colors"
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
            </button>
          </div>
        </header>

        <main className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          {/* Generator Section */}
          <section id="generator-section" aria-labelledby="generator-heading" className="xl:col-span-7 bg-white/60 dark:bg-slate-800/60 backdrop-blur-2xl p-6 rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
            <h2 id="generator-heading" className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Generator</h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="primaryColor" className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                  Primary Color
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="color"
                    id="primaryColor"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-14 h-14 p-0 border-none rounded-lg cursor-pointer bg-transparent focus:ring-4 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
                  />
                   <div className="relative flex-grow">
                     <input
                      type="text"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-full bg-slate-100/80 dark:bg-slate-900/40 border border-slate-300/80 dark:border-slate-700/60 rounded-lg px-4 py-3 text-lg font-mono tracking-wider text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                   </div>
                  <button
                    onClick={handleRandomizePrimary}
                    className="p-3 bg-slate-200/80 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-600 rounded-lg transition-colors duration-200"
                    title="Randomize Primary Color"
                  >
                    <Shuffle className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div>
                 <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Harmony Rule</label>
                 <div className="flex items-center bg-slate-100/80 dark:bg-slate-900/40 rounded-lg p-1 space-x-1">
                    {harmonyOptions.map(option => (
                        <button key={option.value} onClick={() => setHarmony(option.value)}
                        className={`w-full px-3 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${harmony === option.value ? 'bg-white dark:bg-indigo-600 text-indigo-700 dark:text-white shadow-md' : 'text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700/80'}`}>
                            {option.label}
                        </button>
                    ))}
                 </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ColorSwatch title="Primary" color={primaryColor} displayColor={simulatedPrimaryColor}/>
              <ColorSwatch title="Secondary" color={secondaryColor} displayColor={simulatedSecondaryColor}/>
            </div>
            
            <div className="mt-8 space-y-8">
              {primaryPalette.length > 0 && <ColorPalette title="Primary Shades" colors={primaryPalette} displayColors={simulationType !== 'None' ? simulatedPrimaryPalette : undefined} />}
              {secondaryPalette.length > 0 && <ColorPalette title="Secondary Shades" colors={secondaryPalette} displayColors={simulationType !== 'None' ? simulatedSecondaryPalette : undefined}/>}
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-700/60">
                <button
                    onClick={() => setIsExportModalOpen(true)}
                    className="w-full flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 transform hover:scale-102 shadow-lg shadow-indigo-500/30 dark:shadow-indigo-900/50"
                >
                    <Download className="w-5 h-5" />
                    Export Palette
                </button>
            </div>

             <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-700/60">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Tools</h3>
                <div className="flex items-center border-b border-slate-200/80 dark:border-slate-700/60 mb-4">
                  <button onClick={() => setActiveTool('ui-preview')} className={`px-4 py-2 text-sm font-semibold transition-colors ${activeTool === 'ui-preview' ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>UI Preview</button>
                  <button onClick={() => setActiveTool('simulation')} className={`px-4 py-2 text-sm font-semibold transition-colors ${activeTool === 'simulation' ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>Simulation</button>
                  <button onClick={() => setActiveTool('accessibility')} className={`px-4 py-2 text-sm font-semibold transition-colors ${activeTool === 'accessibility' ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>Accessibility</button>
                </div>

                {activeTool === 'ui-preview' && (
                  <div className="animate-fade-in">
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">See a live preview of your palette applied to common UI components.</p>
                    <UIPreview primaryPalette={primaryPalette} secondaryPalette={secondaryPalette} />
                  </div>
                )}
                
                {activeTool === 'simulation' && (
                  <div className="animate-fade-in">
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">Simulate how your palette appears to users with different types of color vision deficiency.</p>
                     <div className="flex flex-wrap items-center bg-slate-100/80 dark:bg-slate-900/40 rounded-lg p-1 gap-1">
                        {simulationOptions.map(option => (
                            <button key={option.value} onClick={() => setSimulationType(option.value)}
                            className={`flex-1 px-3 py-2 rounded-md text-xs font-semibold transition-all duration-200 ${simulationType === option.value ? 'bg-white dark:bg-indigo-600 text-indigo-700 dark:text-white shadow-md' : 'text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700/80'}`}>
                                {option.label}
                            </button>
                        ))}
                    </div>
                  </div>
                )}
                
                {activeTool === 'accessibility' && (
                  <div className="animate-fade-in">
                    <div className="flex justify-between items-center mb-3">
                        <p className="text-sm text-slate-500 dark:text-slate-400">Check WCAG contrast ratios between your primary and secondary colors.</p>
                        <div className="relative group">
                            <Info className="w-5 h-5 text-slate-400 dark:text-slate-500 cursor-help" />
                            <div className="absolute bottom-full right-0 mb-2 w-64 bg-slate-900 text-slate-300 text-sm rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 shadow-lg border border-slate-700">
                                <strong className="text-white">WCAG Guidelines</strong> ensure content is accessible.
                                <br/><strong className="text-green-400">AA:</strong> Minimum contrast (good).
                                <br/><strong className="text-emerald-400">AAA:</strong> Enhanced contrast (excellent).
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-100/80 dark:bg-slate-900/40 p-4 rounded-lg border border-slate-200/80 dark:border-slate-700/60">
                        <div className="flex items-center justify-center space-x-4">
                              <div className="flex-1 text-center">
                                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Text</p>
                                  <div className="w-12 h-12 mx-auto rounded-full border-2 border-slate-300 dark:border-slate-600" style={{ backgroundColor: foregroundColor }}></div>
                              </div>
                              <div className="flex-1 text-center">
                                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Background</p>
                                  <div className="w-12 h-12 mx-auto rounded-full border-2 border-slate-300 dark:border-slate-600" style={{ backgroundColor: backgroundColor }}></div>
                              </div>
                              <button
                                  onClick={() => setIsPrimaryForeground(!isPrimaryForeground)}
                                  className="p-2 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-indigo-500 dark:hover:bg-indigo-600 hover:text-white rounded-full transition-colors duration-200 self-center"
                                  title="Swap Foreground/Background"
                              >
                                  <Shuffle className="w-5 h-5" />
                              </button>
                        </div>
                        <div className="mt-4 text-center">
                            <p className="font-mono text-2xl tracking-wider text-slate-900 dark:text-white">{contrastReport.ratio.toFixed(2)}</p>
                            <p className="text-sm text-slate-500">Contrast Ratio</p>
                        </div>
                        <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                            <div className="text-center bg-slate-200/70 dark:bg-slate-800/70 p-2 rounded-md">
                                <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">Normal Text</p>
                                <WcagBadge level={contrastReport.normal} />
                            </div>
                            <div className="text-center bg-slate-200/70 dark:bg-slate-800/70 p-2 rounded-md">
                                <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">Large Text</p>
                                <WcagBadge level={contrastReport.large} />
                            </div>
                        </div>
                    </div>
                  </div>
                )}
            </div>
          </section>
          
          {/* Research Section */}
          <section id="ai-research-section" aria-labelledby="ai-research-heading" className="xl:col-span-5 bg-white/60 dark:bg-slate-800/60 backdrop-blur-2xl p-6 rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-2xl flex flex-col min-h-[600px]">
            <h2 id="ai-research-heading" className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">AI Research</h2>
             <button
              onClick={handleResearch}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 shadow-lg shadow-indigo-500/30"
            >
              <BrainCircuit className="w-6 h-6" />
              {isLoading ? 'Researching...' : `Analyze ${primaryColor}`}
            </button>
            <div className="mt-6 flex-grow overflow-y-auto pr-2 -mr-2">
                {isLoading && <div className="flex justify-center items-center h-full"><Loader /></div>}
                {error && <div className="flex justify-center items-center h-full text-red-500 dark:text-red-400 bg-red-900/20 p-4 rounded-lg">{error}</div>}
                {!isLoading && !error && !researchData && (
                    <div className="flex flex-col justify-center items-center h-full text-center text-slate-500 dark:text-slate-500 p-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50/50 dark:bg-slate-900/20">
                        <WandSparkles className="w-12 h-12 mb-4"/>
                        <p className="text-lg font-semibold">Your AI color insights will appear here.</p>
                        <p className="text-sm">Click the "Analyze" button to begin your research.</p>
                    </div>
                )}
                {researchData && (
                    <div className="space-y-4 animate-fade-in">
                        <ResearchItem icon={<HeartHandshake className="w-6 h-6"/>} title="Psychology" content={researchData.psychology} />
                        <ResearchItem icon={<Building className="w-6 h-6"/>} title="Industries" content={researchData.industries.join(', ')} />
                        <ResearchItem icon={<Bookmark className="w-6 h-6"/>} title="Brand Examples" content={researchData.brandExamples.join(', ')} />
                        
                        <div className="bg-slate-100/80 dark:bg-slate-900/40 p-4 rounded-lg border border-slate-200/80 dark:border-slate-700/60">
                            <h3 className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-2">Accent Color Suggestions</h3>
                            <p className="text-slate-700 dark:text-slate-300 text-sm mb-4">{researchData.accentUsageNotes}</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {researchData.accentColorSuggestions.map((accent) => (
                                    <div key={accent.hex} className="flex items-center gap-3 p-2 bg-white/80 dark:bg-slate-800/50 rounded-md">
                                        <div className="w-6 h-6 rounded-full border-2 border-slate-300 dark:border-slate-600 flex-shrink-0" style={{ backgroundColor: accent.hex }}></div>
                                        <div className="flex-grow min-w-0">
                                            <p className="text-slate-900 dark:text-white font-semibold text-sm truncate">{accent.name}</p>
                                            <p className="font-mono text-slate-500 dark:text-slate-400 text-xs">{accent.hex}</p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(accent.hex);
                                                setCopiedAccent(accent.hex);
                                                setTimeout(() => setCopiedAccent(null), 2000);
                                            }}
                                            className="text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
                                            title={`Copy ${accent.hex}`}
                                        >
                                            {copiedAccent === accent.hex ? <Check className="w-4 h-4 text-green-500 dark:text-green-400" /> : <Copy className="w-4 h-4" />}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
          </section>
        </main>
      </div>
    </div>
    <ExportModal 
        isOpen={isExportModalOpen} 
        onClose={() => setIsExportModalOpen(false)}
        primaryPalette={primaryPalette}
        secondaryPalette={secondaryPalette}
        theme={theme}
    />
    </>
  );
};

interface ResearchItemProps {
    icon: React.ReactNode;
    title: string;
    content: string;
}

const ResearchItem: React.FC<ResearchItemProps> = ({ icon, title, content }) => (
    <div className="bg-slate-100/80 dark:bg-slate-900/40 p-4 rounded-lg border border-slate-200/80 dark:border-slate-700/60">
        <div className="flex items-center gap-3 text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
            {icon}
            <h3 className="text-base">{title}</h3>
        </div>
        <p className="text-slate-700 dark:text-slate-300 text-sm">{content}</p>
    </div>
);


export default App;