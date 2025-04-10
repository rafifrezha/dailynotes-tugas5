import React, { useState, useEffect } from 'react';  
import ReactDOM from 'react-dom/client';  
import axios from 'axios';  
import { BrowserRouter as Router, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import "bulma/css/bulma.css";  
import { BASE_URL } from "./utils";

const AddNotes = ({ onNoteAdded, currentNote, setCurrentNote }) => {  
  const [title, setTitle] = useState("");  
  const [content, setContent] = useState("");  

  useEffect(() => {  
    if (currentNote) {  
      setTitle(currentNote.title);  
      setContent(currentNote.content);  
    } else {  
      setTitle("");  
      setContent("");  
    }  
  }, [currentNote]);  

  const saveNote = async (e) => {  
    e.preventDefault();  
    try {  
      if (currentNote) {  
        const response = await axios.put(`${BASE_URL}/updatenote/${currentNote.id}`, { title, content });  
        if (response.status === 200) {  
          console.log("Note updated successfully");  
        }  
      } else {  
        const response = await axios.post(`${BASE_URL}/createnote`, { title, content });  
        if (response.status === 201) {  
          console.log("Note created successfully");  
        }  
      }  
      setTitle("");  
      setContent("");  
      setCurrentNote(null);  
      onNoteAdded();  
    } catch (error) {  
      console.error("Error saving note:", error);  
    }  
  };  

  return (  
    <div className="box has-background-dark p-5">  
      <h1 className="title has-text-centered has-text-info">  
        {currentNote ? "Edit Catatan" : "Buat Catatan Baru"}  
      </h1>  
      <form onSubmit={saveNote}>  
        <div className="field">  
          <label className="label has-text-light">Judul</label>  
          <div className="control">  
            <input  
              type="text"  
              className="input"  
              value={title}  
              onChange={(e) => setTitle(e.target.value)}  
              placeholder='Masukkan Judul'  
            />  
          </div>  
        </div>  
        <div className="field">  
          <label className="label has-text-light">Konten</label>  
          <div className="control">  
            <textarea  
              className="textarea"  
              value={content}  
              onChange={(e) => setContent(e.target.value)}  
              placeholder='Masukkan Konten'  
            />  
          </div>  
        </div>  
        <div className="field has-text-centered">  
          <button type='submit' className='button is-success'>{currentNote ? "Update" : "Simpan"}</button>  
        </div>  
      </form>  
    </div>  
  );  
};  

const UserLists = ({ onEdit, onDelete, refresh }) => {  
  const [notes, setNotes] = useState([]);  

  const fetchNotes = async () => {  
    try {  
      const response = await axios.get(`${BASE_URL}/notes`);  
      setNotes(response.data);  
    } catch (error) {  
      console.error("Error fetching notes:", error);  
    }  
  };  

  useEffect(() => {  
    fetchNotes();  
  }, [refresh]);  

  return (  
    <div className="box">  
      <h2 className="title has-text-centered has-text-info">Daftar Catatan</h2>  
      <table className="table is-fullwidth is-striped">  
        <thead>  
          <tr>  
            <th>No</th>  
            <th>Judul</th>  
            <th>Konten</th>  
            <th>Aksi</th>  
          </tr>  
        </thead>  
        <tbody>  
          {notes.map((note, index) => (  
            <tr key={note.id}>  
              <td>{index + 1}</td>  
              <td>{note.title}</td>  
              <td>{note.content}</td>  
              <td>  
                <button onClick={() => onEdit(note)} className="button is-small is-info">Edit</button>  
                <button onClick={() => onDelete(note.id)} className="button is-small is-danger">Delete</button>  
              </td>  
            </tr>  
          ))}  
        </tbody>  
      </table>  
    </div>  
  );  
};  

const App = () => {  
  const [refresh, setRefresh] = useState(false);  
  const [currentNote, setCurrentNote] = useState(null);  
  const navigate = useNavigate();

  const handleNoteAdded = () => {  
    setRefresh(!refresh);  
  };  

  const handleEdit = (note) => {  
    navigate(`/edit/${note.id}`);
  };  

  const handleDelete = async (id) => {  
    try {  
      const response = await axios.delete(`${BASE_URL}/deletenote/${id}`);  
      if (response.status === 200) {  
        console.log("Note deleted successfully");  
        setRefresh(prev => !prev);
      }  
    } catch (error) {  
      console.error("Error deleting note:", error);  
    }  
  };  

  return (  
    <div className="container">  
      <div className="text-center my-4">  
        <h1 className="display-4">Daily Notes</h1>  
      </div>  
      <div className="columns">  
        <div className="column is-half">  
          <UserLists onEdit={handleEdit} onDelete={handleDelete} refresh={refresh} />  
        </div>  
        <div className="column is-half">  
          <AddNotes onNoteAdded={handleNoteAdded} currentNote={currentNote} setCurrentNote={setCurrentNote} />  
        </div>  
      </div>  
    </div>  
  );  
};  

const EditNotes = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getNotesById(); 
  }, []);

  const UpdateNote = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${BASE_URL}/updatenote/${id}`, {
        title,
        content
      });
      navigate("/");
    } catch (error) {
      console.log(error);        
    }
  }

  const getNotesById = async () => { 
    try {
      const response = await axios.get(`${BASE_URL}/note/${id}`);
      setTitle(response.data.title);
      setContent(response.data.content);
    } catch (error) {
      console.error("Error fetching note by ID:", error);
    }
  }

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <h1 className="title has-text-centered has-text-info">Edit Catatan</h1>
        <form onSubmit={UpdateNote} className="box has-background-dark">
          <div className="field">
            <label className="label has-text-light">Judul</label>
            <div className="control">
              <input 
                type="text" 
                className="input" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder='Masukkan Judul'
              />
            </div>
          </div>
          <div className="field">
            <label className="label has-text-light">Konten</label>
            <div className="control">
              <textarea 
                className="textarea" 
                value={content} 
                onChange={(e) => setContent(e.target.value)} 
                placeholder='Masukkan Konten'
              />
            </div>
          </div>
          <div className="field">
            <button type='submit' className='button is-success'>Update</button>
          </div>
        </form>
      </div>
    </div> 
  );
}

const MainApp = () => {
  const [currentNote, setCurrentNote] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleNoteAdded = () => {
    setRefresh(!refresh);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/edit/:id" element={<EditNotes />} />
      </Routes>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));  
root.render(  
  <React.StrictMode>  
    <MainApp />  
  </React.StrictMode>  
);
