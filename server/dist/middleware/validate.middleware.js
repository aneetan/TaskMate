"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const zod_1 = require("zod");
const validateSchema = (schema) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params
        });
        next();
    }
    catch (e) {
        if (e instanceof zod_1.ZodError) {
            return res.status(400).json({
                errors: e.issues.map(err => ({
                    path: err.path.join('.'),
                    message: err.message
                }))
            });
        }
        ;
        next(e);
    }
});
exports.validateSchema = validateSchema;
