import React, { useState } from 'react';
import Dropdown from '../components/Dropdown';
import './ReservationsAdmin.css';
import ReservationCard from '../components/ReservationCard'

export default function ReservationsAdmin() {
    const [selectedStatus, setSelectedStatus] = useState('pendientes')

    const statusOptions = [
        { value: 'pendientes', label: 'Pendientes' },
        { value: 'activas', label: 'Activas' },
        { value: 'completadas', label: 'Completadas' },
        { value: 'canceladas', label: 'Canceladas' }
    ]

    return (
        <div className="reservations-admin">
            <div className="reservations-header">
                <div className="reservations-title-section">
                    <h1>Gestión de Reservas</h1>
                    <p>Administra todas las reservas del sistema</p>
                </div>
                <div className="reservations-filter-section">
                    <Dropdown
                        label="Todas"
                        options={statusOptions}
                        selected={selectedStatus}
                        onSelect={setSelectedStatus}
                    />
                </div>
            </div>

            <div className="reservations-content">
                <ReservationCard
                    resourceName="Salón 101"
                    userName="Juan Pérez"
                    startDate="15 nov 2025, 09:00"
                    endDate="15 nov 2025, 11:00"
                    status="activa"
                    onMarkComplete={() => console.log('Marcar como completada')}
                />
            </div>
        </div>
    );
}