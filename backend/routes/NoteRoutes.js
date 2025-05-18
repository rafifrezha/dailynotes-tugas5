import express from "express";
import {
    getNotes, 
    createNote,
    updateNote,
    deleteNote
} from "../controllers/NoteController.js";
import { login, register, logout } from "../controllers/UserController.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

router.get('/notes', verifyToken, getNotes);
router.post('/add-notes', verifyToken, createNote);
router.put('/update-notes/:id', verifyToken, updateNote);
router.delete('/delete-notes/:id', verifyToken, deleteNote);

router.get('/token', refreshToken);
router.post('/login', login);
router.post('/register', register);
router.get('/logout', verifyToken, logout);

export default router;