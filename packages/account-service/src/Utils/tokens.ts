// utils/token.ts
import { SignJWT, jwtVerify } from "jose";

// Secret for signing download tokens
const DOWNLOAD_SECRET = new TextEncoder().encode(
  process.env.DOWNLOAD_TOKEN_SECRET || "replace_in_prod"
);

/**
 * Create a short-lived JWT token for downloading a statement
 * @param statementId - ID of the statement
 * @param userId - ID of the user
 * @param expiresSeconds - Expiry in seconds (default 300s = 5min)
 */
export async function createDownloadToken(
  statementId: string,
  userId: string,
  expiresSeconds = 300
): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  return await new SignJWT({ sid: statementId, sub: userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt(now)
    .setExpirationTime(now + expiresSeconds)
    .sign(DOWNLOAD_SECRET);
}

/**
 * Verify and decode a download token
 */
export async function verifyDownloadToken(token: string): Promise<any> {
  const { payload } = await jwtVerify(token, DOWNLOAD_SECRET, {
    algorithms: ["HS256"],
  });
  return payload;
}
