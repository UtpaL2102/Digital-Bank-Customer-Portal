import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL,
  jwtAudience: process.env.JWT_AUDIENCE,
  jwtIssuer: process.env.JWT_ISSUER,
  jwksUri: process.env.JWKS_URI,
  webOrigin: process.env.WEB_ORIGIN,
  serviceUrls: {
    auth: process.env.AUTH_SERVICE_URL,
    account: process.env.ACCOUNT_SERVICE_URL,
    chatbot: process.env.CHATBOT_SERVICE_URL,
  },
};
