
import { GoogleGenAI, Type } from "@google/genai";
import { TankData, SmartInsight } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Removed the non-existent UsageHistory type reference and updated return type to SmartInsight[]
export const getSmartInsights = async (tank: TankData): Promise<SmartInsight[]> => {
  const model = 'gemini-3-flash-preview';
  
  const prompt = `
    Briefly analyze this water tank status.
    Current Data: Name: ${tank.name}, Level: ${tank.level}%, Temperature: ${tank.temperature}°C, Pump Status: ${tank.isPumpOn ? 'ON' : 'OFF'}.
    
    Provide ONE short sentence of insight (under 15 words).
    Format as JSON: {"description": "..."}
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            description: { type: Type.STRING }
          },
          required: ['description']
        }
      }
    });

    const text = response.text || '{"description": "System status is normal."}';
    const data = JSON.parse(text);
    
    // Returning objects that conform to the SmartInsight interface defined in types.ts
    return [{
      title: 'AI Analysis',
      description: data.description,
      type: 'info',
      priority: 'low'
    }];
  } catch (error) {
    console.error("Gemini Error:", error);
    return [{
      title: 'System Status',
      description: "System operational. Status normal.",
      type: 'info',
      priority: 'low'
    }];
  }
};
