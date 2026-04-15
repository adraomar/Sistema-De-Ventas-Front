import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate()

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
                    <Outlet />
                </div>

            </div>
        </div>
    )
}

export default Dashboard