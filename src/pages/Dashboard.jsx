import React from 'react'
import { Outlet } from 'react-router-dom';

import Sidebar from '../components/Dashboard/Sidebar/Sidebar.jsx';
import Navbar from '../components/Dashboard/Navbar/Navbar.jsx';

import "../components/Dashboard/Dashboard.css";

const Dashboard = () => {

    return (

        <div className="dashboard">

            {/* GLOW */}

            <div className="bg-glow bg-glow-1"></div>
            <div className="bg-glow bg-glow-2"></div>

            <div className="dashboard-layout">

                {/* SIDEBAR */}

                <Sidebar />

                {/* CONTENT */}

                <div className="dashboard-content">

                    {/* NAVBAR */}

                    <Navbar />

                    {/* MAIN */}

                    <main className="dashboard-main">

                        <Outlet />

                    </main>

                    {/* FOOTER */}

                    <footer className="dashboard-footer">

                        <span>
                            Copyright © Cutisfy 1.0 - Todos los derechos reservados 2026
                        </span>

                    </footer>

                </div>

            </div>

        </div>

    )
}

export default Dashboard