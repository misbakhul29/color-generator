import { GoogleGenAI, Type } from '@google/genai';
import { ColorResearchResponse } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const researchSchema = {
  type: Type.OBJECT,
  properties: {
    psychology: {
      type: Type.STRING,
      description: 'A brief, engaging summary of the psychological associations of this color (e.g., trust, passion, energy). Keep it to 1-2 sentences.',
    },
    industries: {
      type: Type.ARRAY,
      description: 'List of industries where this color is commonly and effectively used.',
      items: { type: Type.STRING },
    },
    brandExamples: {
      type: Type.ARRAY,
      description: 'List of well-known brands that use this color as a primary or significant secondary color in their branding.',
      items: { type: Type.STRING },
    },
    accentColorSuggestions: {
        type: Type.ARRAY,
        description: 'A list of objects, each representing a suggested accent color with its name and corresponding hex code.',
        items: {
            type: Type.OBJECT,
            properties: {
                name: { type: Type.STRING, description: 'Descriptive name of the accent color (e.g., "Warm Orange").' },
                hex: { type: Type.STRING, description: 'The hex code for the accent color (e.g., "#ff8c00").' }
            },
            required: ['name', 'hex']
        }
    },
    accentUsageNotes: {
        type: Type.STRING,
        description: 'A brief explanation (1-2 sentences) of how these accent colors can be used with the primary color to create a balanced and effective design.'
    }
  },
  required: ['psychology', 'industries', 'brandExamples', 'accentColorSuggestions', 'accentUsageNotes'],
};


export const researchColor = async (colorHex: string): Promise<ColorResearchResponse> => {
    const prompt = `Provide a detailed color analysis for the hex code ${colorHex}. I need its psychological impact, common industry applications, famous brand examples, and suggestions for accent colors. For each accent color, provide a descriptive name and its hex code. Also, provide a brief summary of how to effectively use these accent colors.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: researchSchema,
                temperature: 0.5,
            },
        });
        
        const jsonText = response.text.trim();
        const parsedData = JSON.parse(jsonText);
        
        // Basic validation to ensure the parsed data matches the expected structure
        if (
            parsedData &&
            typeof parsedData.psychology === 'string' &&
            Array.isArray(parsedData.industries) &&
            Array.isArray(parsedData.brandExamples) &&
            Array.isArray(parsedData.accentColorSuggestions) &&
            typeof parsedData.accentUsageNotes === 'string' &&
            parsedData.accentColorSuggestions.every((item: any) => typeof item.name === 'string' && typeof item.hex === 'string')
        ) {
            return parsedData as ColorResearchResponse;
        } else {
            throw new Error("Parsed data does not match the expected schema.");
        }
    } catch (error) {
        console.error("Error fetching or parsing color research from Gemini API:", error);
        throw new Error("Failed to get a valid response from the AI. Please try a different color or try again later.");
    }
};