import { Request, Response } from "express";
import { prisma } from "../db/prismaClient";
import { CreateScheduledTransfer, UpdateScheduledTransfer } from "../schemas/scheduledTransfer.schema";

export const listScheduled = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  if (!userId) return res.status(401).json({ error: "Unauthorized" });
  const items = await prisma.scheduledTransfer.findMany({ where: { user_id: userId }, orderBy: { next_run_at: "asc" }});
  return res.json({ scheduled: items });
};

export const createScheduled = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  const parsed = CreateScheduledTransfer.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.format() });

  const data = parsed.data;
  // verify ownership of from_account
  const acct = await prisma.account.findUnique({ where: { id: data.from_account_id }});
  if (!acct || acct.user_id !== userId) return res.status(403).json({ error: "Forbidden" });

  const s = await prisma.scheduledTransfer.create({
    data: {
      user_id: userId,
      from_account_id: data.from_account_id,
      to_account_id: data.to_account_id,
      to_beneficiary_id: data.to_beneficiary_id,
      amount: data.amount,
      description: data.description,
      frequency: data.frequency || "monthly",
      next_run_at: new Date(data.next_run_at),
      end_date: data.end_date ? new Date(data.end_date) : null,
      occurrences_left: data.occurrences_left ?? null,
      status: "active",
    },
  });

  return res.status(201).json({ scheduled: s });
};

export const updateScheduled = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  const id = req.params.id;
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  const parsed = UpdateScheduledTransfer.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.format() });

  const s = await prisma.scheduledTransfer.findUnique({ where: { id }});
  if (!s) return res.status(404).json({ error: "Not found" });
  if (s.user_id !== userId) return res.status(403).json({ error: "Forbidden" });

  const updateData: any = {};
  if (parsed.data.amount) updateData.amount = parsed.data.amount;
  if (parsed.data.frequency) updateData.frequency = parsed.data.frequency;
  if (parsed.data.next_run_at) updateData.next_run_at = new Date(parsed.data.next_run_at);
  if (parsed.data.status) updateData.status = parsed.data.status;

  const updated = await prisma.scheduledTransfer.update({ where: { id }, data: updateData });
  return res.json({ scheduled: updated });
};

export const pauseScheduled = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  const id = req.params.id;
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  const s = await prisma.scheduledTransfer.findUnique({ where: { id }});
  if (!s) return res.status(404).json({ error: "Not found" });
  if (s.user_id !== userId) return res.status(403).json({ error: "Forbidden" });

  const updated = await prisma.scheduledTransfer.update({ where: { id }, data: { status: "paused" }});
  return res.json({ scheduled: updated });
};

export const resumeScheduled = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  const id = req.params.id;
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  const s = await prisma.scheduledTransfer.findUnique({ where: { id }});
  if (!s) return res.status(404).json({ error: "Not found" });
  if (s.user_id !== userId) return res.status(403).json({ error: "Forbidden" });

  // compute next_run_at if missing — keep existing if present
  const nextRun = s.next_run_at || new Date();
  const updated = await prisma.scheduledTransfer.update({ where: { id }, data: { status: "active", next_run_at: nextRun }});
  return res.json({ scheduled: updated });
};

export const cancelScheduled = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  const id = req.params.id;
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  const s = await prisma.scheduledTransfer.findUnique({ where: { id }});
  if (!s) return res.status(404).json({ error: "Not found" });
  if (s.user_id !== userId) return res.status(403).json({ error: "Forbidden" });

  // Return existing entity if already cancelled (idempotent)
  if (s.status === "cancelled") {
    return res.json({ scheduled: s });
  }

  const updated = await prisma.scheduledTransfer.update({ where: { id }, data: { status: "cancelled" }});
  return res.json({ scheduled: updated });
};
