import React from 'react';
import './NavigationBar.css';
import Logo from '../assets/logo.png';

const NavigationBar = () => {
    return (
        <nav className="barra">
            <img src={Logo} alt="Logo" className="logotipo"/>
            <div className="actions">
                <button>Iniciar Sesión</button>
                <button>Registrarse</button>
            </div>
        </nav>
    );
};

export default NavigationBar;