import { Request, Response } from "express";
import { TransferBody, TransferBodyT } from "../schemas/transfer.schema";
import { performTransfer, TransferError } from "../services/transfers.service";

export const createTransfer = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const bodyParsed = TransferBody.safeParse(req.body);
    if (!bodyParsed.success) return res.status(400).json({ error: bodyParsed.error.format() });

    const idempotencyKey = req.header("Idempotency-Key") || null;

    const txn = await performTransfer({ userId, body: bodyParsed.data, idempotencyKey });
    return res.status(201).json({ transaction: txn });
  } catch (err: any) {
    if (err instanceof TransferError) {
      if (err.code === "INSUFFICIENT_FUNDS") return res.status(402).json({ error: err.message });
      if (err.code === "FORBIDDEN") return res.status(403).json({ error: err.message });
      if (err.code === "IN_PROGRESS") return res.status(409).json({ error: err.message });
      return res.status(400).json({ error: err.message });
    }
    console.error("createTransfer error:", err);
    return res.status(500).json({ error: "Failed to create transfer" });
  }
};