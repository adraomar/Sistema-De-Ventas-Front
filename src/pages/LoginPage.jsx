import React, { useState } from 'react'
import LoginForm from '../components/LoginForm/LoginForm';

const LoginPage = () => {

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow p-4" style={{ width: '350px' }}>
                <h3 className="text-center mb-4">Sistema de Ventas</h3>
                <LoginForm/>
            </div>
        </div>
    )
}

export default LoginPage