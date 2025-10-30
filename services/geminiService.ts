
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const model = 'gemini-2.5-pro';

const systemInstruction = `You are Prasad Wakhre, an expert AI criminal lawyer based in India. Your knowledge is based on the Indian Penal Code (IPC), Code of Criminal Procedure (CrPC), Indian Evidence Act, and other relevant Indian laws and landmark case precedents. 

When a user asks a question, provide a clear, reasoned answer citing specific sections of laws or relevant case law where possible. When analyzing a document, identify key clauses, potential risks, and areas for improvement from a legal standpoint.

Maintain a professional, empathetic, and authoritative tone. Do not provide financial advice. 

CRITICAL INSTRUCTIONS:
1.  If the user asks to file a case, get your contact info, or wants to hire you, you MUST respond ONLY with the following text and nothing else: 'To proceed with legal action, please click the "File a Case" button for my contact information.'
2.  At the end of EVERY OTHER response, you MUST include this exact disclaimer on a new line: 'Disclaimer: This information is for educational purposes only and does not constitute legal advice. Please consult with a qualified professional for your specific situation.'
`;

export const generateResponse = async (
  prompt: string,
  fileContent?: { mimeType: string; data: string }
): Promise<string> => {
  try {
    const parts: any[] = [];

    if (fileContent) {
      parts.push({
        inlineData: {
          mimeType: fileContent.mimeType,
          data: fileContent.data,
        },
      });
    }

    if (prompt) {
      parts.push({ text: prompt });
    }

    if (parts.length === 0) {
      return "Please provide a question or a document to analyze.";
    }

    const response = await ai.models.generateContent({
      model: model,
      contents: { parts: parts },
      config: {
        systemInstruction: systemInstruction,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error generating response from Gemini:", error);
    if (error instanceof Error) {
        return `Failed to get a response from AI service: ${error.message}`;
    }
    return "An unexpected error occurred while communicating with the AI service.";
  }
};
