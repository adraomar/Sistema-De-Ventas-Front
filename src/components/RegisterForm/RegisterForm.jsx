import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from "../../api/api.js";

const RegisterForm = () => {
    const navigate = useNavigate();
    
    const [form, setForm] = useState({
        username: '',
        password: '',
        email: '',
        lastname: '',
        firstname: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/auth/register", {
                username: form.username,
                password: form.password,
                email: form.email,
                lastname: form.lastname,
                firstname: form.firstname
            });

            localStorage.setItem("token", res.data.token);
            alert("Login exitoso");
            navigate('/dashboard');
        } catch (error) {
            alert("Error en login. Error: " + error);
        }
    };

    const handleClick = () => {
        navigate('/');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Nombre de usuario</label>
                <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Correo electrónico</label>
                <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Apellido</label>
                <input
                    type="text"
                    className="form-control"
                    name="lastname"
                    value={form.lastname}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Nombres</label>
                <input
                    type="text"
                    className="form-control"
                    name="firstname"
                    value={form.firstname}
                    onChange={handleChange}
                />
            </div>

            <button type="submit" className="btn btn-success w-100 mt-3">
                Registrarse
            </button>

            <button type="button" className="btn btn-secondary w-100 mt-3" onClick={handleClick}>
                Cancelar
            </button>

        </form>
    )
}

export default RegisterForm