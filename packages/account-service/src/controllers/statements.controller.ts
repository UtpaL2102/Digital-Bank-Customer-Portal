// packages/account-service/src/controllers/statements.controller.ts
import { Request, Response } from "express";
import { prisma } from "../db/prismaClient";
import PDFDocument from "pdfkit";
import cloudinary from "cloudinary";
import { UploadApiOptions } from 'cloudinary';

// Configure cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryUpload {
  version: number;
  public_id: string;
  secure_url: string;
  url: string;
  // add any other properties that are present in the CloudinaryUpload object
}

/** Upload a Buffer to Cloudinary (returns upload result) */
// uploadBufferToCloudinary: returns the final URL we will store (with .pdf)
async function uploadBufferToCloudinaryPdf(buffer: Buffer, publicIdBase: string) {
  return new Promise<any>((resolve, reject) => {
    const opts: UploadApiOptions = {
      resource_type: "raw",                // ensure Cloudinary treats it as raw binary (PDF)
      public_id: `${publicIdBase}`,        // public id (no extension)
      folder: process.env.STATEMENT_CLOUDINARY_FOLDER || "statements",
      overwrite: true,
      format: "pdf",                       // hint Cloudinary the format
    };

    const uploadStream = cloudinary.v2.uploader.upload_stream(opts, (error, result) => {
      if (error) return reject(error);
      try {
        // prefer secure_url
        const secure = (result && (result as any).secure_url) || (result && (result as any).url);
        // ensure .pdf suffix (Cloudinary usually includes it for raw+format)
        const fileUrl = secure && secure.endsWith(".pdf") ? secure : `${secure}.pdf`;
        resolve({ result, fileUrl });
      } catch (err) {
        resolve({ result, fileUrl: (result as any)?.secure_url || (result as any)?.url });
      }
    });

    uploadStream.end(buffer);
  });
}




/** Create a simple PDF Buffer from transactions and metadata */
async function createStatementPdfBuffer({
  account,
  statement,
  transactions,
}: {
  account: any;
  statement: any;
  transactions: any[];
}): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: "A4", margin: 50 });
      const chunks: any[] = [];

      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", (err) => reject(err));

      // Header
      doc.fontSize(18).text("Digital Bank", { align: "left" });
      doc.moveDown(0.25);
      doc.fontSize(12).text(`Statement ID: ${statement.id}`, { align: "left" });
      doc.text(`Account: ${account.account_number} (${account.account_type})`, { align: "left" });
      doc.text(`Date range: ${new Date(statement.date_from).toLocaleDateString()} - ${new Date(statement.date_to).toLocaleDateString()}`);
      doc.moveDown(0.5);

      // Table header
      doc.fontSize(11);
      doc.text("Date", 50, doc.y, { width: 100 });
      doc.text("Description", 150, doc.y - 14, { width: 240 });
      doc.text("Type", 400, doc.y - 14, { width: 60, align: "right" });
      doc.text("Amount", 470, doc.y - 14, { width: 90, align: "right" });
      doc.moveDown(0.5);
      doc.strokeColor("#aaaaaa").moveTo(50, doc.y).lineTo(540, doc.y).stroke();
      doc.moveDown(0.5);

      // Rows
      transactions.forEach((t) => {
        const dateStr = new Date(t.created_at).toLocaleDateString();
        const desc = t.description || (t.type || "").toUpperCase();
        const type = t.type || "";
        const amount = t.amount?.toString?.() ?? String(t.amount);

        doc.fontSize(10);
        doc.text(dateStr, { continued: false, width: 100 });
        doc.text(desc, 150, doc.y - 12, { width: 240 });
        doc.text(type, 400, doc.y - 12, { width: 60, align: "right" });
        doc.text(amount, 470, doc.y - 12, { width: 90, align: "right" });
        doc.moveDown(0.5);
      });

      doc.moveDown(1);
      doc.text("End of statement", { align: "center" });
      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

type CreateBody = {
  account_id: string;
  date_from: string; // ISO date e.g. "2025-07-01"
  date_to: string;   // ISO date
  format?: string;   // "PDF" default
  delivery?: string; // "download" | "email" | "both"
};

function fmtStatement(s: any) {
  return {
    id: s.id,
    user_id: s.user_id,
    account_id: s.account_id,
    date_from: s.date_from?.toISOString?.() ?? s.date_from,
    date_to: s.date_to?.toISOString?.() ?? s.date_to,
    format: s.format,
    delivery: s.delivery,
    file_url: s.file_url || null,
    status: s.status,
    created_at: s.created_at?.toISOString?.() ?? s.created_at,
  };
}

/**
 * GET /api/v1/statements?accountId=...
 */
export const listStatements = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { accountId } = req.query as any;

    const where: any = { user_id: userId };
    if (accountId) {
      // verify ownership (avoid leaking other users' statements)
      const acct = await prisma.account.findFirst({ where: { id: accountId, user_id: userId } });
      if (!acct) return res.status(403).json({ error: "Forbidden" });
      where.account_id = accountId;
    }

    const statements = await prisma.statement.findMany({
      where,
      orderBy: { created_at: "desc" },
    });

    return res.json({ statements: statements.map(fmtStatement) });
  } catch (err) {
    console.error("listStatements error:", err);
    return res.status(500).json({ error: "Failed to retrieve statements" });
  }
};

