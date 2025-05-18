import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import NoteRoutes from './routes/NoteRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Configure CORS for credentials
app.use(cors({
    origin: [
        'https://fe-rafif-dot-f-10-pt-misbahudin.uc.r.appspot.com/'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse cookies
app.use(cookieParser());

// Parse JSON bodies
app.use(express.json());

// Use routes
app.use(NoteRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Server is running' });
});

app.listen(3000, () => console.log('Server running on port 3000'));
