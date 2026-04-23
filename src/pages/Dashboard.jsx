import React from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Dashboard/Sidebar/Sidebar.jsx';
import Navbar from '../components/Dashboard/Navbar/Navbar.jsx';
import "../components/Dashboard/Dashboard.css";
import "../components/Dashboard/Dashboard.js";

const Dashboard = () => {
    return (
        <>
            <Navbar/>
            <div id="layoutSidenav">
                <Sidebar />
                <div id="layoutSidenav_content">
                    <main>
                        <Outlet />
                    </main>
                    <footer className="py-4 bg-light mt-auto">
                        <div className="container-fluid px-4">
                            <div className="d-flex align-items-center justify-content-between small">
                                <div className="text-muted">Copyright &copy; Puesto de Ventas 1.0 - Todos los derechos reservados 2026</div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
}

export default Dashboard