/**
 * POST /api/v1/statements
 * Body: { account_id, date_from, date_to, format, delivery }
 *
 * Behavior: create DB row with status "processing".
 * If STATEMENT_SYNC_GENERATE=true, mark completed and set a placeholder file_url (helpful for local dev).
 */
export const generateStatement = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const body = req.body as any;
    if (!body || !body.account_id || !body.date_from || !body.date_to) {
      return res.status(400).json({ error: "Missing required fields: account_id, date_from, date_to" });
    }

    const dateFrom = new Date(body.date_from);
    const dateTo = new Date(body.date_to);
    if (isNaN(dateFrom.getTime()) || isNaN(dateTo.getTime()) || dateFrom > dateTo) {
      return res.status(400).json({ error: "Invalid date range" });
    }

    // verify ownership
    const account = await prisma.account.findFirst({ where: { id: body.account_id, user_id: userId } });
    if (!account) return res.status(403).json({ error: "Forbidden" });

    const format = (body.format || "PDF").toUpperCase();
    const delivery = (body.delivery || "download").toLowerCase();

    // Create DB row with processing status
    const stmt = await prisma.statement.create({
      data: {
        user_id: userId,
        account_id: body.account_id,
        date_from: dateFrom,
        date_to: dateTo,
        format,
        delivery,
        status: "processing",
      },
    });

    // If sync generation enabled, generate PDF now and upload to Cloudinary
    if (process.env.STATEMENT_SYNC_GENERATE === "true" && format === "PDF") {
      try {
        // fetch transactions in range for the account (both from and to)
        const txns = await prisma.transaction.findMany({
          where: {
            AND: [
              { created_at: { gte: dateFrom } },
              { created_at: { lte: dateTo } },
              {
                OR: [
                  { from_account_id: body.account_id },
                  { to_account_id: body.account_id },
                ],
              },
            ],
          },
          orderBy: { created_at: "asc" },
          include: {
            fromAccount: { select: { account_number: true } },
            toAccount: { select: { account_number: true } },
            toBeneficiary: { select: { name: true } },
          },
        });

        const pdfBuffer = await createStatementPdfBuffer({
          account,
          statement: stmt,
          transactions: txns,
        });
        // debug check
        console.log("pdfBuffer length:", pdfBuffer.length);
        console.log("pdf signature:", pdfBuffer.slice(0,5).toString('utf8')); // should log "%PDF-"

        // upload to cloudinary
        const publicId = `${stmt.id}`; // you can prefix with user or account if desired
        const { result: cloudRes, fileUrl } = await uploadBufferToCloudinaryPdf(pdfBuffer, publicId);
        // store `fileUrl` in DB (guaranteed to have .pdf)
        const updated = await prisma.statement.update({
        where: { id: stmt.id },
        data: { file_url: fileUrl, status: "completed" },
        });

        // update statement with file_url and completed status
        // const updated2 = await prisma.statement.update({
        //   where: { id: stmt.id },
        //   data: { file_url: uploadResult.secure_url || uploadResult.url, status: "completed" },
        // });

        // optionally: if delivery includes email, push notification or send email here

        return res.status(201).json({ statement: {
          id: updated.id,
          user_id: updated.user_id,
          account_id: updated.account_id,
          date_from: updated.date_from,
          date_to: updated.date_to,
          format: updated.format,
          delivery: updated.delivery,
          file_url: updated.file_url,
          status: updated.status,
          created_at: updated.created_at,
        }});
      } catch (errSync) {
        console.error("[statements] sync generation failed:", errSync);
        // update statement as failed
        await prisma.statement.update({
          where: { id: stmt.id },
          data: { status: "failed" },
        });
        return res.status(500).json({ error: "Failed to generate statement", details: String(errSync) });
      }
    }

    // Typical async flow: return 202 Accepted with created statement row; a background worker will generate later
    return res.status(202).json({
      statement: {
        id: stmt.id,
        user_id: stmt.user_id,
        account_id: stmt.account_id,
        date_from: stmt.date_from,
        date_to: stmt.date_to,
        format: stmt.format,
        delivery: stmt.delivery,
        file_url: stmt.file_url,
        status: stmt.status,
        created_at: stmt.created_at,
      },
    });
  } catch (err) {
    console.error("generateStatement error:", err);
    return res.status(500).json({ error: "Failed to create statement request" });
  }
};

/**
 * GET /api/v1/statements/:statementId
 */
export const getStatement = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { statementId } = req.params;

    const s = await prisma.statement.findUnique({ where: { id: statementId } });
    if (!s) return res.status(404).json({ error: "Statement not found" });

    if (s.user_id !== userId) return res.status(403).json({ error: "Forbidden" });

    return res.json({ statement: fmtStatement(s) });
  } catch (err) {
    console.error("getStatement error:", err);
    return res.status(500).json({ error: "Failed to retrieve statement" });
  }
};