import { Request, Response } from "express";
import { prisma } from "../db/prismaClient";
import { UAParser } from "ua-parser-js";

export const listSessions = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: { message: 'Unauthorized' } });
    }

    const sessions = await prisma.session.findMany({
      where: {
        userId,
        revokedAt: null, // Only active sessions
      },
      select: {
        id: true,
        userAgent: true,
        ipAddress: true,
        lastActive: true,
        expiresAt: true,
        createdAt: true,
      },
      orderBy: {
        lastActive: 'desc',
      },
    });

    // Format sessions with device info and mark current session
    const currentSessionId = (req as any).locals?.sessionId || null;
    const parser = new UAParser();
    
    const formattedSessions = sessions.map(session => {
      const ua = parser.setUA(session.userAgent).getResult();
      const device = `${ua.browser.name} on ${ua.os.name}`;
      
      return {
        id: session.id,
        device,
        ip: session.ipAddress,
        location: "Unknown", // Would need GeoIP service for this
        last_active: session.lastActive,
        expires_at: session.expiresAt,
        created_at: session.createdAt,
        current: session.id === currentSessionId,
      };
    });

    res.json({ sessions: formattedSessions });
  } catch (error) {
    console.error('Error listing sessions:', error);
    res.status(500).json({ error: { message: 'Failed to list sessions' } });
  }
};

export const revokeSession = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: { message: 'Unauthorized' } });
    }
    
    const sessionId = req.params.id;
    const currentSessionId = (req as any).locals?.sessionId;

    // Don't allow revoking current session
    if (sessionId === currentSessionId) {
      return res.status(400).json({
        error: { message: 'Cannot revoke current session' }
      });
    }

    // Find and revoke the session
    const session = await prisma.session.findFirst({
      where: {
        id: sessionId,
        userId,
        revokedAt: null,
      },
    });

    if (!session) {
      return res.status(404).json({
        error: { message: 'Session not found' }
      });
    }

    await prisma.session.update({
      where: { id: sessionId },
      data: { revokedAt: new Date() },
    });

    res.json({ message: 'Session revoked successfully' });
  } catch (error) {
    console.error('Error revoking session:', error);
    res.status(500).json({ error: { message: 'Failed to revoke session' } });
  }
};

export const revokeAllSessions = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: { message: 'Unauthorized' } });
    }
    
    const currentSessionId = (req as any).locals?.sessionId || null;

    // Revoke all sessions except current one
    await prisma.session.updateMany({
      where: {
        userId,
        ...(currentSessionId ? { id: { not: currentSessionId } } : {}),
        revokedAt: null,
      },
      data: {
        revokedAt: new Date(),
      },
    });

    res.json({ message: 'All other sessions revoked successfully' });
  } catch (error) {
    console.error('Error revoking all sessions:', error);
    res.status(500).json({ error: { message: 'Failed to revoke sessions' } });
  }
};