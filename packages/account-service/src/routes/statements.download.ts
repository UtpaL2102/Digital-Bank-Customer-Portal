// packages/account-service/src/routes/statements.download.ts
import { Router } from "express";
import fetch from "node-fetch"; // or global fetch for Node 18+
import { prisma } from "../db/prismaClient";
import { requireAuth } from "../middlewares/auth.middleware";
import { createDownloadToken, verifyDownloadToken } from "../Utils/tokens"; // adjust path/casing as needed
import { createSignedCloudinaryUrl } from "../Utils/cloudinarySigned";


const router = Router();

/**
 * Issue a short-lived download token.
 * Protected by requireAuth so req.user exists.
 */
router.get("/api/v1/statements/:id/signed-url", async (req, res) => {
  try {
    const token = (req.query.token as string) || (req.headers["x-download-token"] as string);
    if (!token) return res.status(401).json({ error: "Missing token" });

    const payload = await verifyDownloadToken(token);
    const sid = (payload as any).sid;
    const sub = (payload as any).sub;
    if (sid !== req.params.id) return res.status(403).json({ error: "Token does not match resource" });

    const stmt = await prisma.statement.findUnique({ where: { id: req.params.id } });
    if (!stmt) return res.status(404).json({ error: "Not found" });
    if (stmt.user_id !== sub) return res.status(403).json({ error: "Forbidden" });
    if (!stmt.file_url) return res.status(404).json({ error: "File not ready" });

    // Derive publicId from your stored file_url or store public_id separately in DB for reliability.
    // If you stored the public_id in DB, use that. Here we assume publicId == statements/<id>.
    const publicId = `${process.env.STATEMENT_CLOUDINARY_FOLDER || "statements"}/${stmt.id}`;

    const signedUrl = createSignedCloudinaryUrl(publicId, 300);
    return res.json({ signed_url: signedUrl, expires_in: 300 });
  } catch (err) {
    console.error("signed-url error", err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
});

router.post(
  "/api/v1/statements/:id/download-token",
  requireAuth,
  async (req, res) => {
    try {
      const userId = (req as any).user?.id;
      const id = req.params.id;
      const stmt = await prisma.statement.findUnique({ where: { id } });
      if (!stmt) return res.status(404).json({ error: "Not found" });
      if (stmt.user_id !== userId) return res.status(403).json({ error: "Forbidden" });

      const token = await createDownloadToken(id, userId, 300); // 5 minutes
      return res.json({ token, expires_in: 300 });
    } catch (err) {
      console.error("download-token error", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);

/**
 * Stream the statement file using a short-lived token.
 * This route may be called without standard session auth because it verifies the token,
 * but we keep it simple: token in ?token= or X-Download-Token header.
 */
router.get("/api/v1/statements/:id/download", async (req, res) => {
  const token = (req.query.token as string) || (req.headers["x-download-token"] as string);
  if (!token) return res.status(401).send("Missing token");

  try {
    const payload = await verifyDownloadToken(token);
    const sid = (payload as any).sid;
    const sub = (payload as any).sub;
    if (sid !== req.params.id) return res.status(403).send("Token does not match resource");

    // ownership check (defense-in-depth)
    const stmt = await prisma.statement.findUnique({ where: { id: req.params.id } });
    if (!stmt) return res.status(404).send("Not found");
    if (stmt.user_id !== sub) return res.status(403).send("Forbidden");

    // stream the file from Cloudinary (stmt.file_url expected)
    if (!stmt.file_url) return res.status(404).send("File not ready");

    const upstream = await fetch(stmt.file_url);
    if (!upstream.ok) {
      console.error("upstream fetch failed", upstream.status, await upstream.text().catch(()=>"<no-body>"));
      return res.status(502).send("Failed to fetch file");
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="statement-${stmt.id}.pdf"`);
    (upstream.body as any).pipe(res);
  } catch (err) {
    console.error("download verify/stream error", err);
    return res.status(401).send("Invalid or expired token");
  }
});

export default router;
