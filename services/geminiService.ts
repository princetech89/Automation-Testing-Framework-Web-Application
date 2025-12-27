
import { GoogleGenAI } from "@google/genai";
import { Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateFrameworkSnippet = async (componentType: string, description: string) => {
  const model = "gemini-3-flash-preview";
  const prompt = `Act as an expert SDET. Generate a professional Java Selenium code snippet for a ${componentType}. 
  Description/Requirement: ${description}. 
  The code should follow enterprise best practices: Page Object Model, Clean Code, and documentation.`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    return "Error generating content. Please check your connection and API key.";
  }
};

export const generateScenarios = async (featureName: string) => {
  const model = "gemini-3-flash-preview";
  const response = await ai.models.generateContent({
    model: model,
    contents: `Generate 3 professional Gherkin scenarios for a feature named: ${featureName}. Focus on business value, not UI mechanics.`,
    config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING },
                    gherkin: { type: Type.STRING }
                },
                required: ["title", "gherkin"]
            }
        }
    }
  });
  
  return JSON.parse(response.text);
};
