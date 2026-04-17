import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import api from "../api/api.js";

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await api.get("/users");
                setUsers(res.data);
            } catch (error) {
                console.log("Error: ", error);
            }
        };

        fetchUsers();
    }, []);

    const handleLogout = () => {
        // limpiar sesión (después podés usar localStorage o JWT)
        navigate('/')
    }

    return (
        <div className="d-flex">

            {/* SIDEBAR */}
            <div className="bg-dark text-white p-3 vh-100" style={{ width: '250px' }}>
                <h4 className="text-center mb-4">Mi Panel</h4>

                <ul className="nav flex-column">
                    <li className="nav-item mb-2">
                        <Link to="/dashboard" className="nav-link text-white">🏠 Inicio</Link>
                    </li>

                    <li className="nav-item mb-2">
                        <Link to="/dashboard/users" className="nav-link text-white">👤 Usuarios</Link>
                    </li>

                    <li className="nav-item mb-2">
                        <Link to="/dashboard/settings" className="nav-link text-white">⚙️ Configuración</Link>
                    </li>
                </ul>
            </div>

            {/* CONTENIDO */}
            <div className="flex-grow-1">

                {/* NAVBAR */}
                <nav className="navbar navbar-light bg-light shadow-sm px-4">
                    <span className="navbar-brand mb-0 h5">Dashboard</span>

                    <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
                        Cerrar sesión
                    </button>
                </nav>

                {/* CONTENIDO DINÁMICO */}
                <div className="p-4">
                    {users.map(user => (
                        <div key={user.id}>
                            <h3 className="h3">{user.lastname}, {user.firstname}</h3>
                            <h4 className="h4">Nombre de usuario: {user.username}</h4>
                            <h4 className="h4">Correo electrónico: {user.email}</h4>
                            <hr></hr>
                        </div>
                        
                    ))}
                </div>

            </div>
        </div>
    )
}

export default Dashboard