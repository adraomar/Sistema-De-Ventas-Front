import React from 'react'

const DashboardHome = () => {

    return (

        <div className="stats-grid">

            <div className="stat-card">

                <div className="stat-card-top">

                    <span className="stat-card-title">
                        Ventas Totales
                    </span>

                    <div className="stat-card-icon"></div>

                </div>

                <h2>
                    $84,250
                </h2>

                <span className="stat-change">
                    +12.4%
                </span>

            </div>

            <div className="stat-card">

                <div className="stat-card-top">

                    <span className="stat-card-title">
                        Clientes
                    </span>

                    <div className="stat-card-icon"></div>

                </div>

                <h2>
                    1,284
                </h2>

                <span className="stat-change">
                    +8.1%
                </span>

            </div>

            <div className="stat-card">

                <div className="stat-card-top">

                    <span className="stat-card-title">
                        Productos
                    </span>

                    <div className="stat-card-icon"></div>

                </div>

                <h2>
                    342
                </h2>

                <span className="stat-change">
                    +3.2%
                </span>

            </div>

            <div className="stat-card">

                <div className="stat-card-top">

                    <span className="stat-card-title">
                        Ingresos
                    </span>

                    <div className="stat-card-icon"></div>

                </div>

                <h2>
                    $12,840
                </h2>

                <span className="stat-change">
                    +18.7%
                </span>

            </div>

        </div>

    )
}

export default DashboardHome