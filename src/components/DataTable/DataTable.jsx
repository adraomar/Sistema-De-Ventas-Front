import React, { useMemo, useState } from 'react';

import './DataTable.css';

const DataTable = ({
    title,
    columns,
    data,
    onEdit,
    onDelete,
    onCreate,
    search,
    setSearch
}) => {

    /* PAGINATION */

    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;

    /* FILTER */

    const filteredData = useMemo(() => {

        return data.filter((item) =>

            Object.values(item)
                .join(" ")
                .toLowerCase()
                .includes(search.toLowerCase())
        );

    }, [data, search]);

    /* TOTAL PAGES */

    const totalPages =
        Math.ceil(filteredData.length / itemsPerPage);

    /* CURRENT DATA */

    const currentData = filteredData.slice(

        (currentPage - 1) * itemsPerPage,

        currentPage * itemsPerPage
    );

    /* PAGE CHANGE */

    const changePage = (page) => {

        if (page < 1 || page > totalPages) return;

        setCurrentPage(page);
    };

    return (

        <div className="datatable-container">

            {/* HEADER */}

            <div className="datatable-header">

                <div>

                    <h2>
                        {title}
                    </h2>

                    <p>
                        Administra y visualiza tus registros.
                    </p>

                </div>

                <button
                    className="datatable-create-btn"
                    onClick={onCreate}
                >

                    + Nuevo

                </button>

            </div>

            {/* SEARCH */}

            <div className="datatable-search">

                <input
                    type="text"
                    placeholder="Buscar..."
                    value={search}
                    onChange={(e) => {

                        setSearch(e.target.value);

                        setCurrentPage(1);
                    }}
                />

            </div>

            {/* TABLE */}

            <div className="datatable-wrapper">

                <table className="datatable">

                    <thead>

                        <tr>

                            {
                                columns.map((column, index) => (

                                    <th key={index}>
                                        {column}
                                    </th>

                                ))
                            }

                            <th>
                                Acciones
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            currentData.map((item, index) => (

                                <tr key={index}>

                                    {
                                        Object.values(item).map((value, index) => (

                                            <td key={index}>

                                                {value}

                                            </td>

                                        ))
                                    }

                                    <td>

                                        <div className="datatable-actions">

                                            <button
                                                className="edit-btn"
                                                onClick={() => onEdit(item)}
                                            >

                                                Editar

                                            </button>

                                            <button
                                                className="delete-btn"
                                                onClick={() => onDelete(item)}
                                            >

                                                Eliminar

                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))
                        }

                    </tbody>

                </table>

            </div>

            {/* PAGINATION */}

            <div className="datatable-pagination">

                <button
                    className="pagination-btn"
                    onClick={() =>
                        changePage(currentPage - 1)
                    }
                    disabled={currentPage === 1}
                >

                    Anterior

                </button>

                <div className="pagination-pages">

                    {
                        [...Array(totalPages)].map((_, index) => (

                            <button
                                key={index}

                                className={
                                    currentPage === index + 1
                                        ? "pagination-number active"
                                        : "pagination-number"
                                }

                                onClick={() =>
                                    changePage(index + 1)
                                }
                            >

                                {index + 1}

                            </button>

                        ))
                    }

                </div>

                <button
                    className="pagination-btn"
                    onClick={() =>
                        changePage(currentPage + 1)
                    }
                    disabled={currentPage === totalPages}
                >

                    Siguiente

                </button>

            </div>

        </div>

    )
}

export default DataTable;