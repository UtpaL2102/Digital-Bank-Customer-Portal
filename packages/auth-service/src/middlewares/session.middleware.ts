import { Request, Response, NextFunction } from "express";
import { prisma } from "../db/prismaClient";
import { UAParser } from "ua-parser-js";

export async function sessionMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    // Only track sessions for authenticated requests
    if (!req.user?.id) {
      return next();
    }

    const userId = req.user.id;
    const userAgent = req.headers["user-agent"] || "";
    const ipAddress = (req.headers["x-forwarded-for"] as string)?.split(",")[0].trim() || 
                     req.socket.remoteAddress || "";

    // Create or update session
    const session = await prisma.session.upsert({
      where: {
        token: `${userId}:${userAgent}:${ipAddress}`
      },
      create: {
        userId,
        userAgent,
        ipAddress,
        token: `${userId}:${userAgent}:${ipAddress}`,
        lastActive: new Date(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
      },
      update: {
        lastActive: new Date()
      }
    });

    // Attach session ID to request locals
    (req as any).locals = {
      ...(req as any).locals,
      sessionId: session.id
    };
    next();
  } catch (error) {
    console.error("Session middleware error:", error);
    next();
  }
}