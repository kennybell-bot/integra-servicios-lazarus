import React from "react";
import './adminOptionsBar.css';
import dashboardIcon from '../assets/dashboardIcon.png';
import resourcesIcon from '../assets/resourcesIcon.png';
import bookingsIcon from '../assets/bookingsIcon.png';
import ratingsIcon from '../assets/ratingsIcon.png';


const AdminOptionsBar = ({ onSelect, active }) => {
    const handleKey = (e, view) => { if (e.key === 'Enter') onSelect && onSelect(view) }

    return (
        <div className="adminOptionsBarContainer">
            <div className="adminOptionsBar">
                <button
                    className={active === 'dashboard' ? 'active' : ''}
                    onClick={() => onSelect && onSelect('dashboard')}
                    onKeyDown={(e) => handleKey(e, 'dashboard')}
                >
                    <img src={dashboardIcon} alt="Dashboard Icon" />
                    <span>Dashboard</span>
                </button>
                <button
                    className={active === 'resources' ? 'active' : ''}
                    onClick={() => onSelect && onSelect('resources')}
                    onKeyDown={(e) => handleKey(e, 'resources')}
                >
                    <img src={resourcesIcon} alt="Resources Icon" />
                    <span>Recursos</span>
                </button>
                <button
                    className={active === 'bookings' ? 'active' : ''}
                    onClick={() => onSelect && onSelect('bookings')}
                    onKeyDown={(e) => handleKey(e, 'bookings')}
                >
                    <img src={bookingsIcon} alt="Bookings Icon" />
                    <span>Reservas</span>
                </button>
                <button
                    className={active === 'ratings' ? 'active' : ''}
                    onClick={() => onSelect && onSelect('ratings')}
                    onKeyDown={(e) => handleKey(e, 'ratings')}
                >
                    <img src={ratingsIcon} alt="Ratings Icon" />
                    <span>Calificaciones</span>
                </button>
            </div>
        </div>
    );
};

export default AdminOptionsBar;