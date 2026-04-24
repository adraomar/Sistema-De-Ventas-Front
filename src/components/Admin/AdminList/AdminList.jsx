import React, { useState, useEffect } from "react";
import api from "../../../api/api.js";

const AdminList = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const [form, setForm] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        lastname: "",
        firstname: ""
    });

    const [search, setSearch] = useState("");

    // 🔹 PAGINACIÓN
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    const indexOfLast = currentPage * usersPerPage;
    const indexOfFirst = indexOfLast - usersPerPage;
    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.lastname.toLowerCase().includes(search.toLocaleLowerCase()) ||
        user.firstname.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );

    const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(users.length / usersPerPage);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages || 1);
        }
    }, [filteredUsers]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await api.get("/users/");
            const data = await response.data;
            setUsers(data);
        } catch (error) {
            console.error("Error al cargar usuarios: ", error);
        }
    };

    const handleShow = (user = null) => {
        setEditingUser(user);

        setForm(
            user
                ? {
                    ...user,
                    password: "",
                    confirmPassword: ""
                }
                : {
                    username: "",
                    password: "",
                    confirmPassword: "",
                    email: "",
                    lastname: "",
                    firstname: ""
                }
        );

        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setEditingUser(null);
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        // Validación de contraseñas
        if (form.password !== form.confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        try {
            // Armamos el payload que irá al backend
            const payload = {
                username: form.username,
                password: form.password,
                email: form.email,
                lastname: form.lastname,
                firstname: form.firstname
            };

            if (editingUser) {
                // EDITAR USUARIO
                await api.put(`/users/${editingUser.id}/`, payload);
                alert("Usuario actualizado correctamente");
            } else {
                // CREAR USUARIO
                await api.post("/users/", payload);
                alert("Usuario creado correctamente");
            }

            // Recargar lista desde backend
            fetchUsers();

            // Cerrar modal
            handleClose();

        } catch (error) {
            console.error("Error al guardar usuario:", error);
            alert("Ocurrió un error al guardar el usuario");
        }
    };

    const handleDelete = (id) => {
        if (window.confirm("¿Eliminar usuario?")) {
            setUsers(users.filter(u => u.id !== id));
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Administrar Usuarios</h2>

            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar por usuario, apellido, nombres o correo electrónico..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1); // reset a página 1
                    }}
                />
            </div>

            <button className="btn btn-primary mb-3" onClick={() => handleShow()}>
                + Nuevo Usuario
            </button>

            <table className="table table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Apellido y Nombre</th>
                        <th>Usuario</th>
                        <th>Correo electrónico</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.lastname}, {user.firstname}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => handleShow(user)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(user.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* 🔹 PAGINACIÓN UI */}
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
                                    {editingUser ? "Editar Usuario" : "Nuevo Usuario"}
                                </h5>
                                <button className="btn-close" onClick={handleClose}></button>
                            </div>

                            <div className="modal-body">
                                <div className="mb-3">
                                    <label>Apellido</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="lastname"
                                        value={form.lastname}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label>Nombres</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="firstname"
                                        value={form.firstname}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label>Nombre de usuario</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        value={form.username}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label>Contraseña</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label>Confirmar contraseña</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="confirmPassword"
                                        value={form.confirmPassword}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                    />
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

export default AdminList;