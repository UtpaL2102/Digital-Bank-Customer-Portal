import multer from "multer";
import { Request } from "express";

const MAX_BYTES = Number(process.env.MAX_UPLOAD_BYTES || 1_000_000);

const allowedByKind: Record<string, string[]> = {
id_front: ["image/jpeg", "image/png"],
id_back: ["image/jpeg", "image/png"],
selfie: ["image/jpeg", "image/png"],
address_proof: ["image/jpeg", "image/png", "application/pdf"],
};

export const uploadKyc = multer({
storage: multer.memoryStorage(),
limits: { fileSize: MAX_BYTES },
fileFilter: (req: Request, file, cb) => {
const kind = (req.body?.doc_kind || "").toString();
const allowed = allowedByKind[kind];
if (!allowed) return cb(new Error("INVALID_DOC_KIND"));
if (!allowed.includes(file.mimetype)) return cb(new Error("UNSUPPORTED_FILE_TYPE"));
cb(null, true);
},
});