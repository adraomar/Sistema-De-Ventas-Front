import React from 'react'
import { Link } from "react-router-dom";


const Sidebar = () => {
    return (
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
    )
}

export default Sidebar