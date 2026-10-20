import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";

function Login() {
    return (
        <>
        <div className="container w-50 mx-auto py-4">
           <div className="text-center">
    <h1 className="text-center text-justify">
        Tu espacio de trabajo con IA
    </h1>
    
    <h2>Inicia sesión en tu cuenta de AlcaldiaOrganiza</h2>
    
</div>

            <div>
                <p className="text-center my-3 rounded-0">correo electronico</p>
                <input
                    type="email"
                    className="form-control w-75 mx-auto my-3 rounded-0"
                    placeholder="escribe tu direccion de correo electronico "
                /> 
                    <div>
                <p className="text-center my-3 rounded-0">contraseña</p>
                <input
                    type="input"
                    className="form-control w-75 mx-auto my-3 rounded-0"
                    placeholder="contraseña"
                    
                /> 
            </div>
                <p className="w-75 mx-auto my-3 text-center border-0 rounded-0">Consejo: Utiliza tu correo electrónico de trabajo (si lo tienes) para que a tu equipo le resulte más fácil unirse a ti en Notion.</p> 
                <button className="btn btn-primary d-block mx-auto text-white w-75">continuar</button> <br />
                   
            </div>
            
         

            <div className="w-50 mx-auto">
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

                <div className="row g-3">
                    <div className="col-4">
                        <button type="button" className="btn bg-white w-100 d-flex flex-column align-items-center gap-2 py-1 border rounded-3 shadow-sm text-dark">
                            <div className="lh-1 fs-6">
                                <div>
                                    <i className="bi bi-square-fill text-danger"></i>
                                    <i className="bi bi-square-fill text-success"></i>
                                </div>
                                <div>
                                    <i className="bi bi-square-fill text-primary"></i>
                                    <i className="bi bi-square-fill text-warning"></i>
                                </div>
                            </div>
                            <span>Microsoft</span>
                        </button>
                    </div>
                    <div className="col-4">
                        <button type="button" className="btn bg-white w-100 d-flex flex-column align-items-center gap-2 py-1 border rounded-3 shadow-sm text-dark">
                            <i className="bi bi-person-fill-lock fs-3"></i>
                            <span>Passkey</span>
                        </button>
                    </div>
                    <div className="col-4">
                        <button type="button" className="btn bg-white w-100 d-flex flex-column align-items-center gap-2 py-1 border rounded-3 shadow-sm text-dark">
                            <i className="bi bi-building fs-3"></i>
                            <span>SSO</span>
                        </button>
                    </div>
                </div>
            </div>

            <p className="text-center">¿Eres un usuario nuevo? <Link to="/registro"><button className="btn btn-sm btn-outline-secondary px-2">registrate</button></Link></p>
            <p className="form-control w-100 mx-auto text-center border-0 rounded-0">Al continuar, confirmas que entiendes y aceptas los Términos y condiciones y la Política de privacidad.  <Link to="/dashboard"></Link></p>

            
        </div>
        </>
    )
}

export default Login