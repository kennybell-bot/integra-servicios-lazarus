import React from 'react'
import './Ratings.css'
import UserRating from '../components/UserRating'

export default function Ratings() {
    return (
        <div className="ratings-page">
            <h1 className="ratings-title">Calificaciones del Servicio</h1>
            <p className="ratings-subtitle">Opiniones y calificaciones de los usuarios</p>

            <UserRating
                title="Cancha de Fútbol"
                userName="María García"
                dateText="13 nov 2025"
                comment="Excelente estado de la cancha, muy limpia y bien mantenida."
                rating={3}
            />
            
        </div>
    )
}
