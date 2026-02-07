
import { GoogleGenAI, Type } from "@google/genai";
import { TrendObject, SimulationResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getTrendIntelligence = async (trend: TrendObject): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `As an AI systems architect and F&B researcher, analyze this trend and provide strategic counsel for a CPG founder:
      
      TREND: ${trend.title}
      STAGE: ${trend.maturity}
      DEFINITION: ${trend.definition}
      DRIVERS: ${trend.primaryDriver}
      EVIDENCE: ${trend.evidenceSummary}
      DEMOGRAPHICS: ${trend.demographic_profile.early_adopter_profile}
      DIFFUSION ORIGIN: ${trend.diffusion_profile.origin_region}

      Please provide:
      1. A "Killer Application": One specific, high-probability product concept.
      2. Hidden Risks: Why this might fail (noise, regulation, socio-economic barriers, etc).
      3. First-Mover Playbook: What specific action should the founder take this week?
      
      Use Markdown formatting. Headings should be short. Be practical and skeptical.`,
      config: {
        temperature: 0.7,
        topP: 0.95,
      }
    });

    return response.text || "No intelligence generated.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Failed to fetch AI insights. Check API configuration.";
  }
};

export const generateOpportunityBrief = async (trend: TrendObject): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Generate a high-level "Opportunity Brief" for the following trend in the CPG (Consumer Packaged Goods) sector:
      
      TREND: ${trend.title}
      CATEGORY: ${trend.category}
      MATURITY: ${trend.maturity}
      DRIVERS: ${trend.primaryDriver}, ${trend.secondaryDriver}
      
      The brief must include:
      - THE OPPORTUNITY: Clear statement of the market gap.
      - WHY NOW: Secular shifts or signals justifying immediate attention.
      - TARGET CONSUMER: Psychographics and core pain points.
      - PRODUCT CONCEPTS: 2-3 specific product or format opportunities.
      - CONSTRAINTS & RISKS: Supply chain, regulatory, or adoption hurdles.
      
      Format with clean Markdown. Use bolding and lists for readability. Avoid fluff.`,
      config: {
        temperature: 0.8,
        topP: 0.9,
      }
    });

    return response.text || "Brief generation failed.";
  } catch (error) {
    console.error("Brief Error:", error);
    return "Error generating brief. Please retry.";
  }
};

export const brainstormNewSignals = async (topic: string): Promise<SimulationResult | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Perform a Systemic Probe for emerging F&B signals related to: ${topic}. 
      Generate hypothetical SignalObjects that represent what we MIGHT see if this trend were emerging.
      Analyze the driver, adjacencies, and provide validation/falsification logic.
      Crucially, infer probable demographics (Age, Gender, and Socio-Economic Status) and a GEOGRAPHIC DIFFUSION PATH (e.g., CA -> NY -> National).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            hypotheticalSignals: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  signal_type: { type: Type.STRING },
                  source: { type: Type.STRING },
                  raw_excerpt: { type: Type.STRING },
                  keyword_cluster: { type: Type.STRING },
                  velocity: { type: Type.NUMBER },
                  novelty_score: { type: Type.NUMBER },
                  geo_origin: { type: Type.STRING },
                  detected_at: { type: Type.STRING },
                  confidence: { type: Type.STRING },
                  linked_trends: { type: Type.ARRAY, items: { type: Type.STRING } },
                  demographics: {
                    type: Type.OBJECT,
                    properties: {
                      dominant_age: { type: Type.STRING },
                      dominant_gender: { type: Type.STRING },
                      confidence: { type: Type.STRING },
                      inference_logic: { type: Type.STRING }
                    },
                    required: ["dominant_age", "dominant_gender", "confidence", "inference_logic"]
                  }
                },
                required: ["id", "signal_type", "source", "raw_excerpt", "keyword_cluster", "velocity", "novelty_score", "geo_origin", "detected_at", "confidence", "demographics"]
              }
            },
            consumerDriver: { type: Type.STRING },
            adjacentCategories: { type: Type.ARRAY, items: { type: Type.STRING } },
            speculativeConfidence: { type: Type.STRING },
            validationCriteria: { type: Type.STRING },
            falsificationCriteria: { type: Type.STRING },
            hypotheticalDiffusion: {
              type: Type.OBJECT,
              properties: {
                origin_region: { type: Type.STRING },
                is_region_first: { type: Type.BOOLEAN },
                current_node_index: { type: Type.NUMBER },
                path: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      label: { type: Type.STRING },
                      status: { type: Type.STRING },
                      avg_lag_months: { type: Type.NUMBER }
                    },
                    required: ["label", "status", "avg_lag_months"]
                  }
                }
              },
              required: ["origin_region", "is_region_first", "current_node_index", "path"]
            }
          },
          required: ["hypotheticalSignals", "consumerDriver", "adjacentCategories", "speculativeConfidence", "validationCriteria", "falsificationCriteria", "hypotheticalDiffusion"]
        }
      }
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as SimulationResult;
  } catch (error) {
    console.error("Simulation Error:", error);
    return null;
  }
}
