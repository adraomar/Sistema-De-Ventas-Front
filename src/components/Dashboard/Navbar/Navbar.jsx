import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';

import { userContext } from '../../../context/userContext.js';

const Navbar = () => {

    const navigate = useNavigate();

    const { user } = useContext(userContext);

    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/");
    };

    return (

        <header className="dashboard-navbar">

            {/* LEFT */}

            <div>

                <h1 className="dashboard-title">
                    Dashboard
                </h1>

                <p className="dashboard-subtitle">
                    Bienvenido nuevamente, {user?.firstname}
                </p>

            </div>

            {/* RIGHT */}

            <div className="navbar-actions">

                {/* SEARCH */}

                <div className="search-box">

                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="search-input"
                    />

                </div>

                {/* USER */}

                <div className="navbar-user">

                    <div className="navbar-avatar">

                        {
                            user?.firstname?.charAt(0)
                        }

                    </div>

                    <div className="navbar-user-info">

                        <span>
                            {user?.username}
                        </span>

                        <small>
                            Administrador
                        </small>

                    </div>

                </div>

                {/* LOGOUT */}

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >

                    Desconectarse

                </button>

            </div>

        </header>

    )
}

export default Navbar