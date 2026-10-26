function ListaPedidos({ pedidos, onMarcar, onBorrar }) {
    const pendientes = pedidos.filter((p) => !p.sono).length;

    return (
        <section className="cola">
            <h2 className="seccion-titulo">Cola de pedidos</h2>
            <p className="cola-contador">{pendientes} por sonar</p>

            {pedidos.length === 0 ? (
                <p className="cola-vacia">Aún no hay pedidos en la cola.</p>
            ) : (
                <ul className="cola-lista">
                    {pedidos.map((p) => (
                        <li key={p.id} className={p.sono ? "pedido-item sono" : "pedido-item"}>
                            <div className="pedido-texto">
                                <span className="pedido-titulo">{p.titulo}</span>
                                <span className="pedido-quien">pedida por {p.quien}</span>
                            </div>
                            <div className="pedido-acciones">
                                <button className="boton-mini" onClick={() => onMarcar(p.id)}>
                                    {p.sono ? "Desmarcar" : "Ya sonó"}
                                </button>
                                <button className="boton-mini boton-mini-peligro" onClick={() => onBorrar(p.id)}>
                                    Quitar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

export default ListaPedidos;