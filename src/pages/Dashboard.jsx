import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import api from "../api/api.js";
import Sidebar from '../components/Dashboard/Sidebar/Sidebar.jsx';

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

    const handleLogout = () => {
        // limpiar sesión (después podés usar localStorage o JWT)
        navigate('/')
    }

    return (
        <div className="d-flex">

            {/* SIDEBAR */}
            <Sidebar/>

            {/* CONTENIDO */}
            <div className="flex-grow-1">

                {/* NAVBAR */}
                <nav className="navbar navbar-light bg-light shadow-sm px-4 d-flex justify-content-between">

                    {/* IZQUIERDA */}
                    <span className="navbar-brand mb-0 h5">Dashboard</span>

                    {/* DERECHA */}
                    <div className="d-flex align-items-center gap-3">
                        <span>
                            {user?.lastname}, {user?.firstname}
                        </span>

                        <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={handleLogout}
                        >
                            Cerrar sesión
                        </button>
                    </div>

                </nav>

                {/* CONTENIDO DINÁMICO */}
                <div className="p-4">
                </div>

            </div>
        </div>
    )
}

export default Dashboard