"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = void 0;
const errorResponse = (e, res, customMessage) => {
    const errorMessage = e instanceof Error ? e.message : customMessage;
    res.status(400).json({ "message": errorMessage });
};
exports.errorResponse = errorResponse;
