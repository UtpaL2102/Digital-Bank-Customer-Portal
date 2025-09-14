import express from 'express';
import dotenv from "dotenv";
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { requestId } from '../../common/src/requestId.js';
import { errorHandler } from '../../common/src/errors.js';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url'; 
import authBffRouter from "./routes/auth.bff.routes.js";
import accountsBffRouter from "./routes/accounts.bff.routes.js";
import { requireAuth, requireKycVerified } from "./middlewares/auth.middleware.js";
import kycBffRouter from "./routes/kyc.bff.routes.js";
import transactionsBffRouter from "./routes/transactions.bff.routes.js";
import statementsBffRouter from "./routes/statements.bff.routes.js";

dotenv.config();
// ✅ emulate __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.WEB_ORIGIN, credentials: true }));
app.use(express.json());
app.use(requestId);
app.use(rateLimit({ windowMs: 60000, max: 100 }));

// Healthz endpoint
app.get('/api/v1/healthz', (req, res) => {
	res.json({ status: 'ok' });
});

// Swagger UI for OpenAPI (dev only)
if (process.env.NODE_ENV !== 'production') {
	const openApiPath = path.join(__dirname, '../openapi/bff-openapi.yaml');
	const openApiSpec = fs.readFileSync(openApiPath, 'utf8');
	app.use('/docs', swaggerUi.serve, swaggerUi.setup(null, {
		swaggerOptions: {
			url: '/openapi/bff-openapi.yaml',
		},
		customSiteTitle: 'Digital Bank BFF API Docs',
	}));
	app.get('/openapi/bff-openapi.yaml', (req, res) => {
		res.type('yaml').send(openApiSpec);
	});
}

// TODO: Add routes
app.use(authBffRouter);

// Everything below requires a valid token
app.use(requireAuth);

// KYC endpoints allowed pre-verified
app.use(kycBffRouter);

// Banking endpoints (require verified KYC)
app.use(requireKycVerified, accountsBffRouter);

app.use(transactionsBffRouter);

app.use(statementsBffRouter);

// app.use('/api/v1/accounts', ...)
// app.use('/api/v1/transfers', ...)

// app.use('/api/v1/limits', ...)
// app.use('/api/v1/notifications', ...)

app.use(errorHandler);

export { app };
