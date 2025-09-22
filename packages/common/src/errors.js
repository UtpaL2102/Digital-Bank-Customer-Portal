"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
exports.errorHandler = errorHandler;
class AppError extends Error {
    constructor(code, message, details, requestId) {
        super(message);
        this.code = code;
        this.details = details;
        this.requestId = requestId;
    }
}
exports.AppError = AppError;
function errorHandler(err, req, res, next) {
    const requestId = req.requestId || req.headers['x-request-id'];
    res.status(err.status || 500).json({
        error: {
            code: err.code || 'INTERNAL_ERROR',
            message: err.message,
            details: err.details,
            requestId,
        },
    });
}
//# sourceMappingURL=errors.js.map