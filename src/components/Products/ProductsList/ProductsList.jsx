import React, { useState, useEffect, use } from 'react'
import api from "../../../api/api.js";
import DataTable from '../../DataTable/DataTable'

const ProductsList = () => {
    const [products, setProducts] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await api.get("/products/");
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    )

    const handleCreate = () => {
        console.log("Crear Producto");
    }

    const handleEdit = (product) => {
        console.log("Editar Producto:", product);
    }

    const handleDelete = (product) => {
        console.log("Eliminar Producto ID:", product.id);
    }

    /* DATA */

    const formattedProducts = products.map((product) => ({

        id: product.id,
        name: product.name,
        price: product.price,
        stock: product.stock
    }));

    return (
        <DataTable title="Administrar Productos"
            columns={["ID", "Nombre", "Precio ($)", "Stock"]}
            data={formattedProducts}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onCreate={handleCreate}
            search={search}
            setSearch={setSearch}
        />
    )
}

export default ProductsList