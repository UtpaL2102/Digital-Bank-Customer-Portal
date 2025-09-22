import axios from "axios";

export const chatbotClient = axios.create({
  baseURL: (process.env.CHATBOT_SERVICE_URL || "http://localhost:5001").replace(/\/$/, ""),
  timeout: 8000,
});

export interface ChatResponse {
  reply: string;
  confidence_score: number;
  sources: string[];
}

export interface ChatRequest {
  message: string;
}