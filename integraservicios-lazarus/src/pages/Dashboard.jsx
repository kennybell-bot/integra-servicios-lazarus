import React from 'react'
import ResourceCard from '../components/ResourceCard'
import resourcesIcon from '../assets/resourcesIcon.png'
import bookingsIcon from '../assets/bookingsIcon.png'
import ratingsIcon from '../assets/ratingsIcon.png'
import completedIcon from '../assets/adminsOptionsIcons/checked.png'
import Stats from '../components/Stats'
import './Home.css'

const Dashboard = () => {
  return (
    <main className="homeContent">
        <h1>Resumen General</h1>
        <p>Estadísticas del sistema de gestión de recursos</p>
        <div style={{display: 'flex', gap: 16, flexWrap: 'wrap'}}>
            <ResourceCard title="Total Recursos" value={8} subtitle="7 disponibles" iconSrc={resourcesIcon} />
            <ResourceCard title="Reservas Acttivas" value={24} subtitle="hoy" iconSrc={bookingsIcon} />
            <ResourceCard title="Reservas completadas" value={12} subtitle="total" iconSrc={completedIcon} />
            <ResourceCard title="Calificaciones" value={4.5} subtitle="promedio" iconSrc={ratingsIcon} />
        </div>
        <Stats 
            title="Distribución de Recursos"
            items={[
                { label: 'Recursos disponibles', value: 7, total: 8 },
                { label: 'Reservas activas', value: 24, total: 30 },
                { label: 'Reservas completadas', value: 12, total: 30 },
                { label: 'Calificaciones promedio', value: 4.5, total: 5 }
            ]}
        />
    </main>
  )
}

export default Dashboard
