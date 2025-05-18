import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import NoteRoutes from './routes/NoteRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Konfigurasi CORS agar mendukung kredensial (cookies) dan frontend tertentu
app.use(
  cors({
    origin: [
      'https://fe-rafif-dot-f-10-pt-misbahudin.uc.r.appspot.com',
      // Tambahkan origin lain jika diperlukan
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Middleware untuk parsing cookie
app.use(cookieParser());

// Middleware untuk parsing body JSON
app.use(express.json());

// Routing
app.use(NoteRoutes);

// Endpoint pengecekan server
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
