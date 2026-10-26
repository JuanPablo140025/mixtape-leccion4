import { useState } from "react";

function PedidoCancion({ onAgregar }) {
    const [cancion, setCancion] = useState("");
    const [nombre, setNombre] = useState("");
    const [error, setError] = useState("");
    const [confirmacion, setConfirmacion] = useState("");

    function manejarEnvio(e) {
        e.preventDefault();
        setConfirmacion("");

        if (cancion.trim().length < 2) {
            setError("El nombre de la canción necesita al menos 2 letras.");
            return;
        }

        if (nombre.trim() === "") {
            setError("Escribe quién pide la canción.");
            return;
        }

        setError("");

        // Aquí llamamos a la función que viene del padre (App)
        if (onAgregar) {
            onAgregar(cancion, nombre);
        }

        setConfirmacion(`Pedido recibido: ${cancion}, para ${nombre}`);
        setCancion("");
        setNombre("");
    }

    return (
        <form className="pedido" onSubmit={manejarEnvio}>
            <h2 className="seccion-titulo">Pide una canción</h2>

            <label>Canción</label>
            <input 
                type="text" 
                placeholder="¿Qué quieres escuchar?" 
                value={cancion}
                onChange={(e) => setCancion(e.target.value)}
            />
            <span className={`contador-letras ${cancion.length > 40 ? "contador-letras-rojo" : ""}`}>
                {cancion.length}/40
            </span>

            <label>Tu nombre</label>
            <input 
                type="text" 
                placeholder="¿Quién la pide?" 
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />

            <button 
                type="submit" 
                disabled={cancion === "" || nombre === "" || cancion.length > 40}
            >
                Enviar pedido
            </button>

            {error !== "" && <p className="pedido-error">{error}</p>}
            {confirmacion !== "" && <p className="pedido-exito">{confirmacion}</p>}
        </form>
    );
}

export default PedidoCancion;