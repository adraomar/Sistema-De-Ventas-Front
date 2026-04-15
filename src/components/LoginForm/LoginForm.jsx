import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from "../../api/api";

const LoginForm = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setForm({
            ...form, [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/users/login", { email, password });
            localStorage.setItem("token", res.data.token);
            alert("Login exitoso");
            navigate('/dashboard');
        } catch (error) {
            alert("Error en login");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Nombre de usuario</label>
                <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={form.email}
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

            <button type="submit" className="btn btn-primary w-100 mt-3">
                Conectarse
            </button>

        </form>
    )
}

export default LoginForm