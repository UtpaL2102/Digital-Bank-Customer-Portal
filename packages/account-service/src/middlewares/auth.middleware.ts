// packages/account-service/src/middlewares/auth.middleware.ts
import type { Request, Response, NextFunction } from "express";
import { jwtVerify, createRemoteJWKSet, importJWK, importPKCS8, importSPKI, KeyLike, JWTPayload } from "jose";
import { URL } from "url";

declare module "express" {
  interface Request {
    user?: { id: string; role?: string; status?: string; [k: string]: any };
  }
}

let verifier: {
  // dynamic verify function using jose
  verify: (token: string) => Promise<{ payload: JWTPayload; protectedHeader: Record<string, any> }>;
} | null = null;

function buildVerifier() {
  // 1) JWKS (remote)
  const jwksUrl = process.env.AUTH_JWKS_URL || process.env.AUTH_JWKS_URI || process.env.JWKS_URL;
  if (jwksUrl) {
    const jwks = createRemoteJWKSet(new URL(jwksUrl));
    return {
      verify: async (token: string) => {
        const { payload, protectedHeader } = await jwtVerify(token, jwks, {
          issuer: process.env.AUTH_ISS,
          audience: process.env.AUTH_AUD,
        } as any);
        return { payload, protectedHeader };
      },
    };
  }

  // 2) Public key (PEM) - RS256/etc
  const pubKeyPem = process.env.ACCESS_TOKEN_PUBLIC_KEY || process.env.JWT_PUBLIC_KEY;
  if (pubKeyPem) {
    // jose accepts SPKI (public) for RS algorithms
    return {
      verify: async (token: string) => {
        const key = await importSPKI(pubKeyPem, (process.env.JWT_ALG || "RS256"));
        const { payload, protectedHeader } = await jwtVerify(token, key, {
          issuer: process.env.AUTH_ISS,
          audience: process.env.AUTH_AUD,
        } as any);
        return { payload, protectedHeader };
      },
    };
  }

  // 3) HMAC secret (HS256)
  const secret = process.env.ACCESS_TOKEN_SECRET || process.env.JWT_SECRET || process.env.AUTH_JWT_SECRET;
  if (secret) {
    return {
      verify: async (token: string) => {
        // importJWK for symmetric: construct a JWK from secret is more work; jose supports Uint8Array secret
        const key = new TextEncoder().encode(secret) as unknown as KeyLike;
        const { payload, protectedHeader } = await jwtVerify(token, key, {
          issuer: process.env.AUTH_ISS,
          audience: process.env.AUTH_AUD,
        } as any);
        return { payload, protectedHeader };
      },
    };
  }

  // No verifier configured
  return null;
}

function getVerifier() {
  if (!verifier) {
    verifier = buildVerifier();
    if (!verifier) {
      // not throwing here so app can start in dev, but middleware will deny requests
      console.warn(
        "[auth.middleware] No JWT verifier configured. Set AUTH_JWKS_URL or ACCESS_TOKEN_PUBLIC_KEY or ACCESS_TOKEN_SECRET in env.",
      );
    }
  }
  return verifier;
}

/**
 * requireAuth middleware
 * - expects Authorization: Bearer <token>
 * - verifies signature + exp + optional iss/aud
 * - attaches req.user = { id, role, ...claims }
 */
export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const auth = (req.headers.authorization || req.headers.Authorization) as string | undefined;
    if (!auth || !auth.startsWith("Bearer ")) {
      return res.status(401).json({ error: { code: "UNAUTHENTICATED", message: "Missing Authorization header" } });
    }
    const token = auth.slice(7).trim();
    if (!token) {
      return res.status(401).json({ error: { code: "UNAUTHENTICATED", message: "Missing token" } });
    }

    const v = getVerifier();
    if (!v) {
      console.error("[auth.middleware] No verifier configured - rejecting request");
      return res.status(500).json({ error: { code: "SERVER_CONFIG", message: "Auth verifier not configured" } });
    }

    const { payload } = await v.verify(token);

    // pull user id from common claims
    const userId = (payload.sub as string) || (payload.id as string) || (payload.userId as string);
    if (!userId) {
      return res.status(401).json({ error: { code: "UNAUTHENTICATED", message: "Token missing subject (sub)" } });
    }

    // Attach minimal user object for controllers
    req.user = {
      id: userId,
      role: (payload as any).role,
      status: (payload as any).status,
      ...payload,
    };

    return next();
  } catch (err: any) {
    // jose throws errors with message and code; keep logs for debug but don't leak secrets
    console.error("[auth.middleware] JWT verify error:", err?.message || err);
    return res.status(401).json({ error: { code: "UNAUTHENTICATED", message: "Invalid token" } });
  }
}
