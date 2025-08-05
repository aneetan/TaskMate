import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "TaskMate API documentation",
            version: '1.0.0',
            description:"API documentation for PERN stack app"
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: "JWT"
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ],
        servers: [
            {
                url: "http://localhost:5000",
                description: "Development server" 
            },
            //add production server here
        ],
    },
    apis: ['./src/routes/*.ts', './src/schemas/*.ts']
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;