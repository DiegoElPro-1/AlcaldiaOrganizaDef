import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API = "http://localhost:4000/api";
const AZUL = "#12355B";
const DORADO = "#D4AF5A";
const FONDO = "#F7F5F0";
const serif = { fontFamily: "Georgia, 'Times New Roman', serif" };

// Cada secretaría tiene un color único. Ese mismo color se usa luego en el Dashboard.
const SECRETARIAS = [
    { id: "general", corto: "General", nombre: "Secretaría General", color: "#475569" },
    { id: "hacienda", corto: "Hacienda", nombre: "Secretaría de Hacienda", color: "#A16207" },
    { id: "gobierno", corto: "Gobierno", nombre: "Secretaría de Gobierno y Participación Comunitaria", color: "#B91C1C" },
    { id: "transito", corto: "Tránsito", nombre: "Secretaría de Tránsito y Transporte", color: "#C2410C" },
    { id: "infraestructura", corto: "Infraestructura", nombre: "Secretaría de Infraestructura", color: "#78350F" },
    { id: "educacion", corto: "Educación", nombre: "Secretaría de Educación", color: "#1D4ED8" },
    { id: "salud", corto: "Salud", nombre: "Secretaría de Salud", color: "#0F766E" },
    { id: "planeacion", corto: "Planeación", nombre: "Secretaría de Planeación", color: "#4338CA" },
    { id: "mujer", corto: "Mujer", nombre: "Secretaría de la Mujer", color: "#BE185D" },
    { id: "agroambiental", corto: "Agroambiental", nombre: "Secretaría de Desarrollo Agroambiental y Fomento Económico", color: "#4D7C0F" },
    { id: "recreacion", corto: "Recreación", nombre: "Secretaría de Recreación, Actividad Física y Aprovechamiento del Tiempo Libre", color: "#15803D" },
    { id: "cultura", corto: "Cultura y Turismo", nombre: "Secretaría de Cultura y Turismo", color: "#7E22CE" },
    { id: "tic", corto: "TIC", nombre: "TIC", color: "#0E7490" },
];

