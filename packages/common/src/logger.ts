import pino from 'pino';

const isDev = process.env.NODE_ENV !== 'production';
export const logger = pino.default({
  transport: isDev ? {
    target: 'pino-pretty',
    options: { colorize: true },
  } : undefined,
});
