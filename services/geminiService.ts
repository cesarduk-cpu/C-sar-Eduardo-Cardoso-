import { GoogleGenAI } from "@google/genai";
import { CompassDataPoint, TimelineEvent, Skill } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });
const modelId = 'gemini-2.5-flash';

export const analyzeCompass = async (data: CompassDataPoint[]): Promise<string> => {
  if (!apiKey) return "API Key não configurada.";

  const prompt = `
    Atue como um coach executivo sênior e especialista em gestão.
    Analise os seguintes dados da "Bússola da Gestão" de um líder (escala 0-10):

    ${data.map(d => `- ${d.subject}: Atual=${d.current} vs Ideal=${d.ideal}`).join('\n')}

    Identifique os maiores "Gaps" (diferença entre atual e ideal).
    Forneça 3 estratégias práticas e diretas (bullet points) para alinhar a gestão atual com a desejada, focando em onde o desequilíbrio é maior.
    Mantenha o tom encorajador mas prático. Máximo 150 palavras.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });
    return response.text || "Não foi possível gerar a análise.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Erro ao conectar com a IA. Tente novamente.";
  }
};

export const analyzeTimeline = async (events: TimelineEvent[]): Promise<string> => {
  if (!apiKey) return "API Key não configurada.";

  const prompt = `
    Atue como um mentor de liderança. Analise a "Linha do Tempo da Gestão" deste usuário:

    ${events.map(e => `[${e.date}] Tipo: ${e.type === 'peak' ? 'SUCESSO (Pico)' : 'DESAFIO (Vale)'} | Evento: ${e.title} | Ação do Líder: ${e.action}`).join('\n')}

    1. Identifique um padrão no comportamento do líder (ex: proativo vs reativo).
    2. Destaque uma força demonstrada nos momentos de sucesso.
    3. Sugira uma lição aprendida dos momentos de desafio.
    Seja conciso. Máximo 150 palavras.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });
    return response.text || "Não foi possível gerar a análise.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Erro ao conectar com a IA. Tente novamente.";
  }
};

export const analyzeSkills = async (skills: Skill[]): Promise<string> => {
  if (!apiKey) return "API Key não configurada.";

  const prompt = `
    Atue como especialista em T&D (Treinamento e Desenvolvimento).
    Com base neste "Termômetro de Competências" (0-100%):

    ${skills.map(s => `- ${s.name}: ${s.level}%`).join('\n')}

    Escolha a competência com menor nota e sugira um plano de micro-aprendizado (1 livro, 1 hábito diário, 1 podcast/vídeo) para desenvolvê-la.
    Escolha a competência com maior nota e sugira como ela pode ser usada para alavancar a equipe.
    Máximo 150 palavras.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });
    return response.text || "Não foi possível gerar a análise.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Erro ao conectar com a IA. Tente novamente.";
  }
};
