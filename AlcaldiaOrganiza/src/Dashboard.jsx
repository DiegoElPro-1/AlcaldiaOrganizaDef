import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const FONDO = "#F7F5F0";
const serif = { fontFamily: "Georgia, 'Times New Roman', serif" };
const TIPOS = { texto: "Texto", titulo: "Título", tarea: "Tarea" };

const nuevoId = () => Math.random().toString(36).slice(2, 10);
const bloqueNuevo = (tipo = "texto") => ({ id: nuevoId(), tipo, texto: "", hecho: false });
const paginaNueva = () => ({ id: nuevoId(), titulo: "", bloques: [bloqueNuevo()] });

const leer = (clave, defecto) => {
    try {
        const valor = localStorage.getItem(clave);
        return valor ? JSON.parse(valor) : defecto;
    } catch {
        return defecto;
    }
};

function Dashboard() {
    const navigate = useNavigate();

    // La secretaría la guarda el Login al iniciar sesión
    const [secretaria] = useState(() => leer("secretaria", null));
    const clave = secretaria ? `paginas:${secretaria.id}` : "";

    const [paginas, setPaginas] = useState(() => {
        if (!secretaria) return [];
        const guardadas = leer(clave, []);
        return guardadas.length > 0 ? guardadas : [paginaNueva()];
    });
    const [activaId, setActivaId] = useState(() => paginas[0]?.id ?? "");
    const [enfocar, setEnfocar] = useState("");
    const refs = useRef({});

    // Guarda las páginas de esta secretaría cada vez que cambian
    useEffect(() => {
        if (!clave) return;
        try {
            localStorage.setItem(clave, JSON.stringify(paginas));
        } catch {
            /* sin espacio o sin permiso: se sigue trabajando en memoria */
        }
    }, [paginas, clave]);

    // Lleva el cursor al bloque recién creado
    useEffect(() => {
        if (enfocar && refs.current[enfocar]) refs.current[enfocar].focus();
    }, [enfocar]);

    if (!secretaria) return <Navigate to="/" replace />;

    const color = secretaria.color;
    const pagina = paginas.find((p) => p.id === activaId) ?? paginas[0];

    const cambiarPagina = (id, cambios) =>
        setPaginas((lista) => lista.map((p) => (p.id === id ? { ...p, ...cambios } : p)));

    const cambiarBloques = (nuevosBloques) => cambiarPagina(pagina.id, { bloques: nuevosBloques });

    const cambiarBloque = (id, cambios) =>
        cambiarBloques(pagina.bloques.map((b) => (b.id === id ? { ...b, ...cambios } : b)));

    const crearPagina = () => {
        const nueva = paginaNueva();
        setPaginas((lista) => [...lista, nueva]);
        setActivaId(nueva.id);
        setEnfocar(nueva.bloques[0].id);
    };

    const eliminarPagina = (id) => {
        if (!window.confirm("¿Eliminar esta página? No se puede deshacer.")) return;
        const restantes = paginas.filter((p) => p.id !== id);
        const lista = restantes.length > 0 ? restantes : [paginaNueva()];
        setPaginas(lista);
        setActivaId(lista[0].id);
    };

    const insertarBloqueDespuesDe = (indice) => {
        const actual = pagina.bloques[indice];
        const tipo = actual.tipo === "tarea" ? "tarea" : "texto"; // los títulos siguen con texto
        const nuevo = bloqueNuevo(tipo);
        const copia = [...pagina.bloques];
        copia.splice(indice + 1, 0, nuevo);
        cambiarBloques(copia);
        setEnfocar(nuevo.id);
    };

    const eliminarBloque = (indice) => {
        if (pagina.bloques.length === 1) return; // siempre queda al menos uno
        const copia = pagina.bloques.filter((_, i) => i !== indice);
        cambiarBloques(copia);
        setEnfocar(copia[Math.max(indice - 1, 0)].id);
    };

    const alPresionarTecla = (e, indice) => {
        if (e.key === "Enter") {
            e.preventDefault();
            insertarBloqueDespuesDe(indice);
        } else if (e.key === "Backspace" && pagina.bloques[indice].texto === "") {
            e.preventDefault();
            eliminarBloque(indice);
        }
    };

    const cerrarSesion = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("secretaria");
        navigate("/");
    };

    const estiloBloque = (b) => {
        if (b.tipo === "titulo") return { ...serif, fontSize: "1.6rem", fontWeight: 700 };
        if (b.tipo === "tarea" && b.hecho) return { textDecoration: "line-through", color: "#8b95a1" };
        return {};
    };

    return (
        <div className="container-fluid p-0" style={{ background: FONDO }}>
            <div className="row g-0 min-vh-100">
                <aside
                    className="col-md-4 col-lg-3 d-flex flex-column bg-white border-end"
                    style={{ borderTop: `6px solid ${color}` }}
                >
                    <div className="p-3 border-bottom" style={{ background: `${color}14` }}>
                        <p className="small text-secondary mb-1">AlcaldíaOrganiza</p>
                        <p className="fw-semibold mb-0" style={{ ...serif, color }}>{secretaria.nombre}</p>
                    </div>

                    <nav className="p-2 flex-grow-1" aria-label="Páginas">
                        <p className="small fw-semibold text-secondary px-2 mt-2 mb-1">Páginas</p>
                        <ul className="list-unstyled mb-2">
                            {paginas.map((p) => {
                                const activa = p.id === pagina.id;
                                return (
                                    <li key={p.id} className="d-flex align-items-center">
                                        <button
                                            type="button"
                                            className="btn btn-sm text-start flex-grow-1 border-0 rounded-1 text-truncate"
                                            style={{
                                                background: activa ? `${color}1F` : "transparent",
                                                color: activa ? color : "inherit",
                                                fontWeight: activa ? 600 : 400,
                                            }}
                                            aria-current={activa ? "page" : undefined}
                                            onClick={() => setActivaId(p.id)}
                                        >
                                            <i className="bi bi-file-earmark-text me-2" aria-hidden="true"></i>
                                            {p.titulo || "Sin título"}
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-sm border-0 text-secondary"
                                            aria-label={`Eliminar la página ${p.titulo || "sin título"}`}
                                            onClick={() => eliminarPagina(p.id)}
                                        >
                                            <i className="bi bi-trash" aria-hidden="true"></i>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                        <button
                            type="button"
                            className="btn btn-sm w-100 text-start border-0 text-secondary"
                            onClick={crearPagina}
                        >
                            <i className="bi bi-plus-lg me-2" aria-hidden="true"></i>
                            Nueva página
                        </button>
                    </nav>

                    <div className="p-2 border-top">
                        <button
                            type="button"
                            className="btn btn-sm w-100 text-start border-0 text-secondary"
                            onClick={cerrarSesion}
                        >
                            <i className="bi bi-box-arrow-left me-2" aria-hidden="true"></i>
                            Cerrar sesión
                        </button>
                    </div>
                </aside>

                <main className="col-md-8 col-lg-9 px-3 px-lg-5 py-4">
                    <div className="mx-auto" style={{ maxWidth: 760 }}>
                        <input
                            type="text"
                            className="form-control border-0 shadow-none px-1 mb-3 fw-bold"
                            style={{ ...serif, fontSize: "2.2rem", background: "transparent", color }}
                            placeholder="Sin título"
                            aria-label="Título de la página"
                            value={pagina.titulo}
                            onChange={(e) => cambiarPagina(pagina.id, { titulo: e.target.value })}
                        />

                        {pagina.bloques.map((b, i) => (
                            <div key={b.id} className="d-flex align-items-start gap-1 mb-1">
                                <select
                                    className="form-select form-select-sm border-0 text-secondary shadow-none w-auto bg-transparent"
                                    aria-label="Tipo de bloque"
                                    value={b.tipo}
                                    onChange={(e) => cambiarBloque(b.id, { tipo: e.target.value })}
                                >
                                    {Object.entries(TIPOS).map(([valor, etiqueta]) => (
                                        <option key={valor} value={valor}>{etiqueta}</option>
                                    ))}
                                </select>

                                {b.tipo === "tarea" && (
                                    <input
                                        type="checkbox"
                                        className="form-check-input mt-2 flex-shrink-0"
                                        style={{ accentColor: color }}
                                        aria-label="Marcar tarea como hecha"
                                        checked={b.hecho}
                                        onChange={(e) => cambiarBloque(b.id, { hecho: e.target.checked })}
                                    />
                                )}

                                <input
                                    type="text"
                                    ref={(el) => { refs.current[b.id] = el; }}
                                    className="form-control border-0 shadow-none px-1 bg-transparent"
                                    style={estiloBloque(b)}
                                    placeholder={b.tipo === "titulo" ? "Título" : b.tipo === "tarea" ? "Tarea pendiente" : "Escribe algo…"}
                                    value={b.texto}
                                    onChange={(e) => cambiarBloque(b.id, { texto: e.target.value })}
                                    onKeyDown={(e) => alPresionarTecla(e, i)}
                                />

                                <button
                                    type="button"
                                    className="btn btn-sm border-0 text-secondary"
                                    aria-label="Eliminar bloque"
                                    onClick={() => eliminarBloque(i)}
                                    disabled={pagina.bloques.length === 1}
                                >
                                    <i className="bi bi-x-lg" aria-hidden="true"></i>
                                </button>
                            </div>
                        ))}

                        <button
                            type="button"
                            className="btn btn-sm border-0 mt-2"
                            style={{ color }}
                            onClick={() => insertarBloqueDespuesDe(pagina.bloques.length - 1)}
                        >
                            <i className="bi bi-plus-lg me-1" aria-hidden="true"></i>
                            Agregar bloque
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Dashboard;