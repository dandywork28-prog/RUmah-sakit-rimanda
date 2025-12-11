import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.API_KEY || ''; 
// Note: In a real deploy, ensure API_KEY is set in Netlify env vars.

const ai = new GoogleGenAI({ apiKey });

export const summarizeClinicalNote = async (noteText: string): Promise<string> => {
  if (!apiKey) {
    return "Error: API Key is missing. Please configure the environment variable.";
  }

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      You are an expert medical documentation assistant for a hospital.
      Your task is to summarize the following clinical note into a structured "After Visit Summary" format.
      
      Rules:
      1. Use professional medical terminology.
      2. Format the output as Markdown.
      3. Highlight the Diagnosis, Medications, and Follow-up Plan.
      4. Ensure the tone is objective and clinical.
      
      Clinical Note:
      "${noteText}"
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: "You are a helpful AI assistant for medical professionals. Always prioritize patient safety and data privacy.",
        temperature: 0.2, // Low temperature for factual consistency
      }
    });

    return response.text || "Failed to generate summary.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "An error occurred while communicating with the AI service.";
  }
};

export const analyzeFinancialHealth = async (financialData: any): Promise<string> => {
    if (!apiKey) return "API Key missing.";

    try {
        const model = 'gemini-2.5-flash';
        const prompt = `
            Analyze the following BLU Hospital financial snapshot. 
            Provide a brief executive summary (max 1 paragraph) focusing on liquidity and asset health based on the provided numbers.
            
            Data: ${JSON.stringify(financialData)}
        `;

        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
        });
        return response.text || "No analysis available.";
    } catch (e) {
        return "AI Analysis unavailable.";
    }
}
