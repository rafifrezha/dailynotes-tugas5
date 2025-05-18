import express from 'express';
import NoteRoutes from './routes/NoteRoutes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors({
    origin: 'https://fe-rafif-dot-f-10-pt-misbahudin.uc.r.appspot.com/',
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(NoteRoutes);

app.listen(3000, () => {
    console.log('Server is running');
});
