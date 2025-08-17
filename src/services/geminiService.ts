
import { GoogleGenAI, Type } from "@google/genai";
import { Van } from '../types';

// IMPORTANT: This service assumes that `process.env.API_KEY` is set in the environment.
// Do not add any UI or code to handle the API key.
let ai: GoogleGenAI | null = null;
if (process.env.API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
} else {
    console.error("API_KEY environment variable not set. Gemini API features will be disabled.");
}

const vanSchema = {
  type: Type.OBJECT,
  properties: {
    partnerName: { type: Type.STRING, description: 'The name of the charging partner.' },
    vanModel: { type: Type.STRING, description: 'The model of the electric van, e.g., "Tata Ace EV".' },
    rating: { type: Type.NUMBER, description: 'A rating out of 5, e.g., 4.7.' },
    etaMinutes: { type: Type.INTEGER, description: 'Estimated time of arrival in minutes.' },
    pricePerKWh: { type: Type.NUMBER, description: 'The cost for 1 kWh of charge.' },
    capacityKWh: { type: Type.INTEGER, description: 'The total battery capacity of the charging van in kWh.' },
  },
  required: ['partnerName', 'vanModel', 'rating', 'etaMinutes', 'pricePerKWh', 'capacityKWh']
};

export const generateVansData = async (): Promise<Van[]> => {
  if (!ai) {
    console.warn("Gemini AI not initialized. Returning fallback mock data.");
    // Fallback data if API key is missing
    return [
        { id: '1', partnerName: 'ChargeUp Now', vanModel: 'Tata Ace EV', rating: 4.8, etaMinutes: 12, pricePerKWh: 20, capacityKWh: 30, lat: 12.9716, lng: 77.5946 },
        { id: '2', partnerName: 'BoltCharge', vanModel: 'Mahindra E-Supro', rating: 4.6, etaMinutes: 25, pricePerKWh: 18, capacityKWh: 25, lat: 12.9810, lng: 77.6042 },
        { id: '3', partnerName: 'EcoBoosters', vanModel: 'Ashok Leyland Dost EV', rating: 4.9, etaMinutes: 8, pricePerKWh: 22, capacityKWh: 40, lat: 12.9650, lng: 77.5841 },
    ];
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Generate a list of 5 fictional mobile EV charging van providers for a roadside assistance app called GatiYaan. They should sound like Indian company names.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: vanSchema,
        },
      },
    });

    const jsonText = response.text.trim();
    const generatedVans = JSON.parse(jsonText);

    // Add unique IDs and random coordinates to the generated data
    return generatedVans.map((van: Omit<Van, 'id' | 'lat' | 'lng'>, index: number) => ({
      ...van,
      id: `${Date.now()}-${index}`,
      lat: 12.9716 + (Math.random() - 0.5) * 0.05, // Randomize around a central point
      lng: 77.5946 + (Math.random() - 0.5) * 0.05,
    }));
  } catch (error) {
    console.error("Error generating van data with Gemini API:", error);
    // Return fallback data on API error
    return [
        { id: '1', partnerName: 'ChargeUp Now', vanModel: 'Tata Ace EV', rating: 4.8, etaMinutes: 12, pricePerKWh: 20, capacityKWh: 30, lat: 12.9716, lng: 77.5946 },
        { id: '2', partnerName: 'BoltCharge', vanModel: 'Mahindra E-Supro', rating: 4.6, etaMinutes: 25, pricePerKWh: 18, capacityKWh: 25, lat: 12.9810, lng: 77.6042 },
        { id: '3', partnerName: 'EcoBoosters', vanModel: 'Ashok Leyland Dost EV', rating: 4.9, etaMinutes: 8, pricePerKWh: 22, capacityKWh: 40, lat: 12.9650, lng: 77.5841 },
    ];
  }
};
