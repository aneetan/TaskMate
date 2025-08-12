"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = exports.HttpError = void 0;
class HttpError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
    }
}
exports.HttpError = HttpError;
class BadRequestError extends HttpError {
    constructor(message) {
        super(400, message);
    }
}
exports.BadRequestError = BadRequestError;
