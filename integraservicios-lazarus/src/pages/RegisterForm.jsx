import React, { useState } from "react";
import Logo from '../assets/logo.png';
import Dropdown from '../components/Dropdown.jsx';
import './RegisterForm.css';

const RegisterForm = () => {
    const [role, setRole] = useState('STUDENT')
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const roleOptions = [
        { value: 'STUDENT', label: 'STUDENT' },
        { value: 'ADMIN', label: 'ADMIN' }
    ]

    const handleSubmit = async (e) => {
        e.preventDefault()

        const body = {
            username: email,
            password,
            fullName,
            role,
            active: true,
        }

        try {
            const res = await fetch('http://localhost:8083/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            })

            if (!res.ok) {
                console.error('Error al registrar usuario')
                return
            }

            const data = await res.json()
            console.log('Finos con el registro', data)
        } catch (err) {
            console.error('Error en la petición de registro:', err)
        }
    }

    return (
        <div className="registerFormView">
            <form className="registerForm" onSubmit={handleSubmit}>
                <img src={Logo} alt="Logo" className="logotipoForm"/>
                <h1>Crear Cuenta</h1>
                <p>Regístrate para acceder al sistema de gestión de recursos</p>

                <label htmlFor="name">Nombre Completo</label>
                <input id="name" name="name" type="text" placeholder="Juan Pérez" value={fullName} onChange={(e) => setFullName(e.target.value)} />

                <label htmlFor="role">Rol</label>
                <Dropdown
                    label="STUDENT"
                    options={roleOptions}
                    selected={role}
                    onSelect={setRole}
                />
                
                <label htmlFor="email">Correo Institucional</label>
                <input id="email" name="email" type="text" placeholder="usuario@university.edu.co" value={email} onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="password">Contraseña</label>
                <input id="password" name="password" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} />

                <button type="submit" className="registerButton">Registrarse</button>
            </form>
        </div>
    );
};

export default RegisterForm;