function Seccion({ titulo, children }) {
    return (
        <section className="seccion">
            <h2 className="seccion-titulo">{titulo}</h2>
            {children}
        </section>
    );
}

export default Seccion;