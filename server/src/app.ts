import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './config/dbconfig';
import userRouter from './routes/user.route';

const app = express();
const port = 3000;

//Middleware
app.use(cors());
app.use(express.json());

connectToDatabase()
    .then(() => {
        //routes
        app.use('/api/users', userRouter);

        app.listen(port, () => console.log(`Server started at http://localhost:${port}`))  
    })
    .catch((e) => {
        console.log("Failed to initialize application", e);
    })

 