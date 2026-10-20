import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [confirmar, setConfirmar] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const registrar = () => {
        fetch("http://localhost:4000/api/registro", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ correo, contrasena })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.error) {
                    setError(data.error);
                } else {
                    setError("");
                    navigate("/principal");
                }
            })
            .catch((err) => console.log("Error:", err));
    };

    return (
        <>
        <div className="container w-50 mx-auto py-4">
           <div className="text-center">
    <h1 className="text-center text-justify">
        Tu espacio de trabajo con IA
    </h1>
    
    <h2>crea tu cuenta en alcaldia Organiza</h2>
    
</div>

            <div>
                <p className="text-center my-3 rounded-0">correo electronico</p>
                <input
                    type="email"
                    className={"form-control w-75 mx-auto my-3 rounded-0" + (error ? " is-invalid" : "")}
                    placeholder="escribe tu direccion de correo electronico "
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                /> 
                {error && <p className="text-danger text-center w-75 mx-auto">{error}</p>}
            </div>
             <div>
                <p className="text-center my-3 rounded-0">crear contraseña</p>
                <input
                    type="password"
                    className="form-control w-75 mx-auto my-3 rounded-0"
                    placeholder="crear contraseña "
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                /> 
            </div>

             <div>
                <p className="text-center my-3 rounded-0">confirmar contraseña</p>
                <input
                    type="password"
                    className="form-control w-75 mx-auto my-3 rounded-0"
                    placeholder="confirmar "
                    value={confirmar}
                    onChange={(e) => setConfirmar(e.target.value)}
                /> 
            </div>
             <button className="btn btn-primary d-block mx-auto text-white w-25" onClick={registrar}>
    continuar
</button>

            <div className="w-75 mx-auto">
                <div className="row g-3 mb-3">
                    <div className="col-4">
                        <button type="button" className="btn bg-white w-100 d-flex flex-column align-items-center gap-2 py-1 border rounded-3 shadow-sm text-dark">
                            <svg width="28" height="28" viewBox="0 0 48 48">
                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                            </svg>
                            <span>Google</span>
                        </button>
                    </div>
                    <div className="col-4">
                        <button type="button" className="btn bg-light w-100 d-flex flex-column align-items-center gap-2 py-1 border rounded-3 shadow-sm text-dark">
                            <i className="bi bi-openai fs-3"></i>
                            <span>ChatGPT</span>
                        </button>
                    </div>
                    <div className="col-4">
                        <button type="button" className="btn bg-white w-100 d-flex flex-column align-items-center gap-2 py-1 border rounded-3 shadow-sm text-dark">
                            <i className="bi bi-apple fs-3"></i>
                            <span>Apple</span>
                        </button>
                    </div>
                </div>
            </div>

            <p className="text-center">¿ya eres usuario? <Link to="/principal"><button className="btn btn-sm btn-outline-secondary px-2"> inicia sesion</button></Link></p>
            <p className="form-control w-100 mx-auto text-center border-0 rounded-0">Al continuar, confirmas que entiendes y aceptas los Términos y condiciones y la Política de privacidad.</p>
        </div>
        </>
    )
}

export default Login