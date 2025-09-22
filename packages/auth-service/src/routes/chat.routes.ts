import { Router } from "express";
import { requireAuth } from "../middlewares/authz";
import {
  createChatSession,
  getChatSessions,
  getChatSession,
  saveMessage,
  getChatHistory
} from "../controllers/chat.controller.js";

export const chatRouter = Router();

// All chat routes require authentication
chatRouter.use(requireAuth);

// Chat session routes
chatRouter.post("/chat/sessions", createChatSession);
chatRouter.get("/chat/sessions", getChatSessions);
chatRouter.get("/chat/sessions/:sessionId", getChatSession);
chatRouter.post("/chat/sessions/:sessionId/messages", saveMessage);

// Chat history route
chatRouter.get("/chat/history", getChatHistory);

export default chatRouter;