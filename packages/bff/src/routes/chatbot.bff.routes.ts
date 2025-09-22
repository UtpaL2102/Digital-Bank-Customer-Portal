import { Router } from "express";
import { chatbotClient, ChatRequest, ChatResponse } from "../clients/chatbot.client.js";
import { authClient } from "../clients/auth.client.js";
import { forwardContextHeaders } from "../middlewares/auth.forwardContext.js";

export const chatbotBffRouter = Router();

// Chat Session Management Routes
chatbotBffRouter.post("/api/v1/chat/sessions", async (req, res, next) => {
  try {
    const response = await authClient.post(
      "/chat/sessions",
      req.body,
      { headers: forwardContextHeaders(req) }
    );
    res.status(response.status).json(response.data);
  } catch (e: any) {
    if (e.response) return res.status(e.response.status).json(e.response.data);
    return next(e);
  }
});

chatbotBffRouter.get("/api/v1/chat/sessions", async (req, res, next) => {
  try {
    const response = await authClient.get(
      "/chat/sessions",
      { headers: forwardContextHeaders(req) }
    );
    res.status(response.status).json(response.data);
  } catch (e: any) {
    if (e.response) return res.status(e.response.status).json(e.response.data);
    return next(e);
  }
});

chatbotBffRouter.get("/api/v1/chat/sessions/:sessionId", async (req, res, next) => {
  try {
    const response = await authClient.get(
      `/chat/sessions/${req.params.sessionId}`,
      { headers: forwardContextHeaders(req) }
    );
    res.status(response.status).json(response.data);
  } catch (e: any) {
    if (e.response) return res.status(e.response.status).json(e.response.data);
    return next(e);
  }
});

chatbotBffRouter.post("/api/v1/chat/sessions/:sessionId/messages", async (req, res, next) => {
  try {
    const response = await authClient.post(
      `/chat/sessions/${req.params.sessionId}/messages`,
      req.body,
      { headers: forwardContextHeaders(req) }
    );
    res.status(response.status).json(response.data);
  } catch (e: any) {
    if (e.response) return res.status(e.response.status).json(e.response.data);
    return next(e);
  }
});

// Existing chat route
chatbotBffRouter.post("/api/v1/chat", async (req, res, next) => {
  try {
    const chatRequest: ChatRequest = req.body;
    
    const response = await chatbotClient.post<ChatResponse>(
      "/chat",
      chatRequest,
      { headers: forwardContextHeaders(req) }
    );
    
    res.status(response.status).json(response.data);
  } catch (e: any) {
    if (e.response) return res.status(e.response.status).json(e.response.data);
    return next(e);
  }
});

// Chat History Route
chatbotBffRouter.get("/api/v1/chat/history", async (req, res, next) => {
  try {
    const response = await authClient.get(
      "/chat/history",
      { headers: forwardContextHeaders(req) }
    );
    res.status(response.status).json(response.data);
  } catch (e: any) {
    if (e.response) return res.status(e.response.status).json(e.response.data);
    return next(e);
  }
});

export default chatbotBffRouter;