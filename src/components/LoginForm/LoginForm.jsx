import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

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

    const handleSubmit = (e) => {
        e.preventDefault()

        if (form.email == "admin@admin" && form.password == "4275591") {
            navigate('/dashboard')
        } else if(!form.email || !form.password) {
            alert('Completa todos los campos')
        } else {
            alert('Nombre de usuario y/o contraseña no son válidos.');
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