import { Request, Response } from "express";
import { prisma } from "../db/prismaClient";

export const getNotificationPreferences = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: { message: "Unauthorized" } });
    }

    const prefs = await prisma.notificationPrefs.findUnique({
      where: { user_id: userId },
    });

    if (!prefs) {
      // Create default preferences if none exist
      const defaultPrefs = await prisma.notificationPrefs.create({
        data: {
          user_id: userId,
          email_enabled: true,
          sms_enabled: false,
          in_app_enabled: true,
          transactions: true,
          low_balance: true,
          security: true,
          low_balance_threshold: 100,
        },
      });
      return res.json(defaultPrefs);
    }

    res.json(prefs);
  } catch (error) {
    console.error("Error getting notification preferences:", error);
    res.status(500).json({ error: { message: "Failed to get notification preferences" } });
  }
};

export const updateNotificationPreferences = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: { message: "Unauthorized" } });
    }

    const {
      email_enabled,
      sms_enabled,
      in_app_enabled,
      transactions,
      low_balance,
      security,
      low_balance_threshold,
    } = req.body;

    // Validate at least one notification channel is enabled if any alert is enabled
    const hasEnabledAlerts = transactions || low_balance || security;
    const hasEnabledChannel = email_enabled || sms_enabled || in_app_enabled;

    if (hasEnabledAlerts && !hasEnabledChannel) {
      return res.status(400).json({
        error: { message: "At least one notification channel must be enabled if alerts are enabled" }
      });
    }

    // Validate low balance threshold is positive if low balance alerts are enabled
    if (low_balance && (!low_balance_threshold || low_balance_threshold <= 0)) {
      return res.status(400).json({
        error: { message: "Low balance threshold must be positive when low balance alerts are enabled" }
      });
    }

    const updatedPrefs = await prisma.notificationPrefs.upsert({
      where: { user_id: userId },
      create: {
        user_id: userId,
        email_enabled,
        sms_enabled,
        in_app_enabled,
        transactions,
        low_balance,
        security,
        low_balance_threshold,
      },
      update: {
        email_enabled,
        sms_enabled,
        in_app_enabled,
        transactions,
        low_balance,
        security,
        low_balance_threshold,
      },
    });

    res.json(updatedPrefs);
  } catch (error) {
    console.error("Error updating notification preferences:", error);
    res.status(500).json({ error: { message: "Failed to update notification preferences" } });
  }
};