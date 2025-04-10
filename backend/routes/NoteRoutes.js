import express from 'express';
import {
    getNotes,
    createNote,
    updateNote,
    deleteNote
} from '../controllers/NoteController.js';

const router = express.Router();

router.get('/notes', getNotes);
router.get('/notes/:id', getNotes);
router.post('/createnote', createNote);
router.put('/updatenote/:id', updateNote);
router.delete('/deletenote/:id', deleteNote);

export default router;