function Login() {
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [verContrasena, setVerContrasena] = useState(false);
    const [error, setError] = useState("");
    const [aviso, setAviso] = useState("");
    const [cargando, setCargando] = useState(false);
    const [secretariaId, setSecretariaId] = useState("");
    const [focoId, setFocoId] = useState("");
    const navigate = useNavigate();
    const secretaria = SECRETARIAS.find((s) => s.id === secretariaId);

    const correoValido = (v) => /^\S+@\S+\.\S+$/.test(v);

    const post = async (ruta, cuerpo) => {
        const res = await fetch(API + ruta, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cuerpo),
        });
        let data = {};
        try { data = await res.json(); } catch { /* respuesta sin JSON */ }
        if (!res.ok && !data.error) data.error = "No se pudo completar la solicitud. Intenta de nuevo.";
        return data;
    };

    const iniciarSesion = async (e) => {
        e.preventDefault();
        if (cargando) return;
        setAviso("");

        if (!correoValido(correo.trim())) return setError("Escribe un correo electrónico válido.");
        if (!contrasena) return setError("Escribe tu contraseña.");
        if (!secretaria) return setError("Elige tu secretaría.");

        setError("");
        setCargando(true);
        try {
            const data = await post("/login", { correo: correo.trim(), contrasena, secretaria: secretaria.id });
            if (data.error) {
                setError(data.error);
            } else {
                if (data.token) localStorage.setItem("token", data.token);
                // El Dashboard lee esto para saber en qué secretaría trabaja el usuario
                localStorage.setItem(
                    "secretaria",
                    JSON.stringify({ id: secretaria.id, nombre: secretaria.nombre, color: secretaria.color })
                );
                navigate("/principal");
            }
        } catch {
            setError("No se pudo conectar con el servidor. Revisa tu conexión e intenta de nuevo.");
        } finally {
            setCargando(false);
        }
    };

    const recuperarContrasena = async () => {
        setError("");
        setAviso("");
        if (!correoValido(correo.trim())) {
            return setError("Escribe tu correo en el campo de arriba y vuelve a pulsar «¿Olvidaste tu contraseña?».");
        }
        setCargando(true);
        try {
            const data = await post("/recuperar", { correo: correo.trim() });
            if (data.error) setError(data.error);
            else setAviso("Si el correo está registrado, te enviamos instrucciones para crear una contraseña nueva.");
        } catch {
            setError("No se pudo conectar con el servidor. Revisa tu conexión e intenta de nuevo.");
        } finally {
            setCargando(false);
        }
    };

    // Todavía no hay backend para estos accesos: avisan en pantalla.
    const accesoAlterno = (nombre) => {
        setError("");
        setAviso(`${nombre} todavía no está habilitado. Usa tu correo y contraseña.`);
    };

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
                    <form className="w-100" style={{ maxWidth: 420 }} onSubmit={iniciarSesion} noValidate>
                        <h1 className="fw-bold mb-1" style={{ ...serif, color: AZUL, fontSize: "2rem" }}>Inicia sesión</h1>
                        <p className="text-secondary mb-4">Entra a tu cuenta de AlcaldíaOrganiza.</p>

                        <fieldset className="mb-4">
                            <legend className="form-label fw-semibold fs-6 mb-2">Secretaría</legend>
                            <div className="row g-2">
                                {SECRETARIAS.map((s) => {
                                    const elegida = s.id === secretariaId;
                                    return (
                                        <div className="col-6" key={s.id}>
                                            <label
                                                className="d-flex align-items-center gap-2 w-100 px-2 py-2 border rounded-1 small"
                                                title={s.nombre}
                                                style={{
                                                    cursor: "pointer",
                                                    borderColor: elegida ? s.color : undefined,
                                                    boxShadow: elegida ? `inset 0 0 0 1px ${s.color}` : "none",
                                                    background: elegida ? `${s.color}14` : "#fff",
                                                    outline: focoId === s.id ? "3px solid rgba(31, 90, 148, 0.5)" : "none",
                                                }}
                                            >
                                                <input
                                                    type="radio"
                                                    name="secretaria"
                                                    value={s.id}
                                                    checked={elegida}
                                                    onChange={() => setSecretariaId(s.id)}
                                                    onFocus={() => setFocoId(s.id)}
                                                    onBlur={() => setFocoId("")}
                                                    className="visually-hidden"
                                                />
                                                <span
                                                    aria-hidden="true"
                                                    style={{ width: 14, height: 14, borderRadius: 3, background: s.color, flexShrink: 0 }}
                                                ></span>
                                                <span className={elegida ? "fw-semibold" : ""}>{s.corto}</span>
                                            </label>
                                        </div>
                                    );
                                })}
                            </div>
                        </fieldset>

                        <div className="mb-3">
                            <label htmlFor="correo" className="form-label fw-semibold">Correo electrónico</label>
                            <input
                                id="correo"
                                type="email"
                                className="form-control rounded-1 py-2"
                                placeholder="nombre@ejemplo.com"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                autoComplete="email"
                            />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="contrasena" className="form-label fw-semibold">Contraseña</label>
                            <div className="position-relative">
                                <input
                                    id="contrasena"
                                    type={verContrasena ? "text" : "password"}
                                    className="form-control rounded-1 py-2 pe-5"
                                    placeholder="Tu contraseña"
                                    value={contrasena}
                                    onChange={(e) => setContrasena(e.target.value)}
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    className="btn border-0 position-absolute top-0 end-0 h-100 text-secondary"
                                    onClick={() => setVerContrasena(!verContrasena)}
                                    aria-label={verContrasena ? "Ocultar contraseña" : "Mostrar contraseña"}
                                    aria-pressed={verContrasena}
                                >
                                    <i className={"bi " + (verContrasena ? "bi-eye-slash" : "bi-eye")} aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>

                        <div className="text-end mb-3">
                            <button
                                type="button"
                                className="btn btn-link p-0 small"
                                onClick={recuperarContrasena}
                                disabled={cargando}
                            >
                                ¿Olvidaste tu contraseña?
                            </button>
                        </div>

                        {error && <p role="alert" className="text-danger small mb-3">{error}</p>}
                        {aviso && (
                            <p role="status" className="small mb-3 p-2 border-start border-3 border-primary bg-primary-subtle">
                                {aviso}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="btn text-white w-100 py-2 rounded-1 fw-semibold"
                            style={{ background: secretaria ? secretaria.color : AZUL }}
                            disabled={cargando}
                        >
                            {cargando ? "Iniciando sesión…" : "Iniciar sesión"}
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
                            ¿Eres usuario nuevo? <Link to="/registro">Crea tu cuenta</Link>
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

export default Login;