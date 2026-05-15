import LoginForm from '../components/LoginForm/LoginForm'
import imgLogo from '../assets/images/cutisfy-logo.png'
import '../components/LoginForm/LoginForm.css'

const LoginPage = () => {
    return (
        <div className="login-container">
            {/* BACKGROUND EFFECTS */}
            <div className="bg-glow bg-glow-1"></div>
            <div className="bg-glow bg-glow-2"></div>
            <div className="container-box">

                {/* NAVBAR */}
                <nav className="navbar">
                    <div className="logo">
                        <img
                            src={imgLogo}
                            className="img-logo"
                            alt="Cutisfy Logo"
                        />
                        <span>Cutisfy</span>
                    </div>
                </nav>

                {/* LOGIN */}
                <section className="login-wrapper">
                    <LoginForm />
                </section>
            </div>
        </div>
    )
}

export default LoginPage