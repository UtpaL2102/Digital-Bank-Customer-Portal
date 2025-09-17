// Services (business logic)
import crypto from "crypto";
import { v2 as cloudinary } from "cloudinary";
// import {PrismaClient } from "@prisma/client";
import { prisma } from '../db/prismaClient';
import { configureCloudinary, signViewUrl } from "../storage/cloudinary";
import { createNotification } from "./notification.service";
import multer from 'multer';


// const prisma = new PrismaClient();
configureCloudinary();

const MAX_SUBMITS_PER_DAY = Number(process.env.KYC_MAX_SUBMITS_PER_DAY || 3);

import { sendAuditEvent } from './audit.service';

async function audit(userId: string, action: string, details?: string) {
  await sendAuditEvent(userId, action, details);
}

export async function uploadDocument(userId: string, docKind: string, file: Express.Multer.File) {
  const hash = crypto.createHash("sha256").update(file.buffer).digest("hex");

  const folder = `${process.env.CLOUDINARY_FOLDER || "kyc"}/${userId}`;
  const resource_type = file.mimetype === "application/pdf" ? "raw" : "image";

  const result: any = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type, access_mode: "authenticated", overwrite: false },
      (err, r) => (err ? reject(err) : resolve(r))
    );
    stream.end(file.buffer);
  });

  // Save metadata
  const doc = await prisma.kycDocument.create({
    data: {
      user_id: userId,
      doc_kind: docKind,
      file_url: result.public_id,
      file_hash: hash
    }
  });

  await audit(userId, "KYC_DOC_UPLOADED", `${docKind}:${result.public_id}`);
  return { id: doc.id, public_id: result.public_id, bytes: result.bytes, format: result.format, resource_type };
}

export async function getStatus(userId: string) {
  const kd = await prisma.kycDetails.findUnique({ where: { user_id: userId } });
  return {
    status: kd?.status || "submitted",
    verification_score: kd?.verification_score || null,
    failure_reason: kd?.failure_reason || null
  };
}

export async function submitKyc(userId: string, payload: {
  document_type: string; document_number: string;
  issue_date?: string; expiry_date?: string; address_line1: string; city: string; state: string; postal_code: string; dob?: string;
}) {
  try {
    // Enforce resubmission limit (3/day)
    const since = new Date(); since.setHours(0,0,0,0);
    const count = await prisma.auditLog.count({
      where: { user_id: userId, action: "KYC_SUBMITTED", performed_at: { gte: since } }
    });
    if (count >= MAX_SUBMITS_PER_DAY) {
      throw { status: 429, code: "RESUBMISSION_LIMIT_REACHED", message: "You reached the maximum KYC submissions for today" };
    }

  // Required docs present?
  const docs = await prisma.kycDocument.findMany({ where: { user_id: userId } });
  const kinds = new Set(docs.map(d => d.doc_kind));
  if (!kinds.has("id_front") || !kinds.has("selfie")) {
    throw { status: 400, code: "KYC_INCOMPLETE", message: "Required documents missing (id_front and selfie)" };
  }

  // Upsert KycDetails and set verifying
  const issueDate = payload.issue_date ? new Date(payload.issue_date) : null;
  const expiryDate = payload.expiry_date ? new Date(payload.expiry_date) : null;

  await prisma.$transaction(async (tx) => {
    await tx.kycDetails.upsert({
      where: { user_id: userId },
      update: {
        document_type: payload.document_type,
        document_number: payload.document_number,
        issue_date: issueDate || undefined,
        expiry_date: expiryDate || undefined,
        status: "verifying",
        verified: false,
        failure_reason: null,
        verification_score: null
      },
      create: {
        user_id: userId,
        document_type: payload.document_type,
        document_number: payload.document_number,
        issue_date: issueDate || undefined,
        expiry_date: expiryDate || undefined,
        status: "verifying",
        verified: false
      }
    });

    // Also set user.status = verifying
    await tx.user.update({ where: { id: userId }, data: { status: "verifying" } });
  });

  await audit(userId, "KYC_SUBMITTED");

  // create notification for kyc updates to user
  try {
    await createNotification(userId, "kyc_submitted", "KYC submitted", "Your identity documents were received and are under review");
  } catch (e) {
    console.warn("submitKyc: createNotification failed", e);
  }
  return { status: "verifying" };
  } catch (err) {
    throw err;
  }
}


