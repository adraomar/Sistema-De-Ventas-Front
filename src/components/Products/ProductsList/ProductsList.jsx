import React, { useState } from 'react'
import DataTable from '../../DataTable/DataTable'

const ProductsList = () => {
    const [products, setProducts] = useState([
        { id: 1, name: 'Producto 1', price: 100, stock: 5000 },
        { id: 2, name: 'Producto 2', price: 200, stock: 5000 },
        { id: 3, name: 'Producto 3', price: 300, stock: 5000 },
        { id: 4, name: 'Producto 4', price: 400, stock: 5000 },
        { id: 5, name: 'Producto 5', price: 500, stock: 5000 },
        { id: 6, name: 'Producto 6', price: 600, stock: 5000 },
        { id: 7, name: 'Producto 7', price: 700, stock: 5000 },
        { id: 8, name: 'Producto 8', price: 800, stock: 5000 },
        { id: 9, name: 'Producto 9', price: 900, stock: 5000 },
        { id: 10, name: 'Producto 10', price: 1000, stock: 5000 },
        { id: 11, name: 'Producto 11', price: 1100, stock: 5000 },
        { id: 12, name: 'Producto 12', price: 1200, stock: 5000 },
        { id: 13, name: 'Producto 1', price: 100, stock: 5000 },
        { id: 14, name: 'Producto 2', price: 200, stock: 5000 },
        { id: 15, name: 'Producto 3', price: 300, stock: 5000 },
        { id: 16, name: 'Producto 4', price: 400, stock: 5000 },
        { id: 17, name: 'Producto 5', price: 500, stock: 5000 },
        { id: 18, name: 'Producto 6', price: 600, stock: 5000 },
        { id: 19, name: 'Producto 7', price: 700, stock: 5000 },
        { id: 20, name: 'Producto 8', price: 800, stock: 5000 },
        { id: 21, name: 'Producto 9', price: 900, stock: 5000 },
        { id: 22, name: 'Producto 10', price: 1000, stock: 5000 },
        { id: 23, name: 'Producto 11', price: 1100, stock: 5000 },
        { id: 24, name: 'Producto 12', price: 1200, stock: 5000 }
    ])

    const [search, setSearch] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [currentProduct, setCurrentProduct] = useState({
        id: null,
        name: '',
        price: '',
        stock: ''
    })

    const [currentPage, setCurrentPage] = useState(1)
    const productsPerPage = 10

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    )

    const handleSearch = (value) => {
        setSearch(value)
        setCurrentPage(1)
    }

    const indexOfLast = currentPage * productsPerPage
    const indexOfFirst = indexOfLast - productsPerPage
    const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast)

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

    const handleCreate = () => {
        setCurrentProduct({ id: null, name: '', price: '', stock: '' })
        setShowModal(true)
    }

    const handleEdit = (product) => {
        setCurrentProduct(product)
        setShowModal(true)
    }

    const handleSave = () => {
        if (!currentProduct.name || !currentProduct.price || !currentProduct.stock) return

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
        <DataTable title="Administrar Productos"
            columns={["ID", "Nombre", "Precio ($)", "Stock"]}
            data={products}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onCreate={handleCreate}
            search={search}
            setSearch={setSearch}
        />
    )
}

export default ProductsList