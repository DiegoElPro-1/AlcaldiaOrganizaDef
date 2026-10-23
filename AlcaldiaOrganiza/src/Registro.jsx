import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API = "http://localhost:4000/api";
const AZUL = "#12355B";
const DORADO = "#D4AF5A";
const FONDO = "#F7F5F0";
const MIN_CONTRASENA = 8;
const serif = { fontFamily: "Georgia, 'Times New Roman', serif" };

function Registro() {
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [confirmar, setConfirmar] = useState("");
    const [verContrasena, setVerContrasena] = useState(false);
    const [verConfirmar, setVerConfirmar] = useState(false);
    const [errores, setErrores] = useState({});
    const [aviso, setAviso] = useState("");
    const [cargando, setCargando] = useState(false);
    const navigate = useNavigate();

    const correoValido = (v) => /^\S+@\S+\.\S+$/.test(v);

    const validar = () => {
        const nuevos = {};
        if (!correoValido(correo.trim())) nuevos.correo = "Escribe un correo electrónico válido.";
        if (contrasena.length < MIN_CONTRASENA) nuevos.contrasena = `La contraseña debe tener al menos ${MIN_CONTRASENA} caracteres.`;
        if (confirmar !== contrasena) nuevos.confirmar = "Las contraseñas no coinciden.";
        return nuevos;
    };

    const registrar = async (e) => {
        e.preventDefault();
        if (cargando) return;
        setAviso("");

        const nuevos = validar();
        setErrores(nuevos);
        if (Object.keys(nuevos).length > 0) return;

        setCargando(true);
        try {
            const res = await fetch(API + "/registro", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ correo: correo.trim(), contrasena }),
            });
            let data = {};
            try { data = await res.json(); } catch { /* respuesta sin JSON */ }

            if (data.error || !res.ok) {
                // el error del servidor (p. ej. correo ya registrado) va bajo el correo
                setErrores({ correo: data.error || "No se pudo crear la cuenta. Intenta de nuevo." });
            } else {
                if (data.token) localStorage.setItem("token", data.token);
                navigate("/"); // en el login elegirá su secretaría
            }
        } catch {
            setErrores({ general: "No se pudo conectar con el servidor. Revisa tu conexión e intenta de nuevo." });
        } finally {
            setCargando(false);
        }
    };

    // Todavía no hay backend para estos accesos: avisan en pantalla.
    const accesoAlterno = (nombre) => {
        setErrores({});
        setAviso(`${nombre} todavía no está habilitado. Usa tu correo y contraseña.`);
    };

    const botonOjo = (visible, alternar) => (
        <button
            type="button"
            className="btn border-0 position-absolute top-0 end-0 h-100 text-secondary"
            onClick={alternar}
            aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
            aria-pressed={visible}
        >
            <i className={"bi " + (visible ? "bi-eye-slash" : "bi-eye")} aria-hidden="true"></i>
        </button>
    );

    return (
        <div className="container-fluid p-0" style={{ background: FONDO }}>
            <div className="row g-0 min-vh-100">
                <aside
                    className="col-lg-5 text-white d-flex flex-column justify-content-between p-4 p-lg-5"
                    style={{ background: AZUL, borderTop: `6px solid ${DORADO}` }}
                >
                    <p className="fs-5 mb-0 pb-2 align-self-start" style={{ ...serif, borderBottom: `1px solid ${DORADO}` }}>
                        AlcaldíaOrganiza
                    </p>
                    <div className="my-4">
                        <p className="display-6 fw-bold mb-3" style={serif}>Tu espacio de trabajo con IA</p>
                        <p className="d-none d-lg-block opacity-75 mb-0">
                            Organiza tareas, documentos y equipos de la Alcaldía de Popayán en un solo lugar.
                        </p>
                    </div>
                    <address className="d-none d-lg-block small opacity-75 mb-0">
                        Alcaldía Municipal de Popayán<br />
                        Edificio CAM, Carrera 6 # 4-21<br />
                        Lunes a viernes, 8:00 a.m. a 12:00 m. y 2:00 p.m. a 5:00 p.m.
                    </address>
                </aside>

                <main className="col-lg-7 d-flex align-items-center justify-content-center py-5 px-3">
                    <form className="w-100" style={{ maxWidth: 420 }} onSubmit={registrar} noValidate>
                        <h1 className="fw-bold mb-1" style={{ ...serif, color: AZUL, fontSize: "2rem" }}>Crea tu cuenta</h1>
                        <p className="text-secondary mb-4">Regístrate en AlcaldíaOrganiza con tu correo.</p>

                        <div className="mb-3">
                            <label htmlFor="correo" className="form-label fw-semibold">Correo electrónico</label>
                            <input
                                id="correo"
                                type="email"
                                className={"form-control rounded-1 py-2" + (errores.correo ? " is-invalid" : "")}
                                placeholder="nombre@ejemplo.com"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                autoComplete="email"
                            />
                            {errores.correo && <div className="invalid-feedback">{errores.correo}</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="contrasena" className="form-label fw-semibold">Contraseña</label>
                            <div className="position-relative">
                                <input
                                    id="contrasena"
                                    type={verContrasena ? "text" : "password"}
                                    className="form-control rounded-1 py-2 pe-5"
                                    style={errores.contrasena ? { borderColor: "#dc3545" } : undefined}
                                    placeholder="Crea una contraseña"
                                    value={contrasena}
                                    onChange={(e) => setContrasena(e.target.value)}
                                    autoComplete="new-password"
                                />
                                {botonOjo(verContrasena, () => setVerContrasena(!verContrasena))}
                            </div>
                            {errores.contrasena
                                ? <p className="text-danger small mt-1 mb-0">{errores.contrasena}</p>
                                : <p className="text-secondary small mt-1 mb-0">Mínimo {MIN_CONTRASENA} caracteres.</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="confirmar" className="form-label fw-semibold">Confirmar contraseña</label>
                            <div className="position-relative">
                                <input
                                    id="confirmar"
                                    type={verConfirmar ? "text" : "password"}
                                    className="form-control rounded-1 py-2 pe-5"
                                    style={errores.confirmar ? { borderColor: "#dc3545" } : undefined}
                                    placeholder="Repite la contraseña"
                                    value={confirmar}
                                    onChange={(e) => setConfirmar(e.target.value)}
                                    autoComplete="new-password"
                                />
                                {botonOjo(verConfirmar, () => setVerConfirmar(!verConfirmar))}
                            </div>
                            {errores.confirmar && <p className="text-danger small mt-1 mb-0">{errores.confirmar}</p>}
                        </div>

                        {errores.general && <p role="alert" className="text-danger small mb-3">{errores.general}</p>}
                        {aviso && (
                            <p role="status" className="small mb-3 p-2 border-start border-3 border-primary bg-primary-subtle">
                                {aviso}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="btn text-white w-100 py-2 rounded-1 fw-semibold"
                            style={{ background: AZUL }}
                            disabled={cargando}
                        >
                            {cargando ? "Creando cuenta…" : "Crear cuenta"}
                        </button>

                        <p className="text-center text-secondary small my-4">o continúa con</p>

                        <div className="row g-2 mb-4">
                            <div className="col-4">
                                <button
                                    type="button"
                                    className="btn bg-white border w-100 d-flex flex-column align-items-center gap-1 py-2 rounded-1"
                                    onClick={() => accesoAlterno("El acceso con Google")}
                                >
                                    <svg width="22" height="22" viewBox="0 0 48 48" aria-hidden="true">
                                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                                    </svg>
                                    <span className="small">Google</span>
                                </button>
                            </div>
                            <div className="col-4">
                                <button
                                    type="button"
                                    className="btn bg-white border w-100 d-flex flex-column align-items-center gap-1 py-2 rounded-1"
                                    onClick={() => accesoAlterno("El acceso con Microsoft")}
                                >
                                    <svg width="20" height="22" viewBox="0 0 21 21" aria-hidden="true">
                                        <rect x="1" y="1" width="9" height="9" fill="#F25022" />
                                        <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
                                        <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
                                        <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
                                    </svg>
                                    <span className="small">Microsoft</span>
                                </button>
                            </div>
                            <div className="col-4">
                                <button
                                    type="button"
                                    className="btn bg-white border w-100 d-flex flex-column align-items-center gap-1 py-2 rounded-1"
                                    onClick={() => accesoAlterno("El acceso institucional")}
                                >
                                    <i className="bi bi-building fs-5" style={{ color: AZUL }} aria-hidden="true"></i>
                                    <span className="small">Institucional</span>
                                </button>
                            </div>
                        </div>

                        <p className="text-center mb-2">
                            ¿Ya tienes cuenta? <Link to="/">Inicia sesión</Link>
                        </p>
                        <p className="text-center text-secondary small mb-0">
                            Al continuar, confirmas que entiendes y aceptas los Términos y condiciones y la Política de privacidad.
                        </p>
                    </form>
                </main>
            </div>
        </div>
    );
}

export default Registro;