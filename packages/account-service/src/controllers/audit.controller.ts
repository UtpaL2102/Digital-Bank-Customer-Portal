import { Request, Response } from "express";
import { prisma } from "../db/prismaClient";

/**
 * POST /api/v1/admin/audit-events
 * Internal endpoint for services to send audit events
 */
export const createAuditEvent = async (req: Request, res: Response) => {
  try {
    const serviceName = req.headers['x-service-name'];
    if (!serviceName) {
      return res.status(400).json({ error: 'Missing X-Service-Name header' });
    }

    const { user_id, action, details, performed_at } = req.body;
    if (!user_id || !action) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    console.log('Received audit event:', {
      service: serviceName,
      userId: user_id,
      action,
      details,
      timestamp: performed_at
    });

    const event = await prisma.auditLog.create({
      data: {
        user_id,
        action: `${serviceName}:${action}`,
        details,
        performed_at: performed_at ? new Date(performed_at) : new Date(),
      },
    });

    console.log('Created audit event:', {
      id: event.id,
      action: event.action,
      userId: event.user_id,
      timestamp: event.performed_at
    });

    res.status(201).json(event);
  } catch (err) {
    console.error('createAuditEvent error:', {
      error: err,
      request: {
        headers: req.headers,
        body: req.body
      }
    });
    res.status(500).json({ error: 'Failed to create audit event' });
  }
};