export async function listPending(limit = 50) {
  const items = await prisma.kycDetails.findMany({
    where: { status: "verifying" },
    orderBy: { created_at: "desc" },
    take: limit,
    select: {
      user_id: true,
      status: true,
      document_type: true,
      document_number: true,
      created_at: true
    }
  });
  return items;
}

export async function listAll(page = 1, pageSize = 50) {
  const skip = (page - 1) * pageSize;
  const [total, items] = await prisma.$transaction([
    prisma.kycDetails.count(),
    prisma.kycDetails.findMany({
      orderBy: { created_at: "desc" },
      take: pageSize,
      skip,
      select: {
        user_id: true,
        status: true,
        document_type: true,
        document_number: true,
        created_at: true,
        failure_reason: true,
        verification_score: true,
        user: {
          select: {
            email: true,
            name: true
          }
        }
      }
    })
  ]);
  return {
    items,
    meta: {
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize)
    }
  };
}

export async function getCase(userId: string) {
  // kyc_details + documents with signed URLs
  const kd = await prisma.kycDetails.findUnique({ where: { user_id: userId } });
  const docs = await prisma.kycDocument.findMany({ where: { user_id: userId }, orderBy: { created_at: "asc" } });
  const files = docs.map(d => ({
    id: d.id,
    doc_kind: d.doc_kind,
    public_id: d.file_url,
    view_url: signViewUrl(d.file_url, 300) // 5-min URL
  }));
  return { details: kd, documents: files };
}

export async function approve(userId: string, score?: number, note?: string) {
  // First, ensure there's a submitted KYC case for this user
  const existing = await prisma.kycDetails.findUnique({ where: { user_id: userId } });
  if (!existing) {
    // Throw an object the controller can interpret (your controllers already return errors for thrown objects)
    throw { status: 404, code: "KYC_NOT_FOUND", message: "KYC case not found for this user" };
  }
  await prisma.$transaction(async (tx) => {
    await tx.kycDetails.update({
      where: { user_id: userId },
      data: { status: "verified", verified: true, verification_score: score || 0.9, failure_reason: null }
    });
    await tx.user.update({ where: { id: userId }, data: { status: "verified" } });
  });
  await audit(userId, "KYC_APPROVED", note);
  // TODO: create notification 
  try {
    await createNotification(userId, "kyc_verified", "KYC verified", "Your KYC has been approved. Full access granted", { score });
  } catch (e) {
    console.warn("approve: createNotification failed", e);
  }
  return { status: "verified" };
}

export async function reject(userId: string, reason: string, note?: string) {
  
  const existing = await prisma.kycDetails.findUnique({ where: { user_id: userId } });
  if (!existing) throw { status: 404, code: "KYC_NOT_FOUND", message: "KYC case not found for this user" };

  await prisma.$transaction(async (tx) => {
    await tx.kycDetails.update({
      where: { user_id: userId },
      data: { status: "failed", verified: false, failure_reason: reason, verification_score: 0 }
    });
    await tx.user.update({ where: { id: userId }, data: { status: "failed" } });
  });
  await audit(userId, "KYC_REJECTED", `${reason}:${note || ""}`);
  //create notification for user about rejection
  try {
    await createNotification(userId, "kyc_failed", "KYC rejected", `Your KYC was rejected: ${reason}`, { reason, note });
  } catch (e) {
    console.warn("reject: createNotification failed", e);
  }
  return { status: "failed", reason };
}
