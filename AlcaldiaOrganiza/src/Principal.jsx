
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";

function Principal() {
    return (
        <>
            <div>
                <h1>Bienvenido al inicio</h1>
                <span><Link to="/login">Iniciar sesión</Link></span>

                <Link to="/login">crear cuenta</Link>

                

                
            </div>

            
        </>
    );
}

export default Principal;
