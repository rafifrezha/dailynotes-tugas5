import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLists from "./components/ReadNotes";
import AddNotes from "./components/AddNotes";
import EditNotes from "./components/EditNotes";

function App() {
return (
    <BrowserRouter>
        <div style={{ textAlign: "center" }}>
            <h1 className="title">Daily Notes</h1>
            <Routes>
                <Route path="/" element={<UserLists />} />
                <Route path="add" element={<AddNotes />} />
                <Route path="edit/:id" element={<EditNotes />} />
            </Routes>
        </div>
    </BrowserRouter>
);
}

export default App;