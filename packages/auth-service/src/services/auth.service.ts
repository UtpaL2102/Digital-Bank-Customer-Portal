import { SignJWT, jwtVerify } from "jose";
import crypto from "crypto";

export const secret = () => new TextEncoder().encode(process.env.AUTH_JWT_SECRET || "dev_super_secret_change_me");
export const issuer = process.env.JWT_ISSUER || "digital-bank-auth";
export const audience = process.env.JWT_AUDIENCE || "digitalbank";
const accessTtl = process.env.ACCESS_TOKEN_TTL || "900s";
const refreshTtl = process.env.REFRESH_TOKEN_TTL || "7d";

let rawTempLoginTtl = process.env.TEMP_LOGIN_TOKEN_TTL || process.env.TEMP_LOGIN_TOKEN_TTL_SECONDS || "300s";

export async function signAccessToken(user: { id: string; role?: string; status?: string }) {
return await new SignJWT({ role: user.role || "user", status: user.status || "verified" })
.setProtectedHeader({ alg: "HS256" })
.setSubject(user.id)
.setIssuer(issuer)
.setAudience(audience)
.setIssuedAt()
.setExpirationTime(accessTtl)
.sign(secret());
}

export async function signRefreshToken(user: { id: string }) {
return await new SignJWT({ kind: "refresh" })
.setProtectedHeader({ alg: "HS256" })
.setSubject(user.id)
.setIssuer(issuer)
.setAudience(audience)
.setIssuedAt()
.setExpirationTime(refreshTtl)
.sign(secret());
}

function normalizeTtl(raw: string): string {
  if (!raw || typeof raw !== "string") return "300s";
  const trimmed = raw.trim();
  // If it's only digits, treat as seconds
  if (/^\d+$/.test(trimmed)) return `${trimmed}s`;
  // If it already ends with s/m/h/d, accept it
  if (/^\d+[smhd]$/.test(trimmed)) return trimmed;
  // If it's a longer format like "300s" or "15m" it's fine
  return trimmed;
}
const TEMP_LOGIN_TTL = normalizeTtl(rawTempLoginTtl);

export async function signTempLoginToken(user: { id: string }) {
  // Use TEMP_LOGIN_TTL which is normalized; jose will accept strings like "300s" or "5m"
  return await new SignJWT({ temp_login: true })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuer(issuer)
    .setAudience(audience)
    .setIssuedAt()
    .setExpirationTime(TEMP_LOGIN_TTL)
    .sign(secret());
}

export async function verifyTempLoginToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret(), { issuer, audience });
    if (!payload || (payload as any).temp_login !== true) return null;
    return payload as any;
  } catch (err) {
    return null;
  }
}
export function hashToken(token: string) {
return crypto.createHash("sha256").update(token).digest("hex");
}