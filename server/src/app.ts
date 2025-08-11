import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './config/dbconfig';
import swaggerUi from "swagger-ui-express";
import swaggerSpec from './config/swagger';
import Redis from 'ioredis';
import authRouter from './routes/auth.route';
import taskRouter from './routes/task.route';

require('dotenv').config();
export const redis = new Redis(process.env.REDIS_URL!);

const app = express();
const PORT = 3000;

// Swagger docs
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Middleware
app.use(cors());
app.use(express.json());

connectToDatabase()
    .then(() => {
        //routes
        app.use('/api/auth', authRouter);
        app.use('/api/task', taskRouter);

        app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`))  
    })
    .catch((e) => {
        console.log("Failed to initialize application", e);
    })

 