import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
    res.status(200).json({message: "Hello from TS + React+ JS"})
})

app.listen(port, () => console.log(`Server started at http://localhost:${port}`))   