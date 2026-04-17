import React from 'react'
import RegisterForm from '../components/RegisterForm/RegisterForm'

const RegisterPage = () => {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow p-4" style={{ width: '350px' }}>
                <h3 className="text-center mb-4">Sistema de Ventas</h3>
                <RegisterForm />
            </div>
        </div>
    )
}

export default RegisterPage