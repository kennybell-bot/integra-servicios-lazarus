import React from 'react';
import iconoUsuario from '../assets/userIcon.png';
import iconoCerrarSesion from '../assets/logoutIcon.png';
import './singedInNavigationBar.css'

const SignedInNavigationBar = ({ onSignOut }) => {
    return (
        <div className='navBarUser'>
            <img src={iconoUsuario} className='iconoPerfil' alt="Perfil"/>
            <div className='seccionInfoUsuario'>
                <h2>Bienvenido, Usuario Rol</h2>
            </div>
            <img
                src={iconoCerrarSesion}
                className='iconoCerrarSesion'
                alt="Cerrar sesión"
                role="button"
                tabIndex={0}
                style={{ cursor: 'pointer' }}
                onClick={() => onSignOut && onSignOut()}
                onKeyDown={(e) => { if (e.key === 'Enter') onSignOut && onSignOut(); }}
            />
        </div>
    );
};

export default SignedInNavigationBar;