import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './modules/auth/auth.router';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);




app.get('/', (req,res) => {
    res.json({message: '✅ Server is running'})
});
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`)
});