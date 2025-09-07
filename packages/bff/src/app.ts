import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { requestId } from '../../common/src/requestId.js';
import { errorHandler } from '../../common/src/errors.js';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';   // ✅ add this
import authBffRouter from "./routes/auth.bff.routes.js";

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
// app.use('/api/v1/accounts', ...)
// app.use('/api/v1/transfers', ...)
// app.use('/api/v1/limits', ...)
// app.use('/api/v1/notifications', ...)

app.use(errorHandler);

export { app };
