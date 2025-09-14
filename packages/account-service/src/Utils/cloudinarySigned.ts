// packages/account-service/src/utils/cloudinarySigned.ts
import cloudinary from "cloudinary";
import crypto from "crypto";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Create a signed Cloudinary download URL for a raw/pdf resource.
 * - publicId: e.g. "statements/<id>" (NO file extension)
 * - expiresIn: seconds the signed url will be valid (default 300)
 */
export function createSignedCloudinaryUrl(publicId: string, expiresIn = 300) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("CLOUDINARY credentials not set");
  }

  // prefer official helper if available
  try {
    // @ts-ignore
    if (cloudinary.v2.utils && typeof (cloudinary.v2.utils as any).private_download_url === "function") {
      // options: { resource_type: "raw", format: "pdf", expires_at: epochSeconds }
      const opts: any = {
        resource_type: "raw",
        format: "pdf",
        expires_at: Math.floor(Date.now() / 1000) + expiresIn,
      };
      // @ts-ignore
      return (cloudinary.v2.utils as any).private_download_url(publicId, opts);
    }
  } catch (err) {
    // fall back if helper not present or fails
    console.warn("cloudinary.utils.private_download_url not available or failed, falling back to manual sign", err && (err as any).message);
  }

  // --- Fallback manual signing (works with Cloudinary signed delivery) ---
  // Build params that must be signed: public_id and timestamp
  const timestamp = Math.floor(Date.now() / 1000) + expiresIn;

  // Create string_to_sign exactly as Cloudinary expects: sorted key=val pairs joined by '&'
  // For these params it's simply "public_id=<publicId>&timestamp=<timestamp>"
  const stringToSign = `public_id=${publicId}&timestamp=${timestamp}`;
  const signature = crypto.createHash("sha1").update(stringToSign + apiSecret).digest("hex");

  // Build a download endpoint URL that Cloudinary accepts:
  // Use the API-style download endpoint which returns the file bytes:
  // https://api.cloudinary.com/v1_1/<cloudName>/image/download
  // Add resource_type=raw and format=pdf so Cloudinary returns the raw pdf resource.
  const signedUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/download?public_id=${encodeURIComponent(
    publicId,
  )}&timestamp=${timestamp}&signature=${signature}&api_key=${apiKey}&resource_type=raw&format=pdf`;

  return signedUrl;
}
