import { useState } from "react";

function TuComponente({ mensaje }) {
    // Ticket 2: Uso de useState para cambiar el ánimo de la cabina interactivamente
    const [estadoAnimo, setEstadoAnimo] = useState("🚀 Órbita Estable");

    return (
        <section className="cola" style={{ textAlign: "center", margin: "20px 0" }}>
            <h2 className="seccion-titulo">Ánimo de la Cabina</h2>
            <p className="cola-contador">{mensaje}</p>
            
            <p style={{ fontSize: "1.1rem", fontWeight: "bold", margin: "10px 0", color: "var(--cabina-acento)" }}>
                {estadoAnimo}
            </p>

            <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "10px" }}>
                <button className="boton-mini" onClick={() => setEstadoAnimo("⚡ Hiperespacio")}>
                    Hiperespacio
                </button>
                <button className="boton-mini" onClick={() => setEstadoAnimo("🌙 Modo Nocturno")}>
                    Nocturno
                </button>
                <button className="boton-mini" onClick={() => setEstadoAnimo("🔥 Full Energía")}>
                    Full Energía
                </button>
            </div>
        </section>
    );
}

export default TuComponente;