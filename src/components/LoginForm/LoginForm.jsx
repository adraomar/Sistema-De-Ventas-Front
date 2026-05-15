import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showSuccess, showError } from "../../utils/alerts.js";
import api from "../../api/api.js";

const LoginForm = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);


        try {

            const res = await api.post("/auth/login", {
                username,
                password
            });

            localStorage.setItem("token", res.data.token);

            await showSuccess("Te has conectado correctamente.");
            setTimeout(() => {
                navigate("/dashboard");
            }, 300);
        } catch (error) {
            await showError(
                error.response?.data?.message ||
                "Error al iniciar sesión"
            );

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="login-card">

            <h1>Iniciar Sesión</h1>

            <p>
                Accede de forma segura a tu panel de control y continúa
                administrando tu negocio con protección de nivel empresarial.
            </p>

            <form onSubmit={handleSubmit}>

                <div className="input-group">

                    <i className="ri-mail-line"></i>

                    <input
                        type="text"
                        placeholder="Nombre de usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                </div>

                <div className="input-group">

                    <i className="ri-lock-password-line"></i>

                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                </div>

                <div className="options">

                    <a href="#" className="forgot">
                        ¿Olvidaste tu contraseña?
                    </a>

                </div>

                <button
                    type="submit"
                    className="login-btn"
                    disabled={loading}
                >

                    {
                        loading
                            ? <div className="spinner"></div>
                            : "Conectarse"
                    }

                </button>

            </form>

        </div>
    )
}

export default LoginForm;