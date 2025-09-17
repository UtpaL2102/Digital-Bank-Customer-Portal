import multer from "multer";
import { Request } from "express";

const MAX_BYTES = Number(process.env.MAX_UPLOAD_BYTES || 10 * 1024 * 1024);

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
 console.log('fileFilter: doc_kind from req.body =', req.body?.doc_kind, 'file.mimetype=', file.mimetype);
const allowed = allowedByKind[kind];
// If doc_kind not yet parsed (common if file is first) return true,
  // let controller validate after multer stored the file in memory.
  if (!kind) {
    // accept file upload for now, controller will validate doc_kind
    return cb(null, true);
  }
if (!allowed) {
    const err = new Error("INVALID_DOC_KIND");
    // attach info
    (err as any).code = 'INVALID_DOC_KIND';
    return cb(err);
  }
  if (!allowed.includes(file.mimetype)) {
    const err = new Error("UNSUPPORTED_FILE_TYPE");
    (err as any).code = 'UNSUPPORTED_FILE_TYPE';
    return cb(err);
  }
  cb(null, true);
cb(null, true);
},
});