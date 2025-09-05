export enum ColorHarmony {
  COMPLEMENTARY = 'COMPLEMENTARY',
  ANALOGOUS = 'ANALOGOUS',
  TRIADIC = 'TRIADIC',
  SPLIT_COMPLEMENTARY = 'SPLIT_COMPLEMENTARY'
}

export enum ColorSimulationType {
    NONE = 'None',
    PROTANOPIA = 'Protanopia', // Deficiency in red cones
    DEUTERANOPIA = 'Deuteranopia', // Deficiency in green cones
    TRITANOPIA = 'Tritanopia', // Deficiency in blue cones
    ACHROMATOPSIA = 'Achromatopsia' // Complete color blindness
}

export interface ColorResearchResponse {
  psychology: string;
  industries: string[];
  brandExamples: string[];
  accentColorSuggestions: Array<{
    name: string;
    hex: string;
  }>;
  accentUsageNotes: string;
}

export type ExportFormat = 'Image' | 'CSS' | 'JSON' | 'Tailwind';

export type GeneratorTool = 'simulation' | 'accessibility' | 'ui-preview';