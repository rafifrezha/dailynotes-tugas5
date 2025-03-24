import express from 'express';
import NoteRoutes from './routes/NoteRoutes.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use(NoteRoutes);

app.listen(5000, () => {
    console.log('Server is running');
});
