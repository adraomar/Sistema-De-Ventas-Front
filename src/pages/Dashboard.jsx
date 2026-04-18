import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import api from "../api/api.js";
import Sidebar from '../components/Dashboard/Sidebar/Sidebar.jsx';
import Navbar from '../components/Dashboard/Navbar/Navbar.jsx';
import "../components/Dashboard/Dashboard.css";
import "../components/Dashboard/Dashboard.js";

const Dashboard = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate()

    useEffect(() => {
        const getUser = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await api.get("/users/user", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setUser(res.data);
            } catch (error) {
                console.log("Error: ", error);
            }
        };

        getUser();
    }, []);

    return (
        <>
            <Navbar user={user}/>
            <div id="layoutSidenav">
                <Sidebar user={user}/>
                <div id="layoutSidenav_content">
                    <main>
                        <Outlet/>
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