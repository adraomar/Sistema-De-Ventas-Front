import React, { useState, useEffect } from "react";

const SalesList = () => {
    const [sales, setSales] = useState([
        { id: 1, product: "Auriculares", customer: "Juan Perez", quantity: 2, price: 1500 },
        { id: 2, product: "Teclado", customer: "Maria Lopez", quantity: 1, price: 3000 },
        { id: 3, product: "Mouse", customer: "Carlos Gomez", quantity: 3, price: 800 },
        { id: 4, product: "Monitor", customer: "Ana Fernandez", quantity: 1, price: 45000 },
        { id: 5, product: "Notebook", customer: "Luis Martinez", quantity: 1, price: 350000 },
        { id: 6, product: "Tablet", customer: "Sofia Ramirez", quantity: 2, price: 120000 },
        { id: 7, product: "Webcam", customer: "Diego Sanchez", quantity: 1, price: 9000 },
        { id: 8, product: "Microfono", customer: "Valentina Torres", quantity: 1, price: 15000 },
        { id: 9, product: "Impresora", customer: "Mateo Diaz", quantity: 1, price: 80000 },
        { id: 10, product: "Router", customer: "Camila Herrera", quantity: 2, price: 20000 },
        { id: 11, product: "SSD", customer: "Lucas Castro", quantity: 2, price: 25000 },
        { id: 12, product: "RAM", customer: "Martina Rojas", quantity: 4, price: 15000 },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [editingSale, setEditingSale] = useState(null);

    const [form, setForm] = useState({
        product: "",
        customer: "",
        quantity: 1,
        price: 0
    });

    // 🔍 BUSCADOR
    const [search, setSearch] = useState("");

    // 🔹 PAGINACIÓN
    const [currentPage, setCurrentPage] = useState(1);
    const salesPerPage = 5;

    // FILTRADO
    const filteredSales = sales.filter(s =>
        s.customer.toLowerCase().includes(search.toLowerCase())
    );

    const indexOfLast = currentPage * salesPerPage;
    const indexOfFirst = indexOfLast - salesPerPage;
    const currentSales = filteredSales.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredSales.length / salesPerPage);

    // 🔥 Evita páginas vacías después de borrar o buscar
    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages || 1);
        }
    }, [filteredSales]);

    const handleShow = (sale = null) => {
        setEditingSale(sale);
        setForm(sale ? sale : { product: "", customer: "", quantity: 1, price: 0 });
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setEditingSale(null);
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        if (editingSale) {
            setSales(sales.map(s => s.id === editingSale.id ? form : s));
        } else {
            const newSale = {
                ...form,
                id: Date.now()
            };
            setSales([...sales, newSale]);
        }
        handleClose();
    };

    const handleDelete = (id) => {
        if (window.confirm("¿Eliminar venta?")) {
            setSales(sales.filter(s => s.id !== id));
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Gestión de Ventas</h2>

            {/* 🔍 BUSCADOR */}
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar por cliente..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <button className="btn btn-primary mb-3" onClick={() => handleShow()}>
                + Nueva Venta
            </button>

            <table className="table table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Producto</th>
                        <th>Cliente</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Total</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentSales.map(sale => (
                        <tr key={sale.id}>
                            <td>{sale.id}</td>
                            <td>{sale.product}</td>
                            <td>{sale.customer}</td>
                            <td>{sale.quantity}</td>
                            <td>${sale.price}</td>
                            <td>${sale.quantity * sale.price}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => handleShow(sale)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(sale.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* 🔹 PAGINACIÓN */}
            <nav>
                <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 && "disabled"}`}>
                        <button
                            className="page-link"
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            Anterior
                        </button>
                    </li>

                    {[...Array(totalPages)].map((_, i) => (
                        <li
                            key={i}
                            className={`page-item ${currentPage === i + 1 && "active"}`}
                        >
                            <button
                                className="page-link"
                                onClick={() => setCurrentPage(i + 1)}
                            >
                                {i + 1}
                            </button>
                        </li>
                    ))}

                    <li className={`page-item ${currentPage === totalPages && "disabled"}`}>
                        <button
                            className="page-link"
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            Siguiente
                        </button>
                    </li>
                </ul>
            </nav>

            {/* MODAL */}
            {showModal && (
                <div className="modal fade show d-block">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {editingSale ? "Editar Venta" : "Nueva Venta"}
                                </h5>
                                <button className="btn-close" onClick={handleClose}></button>
                            </div>

                            <div className="modal-body">
                                <div className="mb-3">
                                    <label>Producto</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="product"
                                        value={form.product}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label>Cliente</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="customer"
                                        value={form.customer}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label>Cantidad</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="quantity"
                                        value={form.quantity}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label>Precio</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="price"
                                        value={form.price}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="alert alert-info">
                                    Total: ${form.quantity * form.price}
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={handleClose}>
                                    Cancelar
                                </button>
                                <button className="btn btn-primary" onClick={handleSubmit}>
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showModal && <div className="modal-backdrop fade show"></div>}
        </div>
    );
};

export default SalesList;