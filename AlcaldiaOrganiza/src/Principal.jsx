import { Link } from "react-router-dom";

const AZUL = "#12355B";
const DORADO = "#D4AF5A";
const FONDO = "#F7F5F0";
const serif = { fontFamily: "Georgia, 'Times New Roman', serif" };

// Si ya inició sesión, en vez de los botones de entrada mostramos un acceso directo
const haySesion = () => {
    try {
        return Boolean(localStorage.getItem("secretaria"));
    } catch {
        return false;
    }
};

function Principal() {
    const sesionIniciada = haySesion();

    return (
        <div className="min-vh-100 d-flex flex-column" style={{ background: FONDO }}>
            <header
                className="px-3 px-lg-5 py-3 text-white"
                style={{ background: AZUL, borderTop: `6px solid ${DORADO}` }}
            >
                <span className="fs-5" style={serif}>AlcaldíaOrganiza</span>
            </header>

            <main className="flex-grow-1 d-flex align-items-center px-3 px-lg-5 py-5">
                <div style={{ maxWidth: 640 }}>
                    <h1 className="fw-bold mb-3" style={{ ...serif, color: AZUL, fontSize: "clamp(2rem, 5vw, 3.2rem)", lineHeight: 1.1 }}>
                        Tu espacio de trabajo con IA
                    </h1>
                    <p className="fs-5 text-secondary mb-4">
                        Organiza tareas, documentos y equipos de la Alcaldía de Popayán en un solo lugar,
                        con el espacio propio de cada secretaría.
                    </p>

                    <div className="d-flex flex-wrap gap-2">
                        {sesionIniciada ? (
                            <Link to="/dashboard" className="btn text-white px-4 py-2 rounded-1 fw-semibold" style={{ background: AZUL }}>
                                Ir a mi espacio de trabajo
                            </Link>
                        ) : (
                            <>
                                <Link to="/login" className="btn text-white px-4 py-2 rounded-1 fw-semibold" style={{ background: AZUL }}>
                                    Iniciar sesión
                                </Link>
                                <Link
                                    to="/registro"
                                    className="btn px-4 py-2 rounded-1 fw-semibold bg-white"
                                    style={{ color: AZUL, border: `1px solid ${AZUL}` }}
                                >
                                    Crear cuenta
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </main>

            <footer className="px-3 px-lg-5 py-3 small text-secondary border-top">
                Alcaldía Municipal de Popayán · Edificio CAM, Carrera 6 # 4-21 · Lunes a viernes, 8:00 a.m. a 12:00 m. y 2:00 p.m. a 5:00 p.m.
            </footer>
        </div>
    );
}

export default Principal;