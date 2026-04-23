import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../../../context/userContext.js';

const Navbar = () => {
    const navigate = useNavigate();
    const { user } = useContext(userContext);

    const handleClick = () => {
        navigate("/");
    };

    return (
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <Link className="navbar-brand ps-3" to="/dashboard">Puesto de Ventas</Link>
            <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                <div className="input-group">
                    <input className="form-control" type="text" placeholder="Buscar..." aria-label="Buscar..." aria-describedby="btnNavbarSearch" />
                    <button className="btn btn-primary" id="btnNavbarSearch" type="button"><i className="fas fa-search"></i></button>
                </div>
            </form>
            <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" id="navbarDropdown" to="/dashboard" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i> {user?.username}</Link>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">

                        <li><Link className="dropdown-item" to="settings">
                            Ajustes
                        </Link></li>
                        <li><Link className="dropdown-item" to="users">
                            Preferencias
                        </Link></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" onClick={handleClick}>Desconectarse</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar