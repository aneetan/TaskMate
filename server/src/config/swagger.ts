import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "TaskMate API documentation",
            version: '1.0.0',
            description:"This includes API documentation for Taskmate application"
        },
        components: {
            securitySchemes: {      //defines authentication methods for API
                bearerAuth: {
                    type: 'http',       // indicates http authentication scheme
                    scheme: 'bearer',   // specifies bearer token
                    bearerFormat: "JWT"    // describe token format as JWT
                }
            }
        },
        security: [         //defines global security requirements
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

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;