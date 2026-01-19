
import { GoogleGenAI, Type } from "@google/genai";
import { NewsItem } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function fetchFinanceNews(): Promise<NewsItem[]> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Gere 6 notícias fictícias mas realistas de hoje: 3 de economia e 3 de política, focadas no cenário brasileiro e internacional. Para cada notícia, forneça uma URL de imagem do Unsplash real e funcional seguindo o padrão 'https://images.unsplash.com/photo-[ID]?auto=format&fit=crop&q=80&w=800'. Os temas das imagens devem ser: prédios de escritórios modernos, congressos, tecnologia financeira, gráficos de bolsa, ou moedas. Retorne em formato JSON.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              summary: { type: Type.STRING },
              category: { type: Type.STRING, description: "must be 'economy' or 'politics'" },
              timestamp: { type: Type.STRING },
              source: { type: Type.STRING },
              imageUrl: { type: Type.STRING, description: "A valid high-quality Unsplash image URL starting with https://images.unsplash.com/" }
            },
            required: ["id", "title", "summary", "category", "timestamp", "source", "imageUrl"]
          }
        }
      }
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Erro ao buscar notícias:", error);
    return [];
  }
}

export async function getMarketInsight(marketData: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analise estes dados de mercado e dê um insight rápido de 2 frases para um investidor de elite: ${marketData}`,
    });
    return response.text || "Análise indisponível no momento.";
  } catch (error) {
    return "Erro ao processar análise do mercado.";
  }
}
