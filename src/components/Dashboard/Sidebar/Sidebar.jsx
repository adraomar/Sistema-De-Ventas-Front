import React, { useContext } from 'react'
import { Link, useLocation } from "react-router-dom";
import imgLogo from "../../../assets/images/cutisfy-logo.png";
import { userContext } from '../../../context/userContext';

const Sidebar = () => {

    const { user } = useContext(userContext);

    const location = useLocation();

    return (

        <aside className="sidebar">

            <div>

                {/* LOGO */}

                <div className="logo">

                    <img
                        src={imgLogo}
                        className="img-logo"
                        alt="Cutisfy Logo"
                    />

                    <div className="logo-text">

                        <span className="logo-title">
                            Cutisfy
                        </span>

                        <span className="logo-subtitle">
                            Enterprise Dashboard
                        </span>

                    </div>

                </div>

                {/* MENU */}

                <nav className="sidebar-menu">

                    <Link
                        to="/dashboard"
                        className={`sidebar-btn ${location.pathname === "/dashboard"
                            ? "active"
                            : ""
                            }`}
                    >

                        <span>
                            Dashboard
                        </span>

                        <div className="sidebar-dot"></div>

                    </Link>

                    <Link
                        to="/sales"
                        className={`sidebar-btn ${location.pathname.includes("/sales")
                            ? "active"
                            : ""
                            }`}
                    >

                        <span>
                            Ventas
                        </span>

                        <div className="sidebar-dot"></div>

                    </Link>

                    <Link
                        to="/products"
                        className={`sidebar-btn ${location.pathname.includes("/products")
                            ? "active"
                            : ""
                            }`}
                    >

                        <span>
                            Productos
                        </span>

                        <div className="sidebar-dot"></div>

                    </Link>

                    <Link
                        to="/admin"
                        className={`sidebar-btn ${location.pathname.includes("/admin")
                            ? "active"
                            : ""
                            }`}
                    >

                        <span>
                            Usuarios
                        </span>

                        <div className="sidebar-dot"></div>

                    </Link>

                    <Link
                        to="/logs"
                        className={`sidebar-btn ${location.pathname.includes("/logs")
                            ? "active"
                            : ""
                            }`}
                    >

                        <span>
                            Logs
                        </span>

                        <div className="sidebar-dot"></div>

                    </Link>

                </nav>

            </div>

            {/* USER */}

            <div className="user-card">

                <div className="user-info">

                    <div className="user-avatar">

                        {
                            user?.firstname?.charAt(0)
                        }

                    </div>

                    <div>

                        <h3>
                            {user?.lastname}, {user?.firstname}
                        </h3>

                        <p>
                            Administrador
                        </p>

                    </div>

                </div>

            </div>

        </aside>

    )
}

export default Sidebar