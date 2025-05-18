import express from 'express';
import NoteRoutes from './routes/NoteRoutes.js';
import cors from 'cors';

const app = express();
app.use(cors({
    origin: 'https://fe-rafif-dot-f-10-pt-misbahudin.uc.r.appspot.com/',
    credentials: true
}));
app.use(express.json());
app.use(NoteRoutes);

app.listen(3000, () => {
    console.log('Server is running');
});
