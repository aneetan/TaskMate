"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "TaskMate API documentation",
            version: '1.0.0',
            description: "This includes API documentation for Taskmate application"
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http', // indicates http authentication scheme
                    scheme: 'bearer', // specifies bearer token
                    bearerFormat: "JWT" // describe token format as JWT
                }
            }
        },
        security: [
            {
                bearerAuth: [] // all routes require bearerAuth security unless overridden locally
            }
        ],
        servers: [
            {
                url: "http://localhost:3000",
                description: "Development server"
            },
            //production/ staging server here
        ],
    },
    apis: ['./src/routes/*.ts', './src/schemas/*.ts'] //where swagger-jsdoc will scan for JSDoc comments to generate the documentation
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.default = swaggerSpec;
