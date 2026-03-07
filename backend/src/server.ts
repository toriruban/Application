import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './modules/auth/auth.router';
import eventsRouter from './modules/events/events.router';
import usersRouter from './modules/users/users.router';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/events', eventsRouter);
app.use('/users', usersRouter);


app.get('/', (req,res) => {
    res.json({message: '✅ Server is running'})
});
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`)
});