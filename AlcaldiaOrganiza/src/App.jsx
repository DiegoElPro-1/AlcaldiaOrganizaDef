import { Routes, Route } from "react-router-dom";
import Principal from "./Principal";
import Login from "./Login";
import Registro from "./Registro";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Principal />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/registro" element={<Registro />} />
        </Routes>
    );
}

export default App;