import React, { useState } from 'react';
import Logo from '../assets/logo.png';
import './SignInForm.css';

const SignInFormd = ({ onSignInSuccess }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        const body = {
            username,
            password,
        }

        try {
            const res = await fetch('http://localhost:8083/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            })

            if (!res.ok) {
                console.error('Error al iniciar sesión')
                return
            }

            const data = await res.json()
            console.log('Finos con el login')
            if (onSignInSuccess) onSignInSuccess(data)
        } catch (err) {
            console.error('Error en la petición de login:', err)
        }
    };

    return (
        <div className="signInFormView">
            <form className="signInForm" onSubmit={handleSubmit}>
                <img src={Logo} alt="Logo" className="logotipoForm"/>
                <h1>Sistema de Gestión de Recursos</h1>
                <p>Plataforma de Reservas</p>
                
                <label htmlFor="username">Correo Institucional</label>
                <input 
                    id="username" 
                    name="username" 
                    type="text" 
                    placeholder="usuario@university.edu.co"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <label htmlFor="password">Contraseña</label>
                <input 
                    id="password" 
                    name="password" 
                    type="password" 
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" className="registerButton">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default SignInFormd;