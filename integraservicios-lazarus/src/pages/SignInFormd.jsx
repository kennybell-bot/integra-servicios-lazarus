import React from 'react';
import Logo from '../assets/logo.png';
import './SignInForm.css';

const SignInFormd = ({ onSignInSuccess }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí podrías validar credenciales antes de llamar al callback
        if (onSignInSuccess) onSignInSuccess();
    };

    return (
        <div className="signInFormView">
            <form className="signInForm" onSubmit={handleSubmit}>
                <img src={Logo} alt="Logo" className="logotipoForm"/>
                <h1>Sistema de Gestión de Recursos</h1>
                <p>Plataforma de Reservas</p>
                
                <label  htmlFor="email">Correo Institucional</label>
                <input id="email" name="email" type="text" placeholder="usuario@university.edu.co" />

                <label  htmlFor="password">Contraseña</label>
                <input id="password" name="password" type="password" placeholder="********" />

                <button type="submit" className="registerButton">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default SignInFormd;