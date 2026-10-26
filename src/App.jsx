import { useState } from "react";
import Encabezado from "./components/Encabezado.jsx";
import Seccion from "./components/Seccion.jsx";
import TarjetaCancion from "./components/TarjetaCancion.jsx";
import PiePagina from "./components/PiePagina.jsx";
import Reproductor from "./components/Reproductor.jsx";
import PedidoCancion from "./components/PedidoCancion.jsx";
import ListaPedidos from "./components/ListaPedidos.jsx";
import TuComponente from "./components/TuComponente.jsx"; // Tu componente propio
import { canciones } from "./data/canciones.js";

function App() {
    const [busqueda, setBusqueda] = useState("");

    // Ticket 1: Nombre de tu cabina personalizado
    const nombreCabina = "Estación Umbral 3";

    // Ticket 3: La playlist pasa a ser estado, empezando con el array de canciones
    const [playlist, setPlaylist] = useState(canciones);

    // Estado para la lista de pedidos (Array de objetos)
    const [pedidos, setPedidos] = useState([]);

    // Función para agregar un nuevo pedido (Inmutabilidad con spread)
    function agregar(titulo, quien) {
        const nuevo = { id: Date.now(), titulo, quien, sono: false };
        setPedidos([...pedidos, nuevo]);
    }

    // Función para borrar un pedido por su id
    function borrar(id) {
        setPedidos(pedidos.filter((p) => p.id !== id));
    }

    // Función para marcar o desmarcar un pedido como escuchado
    function marcar(id) {
        setPedidos(
            pedidos.map((p) => (p.id === id ? { ...p, sono: !p.sono } : p))
        );
    }

    // Ticket 3: Función para alternar favorita con map y objeto copiado
    function alternarFavorita(id) {
        setPlaylist(
            playlist.map((c) => (c.id === id ? { ...c, favorita: !c.favorita } : c))
        );
    }

    // Ticket 3: Cálculo de cuántas canciones son favoritas (sin un estado adicional)
    const totalFavoritas = playlist.filter((c) => c.favorita).length;

    // Filtra las canciones de la playlist según lo que se escriba en el buscador
    const visibles = playlist.filter((cancion) =>
        cancion.titulo.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <main className="app">
            {/* Ticket 1 y Ticket 3: Pasamos el nombre de la cabina y el total de favoritas al Encabezado */}
            <Encabezado 
                nombreCabina={nombreCabina} 
                totalFavoritas={totalFavoritas} 
                total={visibles.length} 
            />

            {/* Ticket 2: Tu componente personalizado */}
            <TuComponente mensaje="¡Transmisión estable en el sector!" />

            <Seccion titulo="Turno de noche">
                {/* Buscador de canciones */}
                <input
                    className="buscador"
                    type="text"
                    placeholder="Buscar canción..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />

                {visibles.length > 0 ? (
                    <section className="playlist">
                        {visibles.map((cancion) => (
                            <TarjetaCancion
                                key={cancion.id}
                                id={cancion.id}
                                titulo={cancion.titulo}
                                artista={cancion.artista}
                                album={cancion.album}
                                duracion={cancion.duracion}
                                portada={cancion.portada}
                                anio={cancion.anio}
                                reproducciones={cancion.reproducciones}
                                favorita={cancion.favorita}
                                energia={cancion.energia}
                                onFavorita={alternarFavorita}
                            />
                        ))}
                    </section>
                ) : (
                    <p className="playlist-vacia">Aún no hay canciones en la estación</p>
                )}
            </Seccion>

            {/* Formulario de Pedidos conectado con onAgregar */}
            <PedidoCancion onAgregar={agregar} />

            {/* Cola de pedidos con sus props */}
            <ListaPedidos pedidos={pedidos} onMarcar={marcar} onBorrar={borrar} />

            {/* Reproductor de Audio fijo abajo */}
            <Reproductor />

            <PiePagina />
        </main>
    );
}

export default App;