import { Request, Response, NextFunction } from "express";
import { prisma } from "../db/prismaClient";
import { AppError } from "../../../common/src/errors.js";

type ChatRole = "user" | "assistant";

const isValidRole = (role: string): role is ChatRole => {
  return role === "user" || role === "assistant";
};

const isValidDate = (date: string): boolean => {
  const d = new Date(date);
  return d instanceof Date && !isNaN(d.getTime());
};


// Create a new chat session
export const createChatSession = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id as string;
  const { title } = req.body;

  try {
    const session = await prisma.chatSession.create({
      data: {
        user_id: userId,
        title,
        status: "active"
      }
    });

    res.status(201).json({
      id: session.id,
      title: session.title,
      status: session.status,
      created_at: session.created_at,
      updated_at: session.updated_at
    });
  } catch (error) {
    return res.status(500).json({ 
      error: { 
        code: "CHAT_SESSION_CREATE_FAILED", 
        message: "Failed to create chat session" 
      }
    });
  }
};

// Get all chat sessions for user
export const getChatSessions = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id as string;

  try {
    const sessions = await prisma.chatSession.findMany({
      where: {
        user_id: userId,
        status: "active"
      },
      include: {
        _count: {
          select: {
            messages: true
          }
        }
      },
      orderBy: {
        created_at: "desc"
      }
    });

    res.json({
      sessions: sessions.map(session => ({
        id: session.id,
        title: session.title,
        status: session.status,
        message_count: session._count.messages,
        created_at: session.created_at,
        updated_at: session.updated_at
      }))
    });
  } catch (error) {
    return res.status(500).json({
      error: {
        code: "CHAT_SESSIONS_FETCH_FAILED",
        message: "Failed to fetch chat sessions"
      }
    });
  }
};

// Get specific chat session with messages
export const getChatSession = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id as string;
  const { sessionId } = req.params;

  try {
    const session = await prisma.chatSession.findFirst({
      where: {
        id: sessionId,
        user_id: userId,
        status: "active"
      },
      include: {
        messages: {
          orderBy: {
            created_at: "asc"
          }
        }
      }
    });

    if (!session) {
      return res.status(404).json({
        error: {
          code: "CHAT_SESSION_NOT_FOUND",
          message: "Chat session not found"
        }
      });
    }

    return res.json({
      id: session.id,
      title: session.title,
      status: session.status,
      created_at: session.created_at,
      updated_at: session.updated_at,
      messages: session.messages.map(msg => ({
        id: msg.id,
        content: msg.content,
        role: msg.role,
        confidence_score: msg.confidence_score,
        created_at: msg.created_at
      }))
    });
  } catch (error) {
    return res.status(500).json({
      error: {
        code: "CHAT_SESSION_FETCH_FAILED",
        message: "Failed to fetch chat session"
      }
    });
  }
};

// Save new message to session
export const saveMessage = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id as string;
  const { sessionId } = req.params;
  const { content, role, confidence_score, metadata } = req.body;

  // Validate content
  if (typeof content !== 'string' || content.trim().length === 0) {
    return res.status(400).json({
      error: {
        code: "BAD_REQUEST",
        message: "content is required and must be a non-empty string"
      }
    });
  }

  // Validate role
  if (!isValidRole(role)) {
    return res.status(400).json({
      error: {
        code: "BAD_REQUEST",
        message: "role must be 'user' or 'assistant'"
      }
    });
  }

  try {
    // Verify session belongs to user
    const session = await prisma.chatSession.findFirst({
      where: {
        id: sessionId,
        user_id: userId,
        ended_at: null
      }
    });

    if (!session) {
      return res.status(404).json({
        error: {
          code: "CHAT_SESSION_NOT_FOUND",
          message: "Chat session not found"
        }
      });
    }

    const message = await prisma.chatMessage.create({
      data: {
        session_id: sessionId,
        content,
        role,
        confidence_score,
        metadata
      }
    });

    // Update session's updated_at
    await prisma.chatSession.update({
      where: { id: sessionId },
      data: { updated_at: new Date() }
    });

    return res.status(201).json({
      id: message.id,
      content: message.content,
      role: message.role,
      confidence_score: message.confidence_score,
      created_at: message.created_at
    });
  } catch (error) {
    return res.status(500).json({
      error: {
        code: "MESSAGE_SAVE_FAILED",
        message: "Failed to save message"
      }
    });
  }
};

// Get paginated chat history
export const getChatHistory = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id as string;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  // Parse and validate dates if provided
  let startDate: Date | null = null;
  let endDate: Date | null = null;

  if (req.query.startDate || req.query.endDate) {
    // Validate startDate
    if (req.query.startDate) {
      if (!isValidDate(req.query.startDate as string)) {
        return res.status(400).json({
          error: {
            code: "BAD_REQUEST",
            message: "Invalid startDate format"
          }
        });
      }
      startDate = new Date(req.query.startDate as string);
    }

    // Validate endDate
    if (req.query.endDate) {
      if (!isValidDate(req.query.endDate as string)) {
        return res.status(400).json({
          error: {
            code: "BAD_REQUEST",
            message: "Invalid endDate format"
          }
        });
      }
      endDate = new Date(req.query.endDate as string);
    }

    // Validate date range if both dates are provided
    if (startDate && endDate && startDate > endDate) {
      return res.status(400).json({
        error: {
          code: "BAD_REQUEST",
          message: "startDate must be before or equal to endDate"
        }
      });
    }
  }

  try {
    const where = {
      user_id: userId,
      status: "active",
      ...(startDate && endDate ? {
        created_at: {
          gte: startDate,
          lte: endDate
        }
      } : {})
    };

    const [sessions, total] = await Promise.all([
      prisma.chatSession.findMany({
        where,
        include: {
          messages: {
            orderBy: {
              created_at: "desc"
            },
            take: 5 // Get 5 most recent messages per session
          },
          _count: {
            select: {
              messages: true
            }
          }
        },
        orderBy: {
          updated_at: "desc"
        },
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.chatSession.count({ where })
    ]);

    res.json({
      sessions: sessions.map(session => ({
        id: session.id,
        title: session.title,
        status: session.status,
        message_count: session._count.messages,
        recent_messages: session.messages.map(msg => ({
          id: msg.id,
          content: msg.content,
          role: msg.role,
          created_at: msg.created_at
        })),
        created_at: session.created_at,
        updated_at: session.updated_at
      })),
      pagination: {
        current_page: page,
        total_pages: Math.ceil(total / limit),
        total_sessions: total,
        per_page: limit
      }
    });
  } catch (error) {
    return res.status(500).json({
      error: {
        code: "CHAT_HISTORY_FETCH_FAILED",
        message: "Failed to fetch chat history"
      }
    });
  }
};