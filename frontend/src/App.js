import { BrowserRouter, Routes, Route } from "react-router-dom";

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
