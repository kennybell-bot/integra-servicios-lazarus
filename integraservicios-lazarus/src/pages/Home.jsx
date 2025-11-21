import React from 'react';
import NavigationBar from '../components/NavigationBar.jsx';
import './Home.css';
import Logo from '../assets/logo.png';
import Piscina from '../assets/images/homePiscina.jpeg';
import Salon from '../assets/images/homeSalon.jpeg';
import Cancha from '../assets/images/homeCancha.jpeg';
import Auditorio from '../assets/images/homeAuditorio.jpeg';

const Home = ({ onRegisterClick }) => {
    return ( 
        <main>
            {/*<NavigationBar onRegisterClick={onRegisterClick} />*/}
            <div className="homeContent">
                <img src={Logo} alt="Logo" className='logotipoHome'/>
                <h1>Gestiona los recursos universitarios de forma simple y eficiente</h1>
                <p>Plataforma integral para la reserva y administración de recursos institucionales. Reserva salones, computadores, canchas y piscinas con solo unos clics.</p>
                <div className='galeria'>
                    <img src={Piscina} alt="Piscina" />
                    <img src={Salon} alt="Salon" />
                    <img src={Cancha} alt="Cancha" />
                    <img src={Auditorio} alt="Auditorio" />
                </div>
            </div>
        </main>
    );
};

export default Home;