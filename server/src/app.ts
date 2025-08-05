import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './config/dbconfig';
import userRouter from './routes/user.route';
import swaggerUi from "swagger-ui-express";
import swaggerSpec from './config/swagger';

const app = express();
const PORT = 3000;

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Middleware
app.use(cors());
app.use(express.json());


connectToDatabase()
    .then(() => {
        //routes
        app.use('/api/users', userRouter);

        app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`))  
    })
    .catch((e) => {
        console.log("Failed to initialize application", e);
    })

 