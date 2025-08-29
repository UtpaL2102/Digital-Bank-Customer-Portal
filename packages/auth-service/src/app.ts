import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { errorHandler } from '@common/errors';

const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.WEB_ORIGIN, credentials: true }));
app.use(express.json());

// TODO: Add routes
// app.use('/auth', ...)
// app.use('/kyc', ...)
// app.use('/notification-prefs', ...)
// app.use('/healthz', ...)

app.use(errorHandler);

export { app };
