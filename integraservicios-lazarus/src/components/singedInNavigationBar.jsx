import React from 'react';
import iconoUsuario from '../assets/userIcon.png';
import iconoCerrarSesion from '../assets/logoutIcon.png';
import './singedInNavigationBar.css'

const SignedInNavigationBar = () => {
    return (
        <div className='navBarUser'>
            <img src={iconoUsuario} className='iconoPerfil'/>
            <div className='seccionInfoUsuario'>
                <h2>Bienvenido, Usuario Rol</h2>
            </div>
            <img src={iconoCerrarSesion} className='iconoCerrarSesion'/>
        </div>
    );
};

export default SignedInNavigationBar;