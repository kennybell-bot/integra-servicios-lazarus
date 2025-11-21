import React from "react";
import Logo from '../assets/logo.png';
import './RegisterForm.css';

const RegisterForm = () => {
    return (
        <div className="registerFormView">
            <form className="registerForm">
                <img src={Logo} alt="Logo" className="logotipoForm"/>
                <h1>Crear Cuenta</h1>
                <p>Regístrate para acceder al sistema de gestión de recursos</p>

                <label htmlFor="name">Nombre Completo</label>
                <input tid="name" name="name" type="text" placeholder="Juan Pérez" />

                <label  htmlFor="studentId">Código Estudiantil o Administrativo</label>
                <input id="studentId" name="studentId" type="text" placeholder="20231234567" />
                
                <label  htmlFor="email">Correo Institucional</label>
                <input id="email" name="email" type="text" placeholder="usuario@university.edu.co" />

                <label  htmlFor="password">Contraseña</label>
                <input id="password" name="password" type="password" placeholder="********" />

                <button className="registerButton">Registrarse</button>
            </form>
        </div>
    );
};

export default RegisterForm;