import { Link } from "react-router-dom";

function Registro() {
    return (
        <>
           <div className="text-center">
    <h1 className="text-center text-justify">
        Tu espacio de trabajo con IA
    </h1>
    
    <h2>Inicia sesión en tu cuenta de Notion</h2>
    
</div>

            <div>
                <p className="text-center my-3 rounded-0">correo electronico</p>
                <input
                    type="email"
                    className="form-control w-25 mx-auto my-3 rounded-0"
                    placeholder="escribe tu direccion de correo electronico "
                /> 
                <p className="w-25 mx-auto my-3 text-center border-0 rounded-0">Usa un correo electrónico asociado a tu organización para colaborar con compañeros de equipo de manera más fácil</p> 
                <button className="btn btn-primary d-block mx-auto text-white w-50">continuar</button><br />
            </div>

            <div className="row g-3 w-50 mx-auto">
    <div className="col-4">
        <button type="button" className="btn bg-white w-100 d-flex flex-column align-items-center gap-2 py-2 border rounded-3 shadow-sm text-dark">
            <div className="small lh-1">
                <div className="d-flex lh-1">
                    <i className="bi bi-square-fill text-danger lh-1"></i>
                    <i className="bi bi-square-fill text-success lh-1"></i>
                </div>
                <div className="d-flex lh-1">
                    <i className="bi bi-square-fill text-primary lh-1"></i>
                    <i className="bi bi-square-fill text-warning lh-1"></i>
                </div>
            </div>
            <span>Microsoft</span>
        </button>
    </div>
                    <div className="col-4">
                        <button type="button" className="btn bg-white w-100 d-flex flex-column align-items-center gap-2 py-2 border rounded-3 shadow-sm text-dark">
                            <i className="bi bi-person-fill-lock fs-3"></i>
                            <span>Passkey</span>
                        </button>
                    </div>
                    <div className="col-4">
                        <button type="button" className="btn bg-white w-100 d-flex flex-column align-items-center gap-2 py-2 border rounded-3 shadow-sm text-dark">
                            <i className="bi bi-building fs-3"></i>
                            <span>SSO</span>
                        </button>
                    </div>
                </div>

            <p className="text-center">¿ya eres usuario? <Link to="/Login"><button>iniciar sesion</button></Link></p>
            <p className="form-control w-75 mx-auto text-center border-0 rounded-0">Al continuar, confirmas que entiendes y aceptas los Términos y condiciones y la Política de privacidad.</p>

  
        </>
    )
}

export default Registro