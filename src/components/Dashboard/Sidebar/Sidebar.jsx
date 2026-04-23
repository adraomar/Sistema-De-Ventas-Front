import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { userContext } from '../../../context/userContext';


const Sidebar = () => {
    const { user } = useContext(userContext);

    return (
        <div id="layoutSidenav_nav">
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div className="sb-sidenav-menu">
                    <div className="nav">
                        <div className="sb-sidenav-menu-heading">Principal</div>
                        <Link className="nav-link" to="/dashboard">
                            <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                            Dashboard
                        </Link>
                        <div className="sb-sidenav-menu-heading">Gestion</div>
                        <Link className="nav-link collapsed" to="/sales" data-bs-toggle="collapse" data-bs-target="#collapseSales" aria-expanded="false" aria-controls="collapseSales">
                            <div className="sb-nav-link-icon"><i className="fa fa-shopping-bag" aria-hidden="true"></i></div>
                            Ventas
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </Link>
                        <div className="collapse" id="collapseSales" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link className="nav-link" to="/sales/new">Nueva venta</Link>
                                <Link className="nav-link" to="/sales/list">Listado de ventas</Link>
                            </nav>
                        </div>
                        <Link className="nav-link collapsed" to="/products" data-bs-toggle="collapse" data-bs-target="#collapseProducts" aria-expanded="false" aria-controls="collapseProducts">
                            <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                            Productos
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </Link>
                        <div className="collapse" id="collapseProducts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link className="nav-link" to="/products/new">Nueva producto</Link>
                                <Link className="nav-link" to="/products/list">Listado de productos</Link>
                            </nav>
                        </div>
                        <div className="sb-sidenav-menu-heading">Administracion</div>
                        <Link className="nav-link collapsed" to="/admin" data-bs-toggle="collapse" data-bs-target="#collapseAdmin" aria-expanded="false" aria-controls="collapseAdmin">
                            <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                            Usuarios
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </Link>
                        <div className="collapse" id="collapseAdmin" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link className="nav-link" to="/admin/new">Crear usuario</Link>
                                <Link className="nav-link" to="/admin/list">Listado de usuarios</Link>
                            </nav>
                        </div>
                        <Link className="nav-link" to="/logs">
                            <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                            Logs      
                        </Link>
                    </div>
                </div>
                <div className="sb-sidenav-footer">
                    <div className="small">Te has conectado como:</div>
                    {user?.lastname}, {user?.firstname}
                </div>
            </nav>
        </div>
    )
}

export default Sidebar