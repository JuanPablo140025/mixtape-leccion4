import { useState } from "react";
import { canciones } from "../data/canciones.js";
import { IconoPlay, IconoPausa, IconoAnterior, IconoSiguiente } from "./Iconos.jsx";

function darOrden(orden) {
    const audio = document.getElementById("audio-mixtape");
    if (!audio) return;

    if (orden === "play") {
        audio.play().catch(() => {});
    } else {
        audio.pause();
    }
}

function Reproductor() {
    const [reproduciendo, setReproduciendo] = useState(false);
    const [indice, setIndice] = useState(0);
    const [progreso, setProgreso] = useState(0);

    const cancion = canciones[indice];

    function alternar() {
        if (reproduciendo) {
            darOrden("pause");
        } else {
            darOrden("play");
        }
        setReproduciendo(!reproduciendo);
    }

    function siguiente() {
        if (indice === canciones.length - 1) {
            setIndice(0);
        } else {
            setIndice(indice + 1);
        }
        setProgreso(0);
    }

    function anterior() {
        if (indice === 0) {
            setIndice(canciones.length - 1);
        } else {
            setIndice(indice - 1);
        }
        setProgreso(0);
    }

    return (
        <div className="reproductor">
            <audio
                id="audio-mixtape"
                key={indice}
                src={cancion.audio}
                autoPlay={reproduciendo}
                onEnded={siguiente}
                onTimeUpdate={(e) => setProgreso((e.target.currentTime / e.target.duration) * 100)}
            ></audio>

            <div className="reproductor-info">
                <img src={cancion.portada} alt="Portada" className="reproductor-portada" />

                <div className="reproductor-textos">
                    <p className="reproductor-estado">{reproduciendo ? "Sonando ahora" : "En pausa"}</p>
                    <p className="reproductor-titulo">{cancion.titulo}</p>
                    <p className="reproductor-artista">{cancion.artista}</p>
                    {!cancion.audio && <p className="reproductor-aviso">Esta canción no tiene audio</p>}
                </div>

                {reproduciendo && (
                    <div className="ecualizador">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                )}
            </div>

            <div className="barra-progreso">
                <div className="barra-progreso-relleno" style={{ width: `${progreso}%` }}></div>
            </div>

            <div className="controles">
                <button className="boton-control" aria-label="Anterior" onClick={anterior}>
                    <IconoAnterior />
                </button>
                <button className="boton-control boton-play" aria-label="Play o pausa" onClick={alternar}>
                    {reproduciendo ? <IconoPausa /> : <IconoPlay />}
                </button>
                <button className="boton-control" aria-label="Siguiente" onClick={siguiente}>
                    <IconoSiguiente />
                </button>
            </div>
        </div>
    );
}


export default Reproductor;
