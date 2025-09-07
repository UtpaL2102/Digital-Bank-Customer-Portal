import { SignJWT } from "jose";
import crypto from "crypto";

const secret = () => new TextEncoder().encode(process.env.AUTH_JWT_SECRET || "dev_secret");
const issuer = process.env.JWT_ISSUER || "digital-bank-auth";
const audience = process.env.JWT_AUDIENCE || "digital-bank-web";
const accessTtl = process.env.ACCESS_TOKEN_TTL || "900s";
const refreshTtl = process.env.REFRESH_TOKEN_TTL || "7d";

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

export function hashToken(token: string) {
return crypto.createHash("sha256").update(token).digest("hex");
}