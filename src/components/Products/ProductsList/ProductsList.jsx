import React, { useState } from 'react'

const ProductsList = () => {
    const [products, setProducts] = useState([
        { id: 1, name: 'Producto 1', price: 100 },
        { id: 2, name: 'Producto 2', price: 200 }
    ])

    const [search, setSearch] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [currentProduct, setCurrentProduct] = useState({
        id: null,
        name: '',
        price: ''
    })

    // Filtrar productos
    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    )

    // Abrir modal para crear
    const handleCreate = () => {
        setCurrentProduct({ id: null, name: '', price: '' })
        setShowModal(true)
    }

    // Abrir modal para editar
    const handleEdit = (product) => {
        setCurrentProduct(product)
        setShowModal(true)
    }

    // Guardar producto
    const handleSave = () => {
        if (!currentProduct.name || !currentProduct.price) return

        if (currentProduct.id) {
            // Editar
            setProducts(products.map(p =>
                p.id === currentProduct.id ? currentProduct : p
            ))
        } else {
            // Crear
            const newProduct = {
                ...currentProduct,
                id: Date.now()
            }
            setProducts([...products, newProduct])
        }

        setShowModal(false)
    }

    // Eliminar
    const handleDelete = (id) => {
        setProducts(products.filter(p => p.id !== id))
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Administrar Productos</h2>

            {/* Buscador + botón */}
            <div className="d-flex justify-content-between mb-3">
                <input
                    type="text"
                    className="form-control w-50"
                    placeholder="Buscar producto..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <button className="btn btn-primary" onClick={handleCreate}>
                    + Nuevo Producto
                </button>
            </div>

            {/* Tabla */}
            <table className="table table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => handleEdit(product)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(product.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal */}
            {showModal && (
                <div className="modal d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {currentProduct.id ? 'Editar' : 'Nuevo'} Producto
                                </h5>
                                <button
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>

                            <div className="modal-body">
                                <input
                                    type="text"
                                    className="form-control mb-3"
                                    placeholder="Nombre"
                                    value={currentProduct.name}
                                    onChange={(e) =>
                                        setCurrentProduct({
                                            ...currentProduct,
                                            name: e.target.value
                                        })
                                    }
                                />

                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio"
                                    value={currentProduct.price}
                                    onChange={(e) =>
                                        setCurrentProduct({
                                            ...currentProduct,
                                            price: e.target.value
                                        })
                                    }
                                />
                            </div>

                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancelar
                                </button>
                                <button
                                    className="btn btn-success"
                                    onClick={handleSave}
                                >
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductsList