import React from "react";
import './adminOptionsBar.css';
import dashboardIcon from '../assets/dashboardIcon.png';
import resourcesIcon from '../assets/resourcesIcon.png';
import bookingsIcon from '../assets/bookingsIcon.png';
import ratingsIcon from '../assets/ratingsIcon.png';


const AdminOptionsBar = () => {
    return (
        <div className="adminOptionsBarContainer">
            <div className="adminOptionsBar">
                <button >
                    <img src={dashboardIcon} alt="Dashboard Icon" />
                    <span>Dashboard</span>
                </button>
                <button>
                    <img src={resourcesIcon} alt="Resources Icon" />
                    <span>Recursos</span>
                </button>
                <button>
                    <img src={bookingsIcon} alt="Bookings Icon" />
                    <span>Reservas</span>
                </button>
                <button>
                    <img src={ratingsIcon} alt="Ratings Icon" />
                    <span>Calificaciones</span>
                </button>
            </div>
        </div>
    );
};

export default AdminOptionsBar;