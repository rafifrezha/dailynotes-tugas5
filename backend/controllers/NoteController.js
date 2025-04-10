import Note from "../models/NoteModel.js";

export const getNotes = async (req, res) => {
    try {
        if (req.params.id) {
            const note = await Note.findByPk(req.params.id);
            res.json(note);
        } else {
            const notes = await Note.findAll();
            res.json(notes);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while fetching notes' });
    }
}

export const createNote = async (req, res) => {
    try {
        await Note.create(req.body);
        res.status(200).json({ message: 'Note created successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while creating the note' });
    }
}

export const updateNote = async (req, res) => {
    try {
        await Note.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ message: 'Note updated successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while updating the note' });
    }
}

export const deleteNote = async (req, res) => {
    try {
        await Note.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while deleting the note' });
    }
}