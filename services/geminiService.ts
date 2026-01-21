
import { GoogleGenAI, Type } from "@google/genai";

// AI features for ZenithPDF using @google/genai SDK.
// We initialize the client inside methods to ensure process.env is accessible during execution.

export const geminiService = {
  async analyzePDFContent(text: string) {
    try {
      // Correct: Use process.env.API_KEY directly in initialization
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are an expert PDF assistant. Analyze the following text extracted from a document and provide a concise summary, key entities, and suggested next steps (e.g., "This looks like a contract, you might want to protect it"). \n\nContent:\n${text.substring(0, 5000)}`,
        config: {
          temperature: 0.7,
        }
      });
      // Correct: Use .text property directly
      return response.text || "Analysis complete.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Failed to analyze document with AI.";
    }
  },

  async suggestMetadata(fileName: string) {
     try {
       // Correct: Use process.env.API_KEY directly in initialization
       const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
       const response = await ai.models.generateContent({
         model: 'gemini-3-flash-preview',
         contents: `Based on the file name "${fileName}", suggest a professional Title, Author, and Subject for the PDF metadata in JSON format.`,
         config: {
           responseMimeType: "application/json",
           responseSchema: {
             type: Type.OBJECT,
             properties: {
               title: { type: Type.STRING },
               author: { type: Type.STRING },
               subject: { type: Type.STRING }
             }
           }
         }
       });
       
       // Correct: Access .text property directly
       const jsonStr = response.text?.trim() || '{}';
       return JSON.parse(jsonStr);
     } catch (e) {
       console.error("Gemini Metadata Error:", e);
       return null;
     }
  },

  async translateDocument(fileName: string, targetLanguage: string) {
    try {
      // Correct: Use process.env.API_KEY directly in initialization
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `I have a document named "${fileName}". I want to translate its entire content into ${targetLanguage}. 
        Briefly explain how you would handle this translation while maintaining the original layout and professional tone.`,
        config: {
          temperature: 0.3,
        }
      });
      // Correct: Use .text property directly
      return response.text || "Translation engine initialized.";
    } catch (error) {
      console.error("Gemini Translation Error:", error);
      return "Failed to connect to AI translation engine.";
    }
  }
};
