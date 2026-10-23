import { Routes, Route, Navigate } from "react-router-dom";
import Principal from "./Principal";
import Login from "./Login";
import Registro from "./Registro";
import Dashboard from "./Dashboard";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Principal />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* por si algún botón viejo todavía apunta a /principal */}
            <Route path="/principal" element={<Navigate to="/dashboard" replace />} />
            {/* cualquier dirección que no exista vuelve al inicio */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default App;