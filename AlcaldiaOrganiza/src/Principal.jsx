
import { Link } from "react-router-dom";

function Principal() {
    return (
        <div>
            <h1>Bienvenido al inicio</h1>

            <Link to="/login">Iniciar sesión</Link>

            <br />

            <Link to="/registro">Registrarse</Link>
        </div>
    );
}

export default Principal;
