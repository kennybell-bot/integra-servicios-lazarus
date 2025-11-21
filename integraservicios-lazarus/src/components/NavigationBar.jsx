import React from 'react';
import './NavigationBar.css';
import Logo from '../assets/logo.png';

const NavigationBar = ({ onRegisterClick, onLogoClick }) => {
    return (
        <nav className="barra">
            <img
                src={Logo}
                alt="Logo"
                className="logotipo"
                onClick={onLogoClick}
                onKeyDown={(e) => { if (e.key === 'Enter') onLogoClick && onLogoClick(); }}
                role="button"
                tabIndex={0}
                style={{ cursor: 'pointer' }}
            />
            <div className="actions">
                <button>Iniciar Sesión</button>
                <button onClick={onRegisterClick}>Registrarse</button>
            </div>
        </nav>
    );
};

export default NavigationBar;