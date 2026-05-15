import React, { useState, useEffect } from "react";
import api from "../../../api/api.js";

const AdminNew = () => {
    const [roles, setRoles] = useState([]);

    const [form, setForm] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        firstname: "",
        lastname: "",
        email: "",
        rolid: ""
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // Obtener roles
    const fetchRoles = async () => {
        try {
            const response = await api.get("/roles");
            setRoles(response.data);
        } catch (err) {
            console.error(err);
            setError("Error al obtener los roles");
        }
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    // Manejar cambios
    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Enviar formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        // Validaciones básicas
        if (
            !form.username ||
            !form.password ||
            !form.confirmPassword ||
            !form.firstname ||
            !form.lastname ||
            !form.email ||
            !form.rolid
        ) {
            return setError("Todos los campos son obligatorios");
        }

        if (form.password !== form.confirmPassword) {
            return setError("Las contraseñas no coinciden");
        }

        try {
            setLoading(true);

            const payload = {
                username: form.username,
                password: form.password,
                firstname: form.firstname,
                lastname: form.lastname,
                email: form.email,
                rolid: parseInt(form.rolid)
            };

            const response = await api.post("/users", payload);

            setMessage("Usuario creado correctamente");

            // Limpiar formulario
            setForm({
                username: "",
                password: "",
                confirmPassword: "",
                firstname: "",
                lastname: "",
                email: "",
                rolid: ""
            });

            console.log(response.data);

        } catch (err) {
            console.error(err);

            setError(
                err.response?.data?.message ||
                "Error al crear el usuario"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <div className="card shadow-sm">
                <div className="card-header">
                    <h3>Nuevo Usuario</h3>
                </div>

                <div className="card-body">

                    {message && (
                        <div className="alert alert-success">
                            {message}
                        </div>
                    )}

                    {error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label className="form-label">
                                Usuario
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    Nombre
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="firstname"
                                    value={form.firstname}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    Apellido
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="lastname"
                                    value={form.lastname}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Correo Electrónico
                            </label>

                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Rol
                            </label>

                            <select
                                className="form-select"
                                name="rolid"
                                value={form.rolid}
                                onChange={handleChange}
                            >
                                <option value="">
                                    Seleccionar Rol
                                </option>

                                {roles.map((rol) => (
                                    <option
                                        key={rol.id}
                                        value={rol.id}
                                    >
                                        {rol.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    Contraseña
                                </label>

                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    Confirmar Contraseña
                                </label>

                                <input
                                    type="password"
                                    className="form-control"
                                    name="confirmPassword"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? "Creando..." : "Crear Usuario"}
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminNew;