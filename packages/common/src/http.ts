import { z, ZodSchema } from 'zod';

export function zodValidate(schema: ZodSchema) {
  return (req, res, next) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      next(err);
    }
  };
}

export function paginate({ page = 1, pageSize = 20 }) {
  return {
    skip: (page - 1) * pageSize,
    take: pageSize,
  };
}
