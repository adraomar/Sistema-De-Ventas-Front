import React, { useState } from 'react'

const ProductsList = () => {
    const [products, setProducts] = useState([
        { id: 1, name: 'Producto 1', price: 100 },
        { id: 2, name: 'Producto 2', price: 200 },
        { id: 3, name: 'Producto 3', price: 300 },
        { id: 4, name: 'Producto 4', price: 400 },
        { id: 5, name: 'Producto 5', price: 500 },
        { id: 6, name: 'Producto 6', price: 600 },
        { id: 7, name: 'Producto 7', price: 700 },
        { id: 8, name: 'Producto 8', price: 800 },
        { id: 9, name: 'Producto 9', price: 900 },
        { id: 10, name: 'Producto 10', price: 1000 },
        { id: 11, name: 'Producto 11', price: 1100 },
        { id: 12, name: 'Producto 12', price: 1200 }
    ])

    const [search, setSearch] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [currentProduct, setCurrentProduct] = useState({
        id: null,
        name: '',
        price: ''
    })

    // 👉 PAGINACIÓN
    const [currentPage, setCurrentPage] = useState(1)
    const productsPerPage = 10

    // Filtrar productos
    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    )

    // Resetear página al buscar
    const handleSearch = (value) => {
        setSearch(value)
        setCurrentPage(1)
    }

    // Calcular productos a mostrar
    const indexOfLast = currentPage * productsPerPage
    const indexOfFirst = indexOfLast - productsPerPage
    const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast)

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

    // CRUD
    const handleCreate = () => {
        setCurrentProduct({ id: null, name: '', price: '' })
        setShowModal(true)
    }

    const handleEdit = (product) => {
        setCurrentProduct(product)
        setShowModal(true)
    }

    const handleSave = () => {
        if (!currentProduct.name || !currentProduct.price) return

        if (currentProduct.id) {
            setProducts(products.map(p =>
                p.id === currentProduct.id ? currentProduct : p
            ))
        } else {
            const newProduct = {
                ...currentProduct,
                id: Date.now()
            }
            setProducts([...products, newProduct])
        }

        setShowModal(false)
    }

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
                    onChange={(e) => handleSearch(e.target.value)}
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
                    {currentProducts.map(product => (
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

            {/* 👉 PAGINACIÓN UI */}
            <nav>
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
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
                            className={`page-item ${currentPage === i + 1 && 'active'}`}
                        >
                            <button
                                className="page-link"
                                onClick={() => setCurrentPage(i + 1)}
                            >
                                {i + 1}
                            </button>
                        </li>
                    ))}

                    <li className={`page-item ${currentPage === totalPages && 'disabled'}`}>
                        <button
                            className="page-link"
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            Siguiente
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default ProductsList