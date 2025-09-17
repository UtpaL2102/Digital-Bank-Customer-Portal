import { Request, Response } from "express";
import * as svc from "../services/kyc.service";
import { KycDocUploadSchema, KycSubmitSchema, AdminApproveSchema, AdminRejectSchema } from "../schemas/kyc.schemas";

export async function uploadDocument(req: Request, res: Response) {
  try {
    const userId = (req as any).user?.id as string;
    console.log('uploadDocument called, userId=', userId, 'body=', req.body);
    const { doc_kind } = KycDocUploadSchema.parse(req.body);
    const file = (req as any).file;
    if (!file) {
      console.error('No file in request', req.body);
      return res.status(400).json({ error: { code: "NO_FILE", message: "File is required" } });
    }
    const doc = await svc.uploadDocument(userId, doc_kind, file);
    res.status(201).json({ id: doc.id, public_id: doc.public_id });
  } catch (err: any) {
    console.error('uploadDocument error:', err);
    if (err?.name === 'ZodError') {
      return res.status(400).json({ error: { code: 'INVALID_PAYLOAD', message: err.message }});
    }
    res.status(500).json({ error: { code: err.code || 'INTERNAL_ERROR', message: err.message || 'Unexpected' }});
  }
}


export async function submit(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id as string;
    const body = KycSubmitSchema.parse(req.body);
    const r = await svc.submitKyc(userId, body);
    res.json(r);
  } catch (err: any) {
    console.error('KYC Submit Error:', err);
    if (err?.status) {
      return res.status(err.status).json({ 
        error: { 
          code: err.code || "ERROR", 
          message: err.message 
        } 
      });
    }
    res.status(500).json({ 
      error: { 
        code: "INTERNAL_ERROR", 
        message: "An unexpected error occurred while processing your KYC submission" 
      } 
    });
  }
}

export async function status(req: Request, res: Response) {
const userId = (req as any).user.id as string;
const s = await svc.getStatus(userId);
res.json(s);
}

// Admin/Reviewer
export async function listPending(req: Request, res: Response) {
const limit = Number(req.query.limit || 50);
const items = await svc.listPending(limit);
res.json({ items, total: items.length });
}

export async function getCase(req: Request, res: Response) {
const { userId } = req.params;
const c = await svc.getCase(userId);
res.json(c);
}

export async function approve(req: Request, res: Response) {
    try {
        const { userId } = req.params;
        const { score, note } = AdminApproveSchema.parse(req.body);
        const r = await svc.approve(userId, score, note);
        res.json(r);
    } catch (err: any) {
        if (err?.status) return res.status(err.status).json({ error: { code: err.code || "ERROR", message: err.message } });
        console.error(err);
        res.status(500).json({ error: { code: "INTERNAL_ERROR", message: "Unexpected error" } });
    }
}

export async function reject(req: Request, res: Response) {
    try {
    const { userId } = req.params;
    const { reason, note } = AdminRejectSchema.parse(req.body);
    const r = await svc.reject(userId, reason, note);
    res.json(r);
  } catch (err: any) {
    if (err?.status) return res.status(err.status).json({ error: { code: err.code || "ERROR", message: err.message } });
    console.error(err);
    res.status(500).json({ error: { code: "INTERNAL_ERROR", message: "Unexpected error" } });
  }
}