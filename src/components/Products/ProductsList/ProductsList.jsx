import React, { useState } from 'react'

const ProductsList = () => {
    const [products, setProducts] = useState([
        { id: 1, name: 'Producto 1', price: 1000, stock: 10 },
        { id: 2, name: 'Producto 2', price: 2000, stock: 5 }
    ])

    const [search, setSearch] = useState('')

    const [formData, setFormData] = useState({
        id: null,
        name: '',
        price: '',
        stock: ''
    })

    const [isEditing, setIsEditing] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (isEditing) {
            setProducts(products.map(p => p.id === formData.id ? formData : p))
        } else {
            setProducts([...products, { ...formData, id: Date.now() }])
        }

        resetForm()
    }

    const handleEdit = (product) => {
        setFormData(product)
        setIsEditing(true)
    }

    const handleDelete = (id) => {
        if (window.confirm('¿Eliminar producto?')) {
            setProducts(products.filter(p => p.id !== id))
        }
    }

    const resetForm = () => {
        setFormData({ id: null, name: '', price: '', stock: '' })
        setIsEditing(false)
    }

    // 🔍 FILTRO
    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Administrar Productos</h2>

                <button
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#productModal"
                    onClick={resetForm}
                >
                    + Nuevo Producto
                </button>
            </div>

            {/* 🔎 BUSCADOR */}
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar producto..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* TABLA */}
            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((p, index) => (
                                <tr key={p.id}>
                                    <td>{index + 1}</td>
                                    <td>{p.name}</td>
                                    <td>${p.price}</td>
                                    <td>{p.stock}</td>
                                    <td>
                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            data-bs-toggle="modal"
                                            data-bs-target="#productModal"
                                            onClick={() => handleEdit(p)}
                                        >
                                            Editar
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(p.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    No hay resultados
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* MODAL */}
            <div className="modal fade" id="productModal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form onSubmit={handleSubmit}>
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {isEditing ? 'Editar Producto' : 'Nuevo Producto'}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                ></button>
                            </div>

                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Nombre</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Precio</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Stock</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="stock"
                                        value={formData.stock}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Cancelar
                                </button>

                                <button type="submit" className="btn btn-success">
                                    {isEditing ? 'Actualizar' : 'Guardar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductsList