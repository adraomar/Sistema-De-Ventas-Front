import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from "../../api/api.js";

const LoginForm = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: '',
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
            const res = await api.post("/auth/login", { 
                username: form.username, 
                password: form.password 
            });

            localStorage.setItem("token", res.data.token);
            alert("Login exitoso");
            navigate('/dashboard');
        } catch (error) {
            alert("Error en login. Error: " + error);
        }
    };
    
    const handleClick = () => {
        navigate('/register');
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

            <button type="submit" className="btn btn-primary w-100 mt-3">
                Conectarse
            </button>

            <button type="button" className="btn btn-secondary w-100 mt-3" onClick={handleClick}>
                Crear cuenta
            </button>

        </form>
    )
}

export default LoginForm