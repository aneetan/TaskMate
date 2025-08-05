import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './config/dbconfig';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

connectToDatabase();


app.get('/api', (req, res) => {
    res.status(200).json({message: "Hello from TS + React+ JS"})
})

app.listen(port, () => console.log(`Server started at http://localhost:${port}`))   