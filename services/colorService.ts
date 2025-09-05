import { ColorHarmony, ColorSimulationType } from '../types';

type HSL = { h: number; s: number; l: number };
type RGB = { r: number; g: number; b: number };

function hexToRgb(hex: string): RGB {
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex.substring(1, 3), 16);
    g = parseInt(hex.substring(3, 5), 16);
    b = parseInt(hex.substring(5, 7), 16);
  }
  return { r, g, b };
}

function rgbToHex({ r, g, b }: RGB): string {
  const toHex = (c: number) => {
    const hex = Math.round(c).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}


function hexToHsl(hex: string): HSL {
  let { r, g, b } = hexToRgb(hex);

  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  
  l = Math.max(0, Math.min(100, l));

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;

  if (h >= 0 && h < 60) { [r, g, b] = [c, x, 0]; }
  else if (h >= 60 && h < 120) { [r, g, b] = [x, c, 0]; }
  else if (h >= 120 && h < 180) { [r, g, b] = [0, c, x]; }
  else if (h >= 180 && h < 240) { [r, g, b] = [0, x, c]; }
  else if (h >= 240 && h < 300) { [r, g, b] = [x, 0, c]; }
  else if (h >= 300 && h < 360) { [r, g, b] = [c, 0, x]; }
  
  const rgb = {
      r: (r + m) * 255,
      g: (g + m) * 255,
      b: (b + m) * 255
  };

  return rgbToHex(rgb);
}


export function generateSecondaryColor(primaryHex: string, harmony: ColorHarmony): string {
  const primaryHsl = hexToHsl(primaryHex);
  let secondaryHue = primaryHsl.h;

  switch (harmony) {
    case ColorHarmony.COMPLEMENTARY:
      secondaryHue = (primaryHsl.h + 180) % 360;
      break;
    case ColorHarmony.ANALOGOUS:
      secondaryHue = (primaryHsl.h + 30) % 360;
      break;
    case ColorHarmony.TRIADIC:
      secondaryHue = (primaryHsl.h + 120) % 360;
      break;
    case ColorHarmony.SPLIT_COMPLEMENTARY:
      secondaryHue = (primaryHsl.h + 150) % 360;
      break;
    default:
      secondaryHue = (primaryHsl.h + 180) % 360;
  }
  
  return hslToHex(secondaryHue, primaryHsl.s, primaryHsl.l);
}

export function generateColorShades(baseHex: string): string[] {
    try {
        const { h, s, l } = hexToHsl(baseHex);
        const shades = new Array(10).fill('');

        shades[5] = baseHex;

        for (let i = 4; i >= 0; i--) {
            const lightness = l + ((98 - l) / 6) * (5 - i);
            shades[i] = hslToHex(h, s, lightness);
        }
        
        for (let i = 6; i < 10; i++) {
            const lightness = l - ((l - 8) / 4) * (i - 5);
            shades[i] = hslToHex(h, s, lightness);
        }
        
        return shades;
    } catch(e) {
        return new Array(10).fill('#000000');
    }
}


export function getRandomHexColor(): string {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return '#' + '0'.repeat(6 - randomColor.length) + randomColor;
}

// --- Accessibility Functions ---

const linearize = (val: number): number => {
  const srgb = val / 255;
  if (srgb <= 0.03928) {
    return srgb / 12.92;
  }
  return Math.pow((srgb + 0.055) / 1.055, 2.4);
};

export function getLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  const linR = linearize(r);
  const linG = linearize(g);
  const linB = linearize(b);

  return 0.2126 * linR + 0.7152 * linG + 0.0722 * linB;
}

export function getContrastRatio(hex1: string, hex2: string): number {
  try {
    const lum1 = getLuminance(hex1);
    const lum2 = getLuminance(hex2);
    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);
    return (lighter + 0.05) / (darker + 0.05);
  } catch (e) {
    return 1;
  }
}

export type WcagLevel = 'Fail' | 'AA' | 'AAA';

export interface WcagReport {
    ratio: number;
    normal: WcagLevel;
    large: WcagLevel;
}

export function getWcagReport(ratio: number): WcagReport {
    let normal: WcagLevel = 'Fail';
    if (ratio >= 7) normal = 'AAA';
    else if (ratio >= 4.5) normal = 'AA';
    
    let large: WcagLevel = 'Fail';
    if (ratio >= 4.5) large = 'AAA';
    else if (ratio >= 3) large = 'AA';

    return { ratio, normal, large };
}

// --- Color Simulation Functions ---

const clamp = (value: number) => Math.max(0, Math.min(255, value));

export function simulateColor(hex: string, type: ColorSimulationType): string {
    if (type === ColorSimulationType.NONE) {
        return hex;
    }

    const { r, g, b } = hexToRgb(hex);
    let sr = r, sg = g, sb = b;

    switch(type) {
        case ColorSimulationType.PROTANOPIA: // reds are weak
            sr = 0.567 * r + 0.433 * g + 0.000 * b;
            sg = 0.558 * r + 0.442 * g + 0.000 * b;
            sb = 0.000 * r + 0.242 * g + 0.758 * b;
            break;
        case ColorSimulationType.DEUTERANOPIA: // greens are weak
            sr = 0.625 * r + 0.375 * g + 0.000 * b;
            sg = 0.700 * r + 0.300 * g + 0.000 * b;
            sb = 0.000 * r + 0.300 * g + 0.700 * b;
            break;
        case ColorSimulationType.TRITANOPIA: // blues are weak
            sr = 0.950 * r + 0.050 * g + 0.000 * b;
            sg = 0.000 * r + 0.433 * g + 0.567 * b;
            sb = 0.000 * r + 0.475 * g + 0.525 * b;
            break;
        case ColorSimulationType.ACHROMATOPSIA: // monochromacy
            const gray = 0.299 * r + 0.587 * g + 0.114 * b;
            sr = gray;
            sg = gray;
            sb = gray;
            break;
    }

    return rgbToHex({ r: clamp(sr), g: clamp(sg), b: clamp(sb) });
}