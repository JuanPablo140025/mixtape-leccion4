function Encabezado({ nombreCabina, totalFavoritas, total }) {
    return (
        <header className="encabezado">
            {/* Logo usando el favicon que ya viene en public/ */}
            <img 
                src="/favicon.svg" 
                alt="Logo de la estación" 
                className="cabina-logo" 
            />

            {/* Nombre de la cabina recibido por props */}
            <h1 className="logo">{nombreCabina || "Mixtape"}</h1>
            <p className="lema">Música para los turnos largos de la estación</p>

            {/* Contador de favoritas */}
            {totalFavoritas !== undefined && (
                <p className="contador-favoritas">❤️ {totalFavoritas} favoritas</p>
            )}

            {total !== undefined && (
                <p className="contador">{total} canciones en la estación</p>
            )}
        </header>
    );
}

export default Encabezado;
