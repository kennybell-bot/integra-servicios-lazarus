import React, { useEffect, useState } from 'react'
import Dropdown from '../components/Dropdown'
import './ReservationsAdmin.css'
import ReservationCard from '../components/ReservationCard'

export default function ReservationsAdmin() {
    const [selectedStatus, setSelectedStatus] = useState('todas')
    const [reservations, setReservations] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const statusOptions = [
        { value: 'todas', label: 'Todas' },
        { value: 'PENDIENTE', label: 'Pendientes' },
        { value: 'CONFIRMADA', label: 'Activas' },
        { value: 'COMPLETADA', label: 'Completadas' },
        { value: 'CANCELADA', label: 'Canceladas' },
    ]

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                setLoading(true)
                // Leer recursos del sessionStorage para filtrar/enriquecer
                let resources = []
                try {
                    const storedResources = sessionStorage.getItem('resources')
                    resources = storedResources ? JSON.parse(storedResources) : []
                } catch (err) {
                    console.error('Error al leer recursos del sessionStorage:', err)
                }
                const resourceIds = new Set(resources.map((r) => r.id))

                const response = await fetch('http://localhost:8084/api/reservations')
                if (!response.ok) {
                    throw new Error(`Error al cargar reservas: ${response.status}`)
                }
                const data = await response.json()

                // Filtrar por recursos presentes en sessionStorage
                const filtered = data.filter((res) => resourceIds.has(res.resourceId))

                // Enriquecer con nombre/código del recurso
                const enriched = filtered.map((res) => {
                    const found = resources.find((r) => r.id === res.resourceId)
                    return {
                        ...res,
                        resourceName: found?.name || `Recurso ${res.resourceId}`,
                        resourceCode: found?.code || '',
                    }
                })

                setReservations(enriched)
                setError(null)
                console.log('Reservas admin (filtradas y enriquecidas):', enriched)
            } catch (err) {
                console.error('Error fetching reservations:', err)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchReservations()
    }, [])

    const formatDateTime = (date, time) => {
        if (!date || !time) return 'N/A'
        const [year, month, day] = date.split('-')
        const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
        return `${parseInt(day, 10)} ${months[parseInt(month, 10) - 1]} ${year}, ${time}`
    }

    const filteredReservations = reservations.filter((res) => {
        if (selectedStatus === 'todas') return true
        return (res.status || '').toUpperCase() === selectedStatus.toUpperCase()
    })

    return (
        <div className="reservations-admin">
            <div className="reservations-header">
                <div className="reservations-title-section">
                    <h1>Gestión de Reservas</h1>
                    <p>Administra todas las reservas del sistema</p>
                </div>
                <div className="reservations-filter-section">
                    <Dropdown
                        label="Filtrar"
                        options={statusOptions}
                        selected={selectedStatus}
                        onSelect={setSelectedStatus}
                    />
                </div>
            </div>

            {loading && <p>Cargando reservas...</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}

            <div className="reservations-content">
                {filteredReservations.map((reservation) => (
                    <ReservationCard
                        key={reservation.id}
                        resourceName={reservation.resourceName}
                        userName={reservation.username || reservation.userName || 'Usuario'}
                        startDate={formatDateTime(reservation.dateLocal, reservation.startTime)}
                        endDate={formatDateTime(reservation.dateLocal, reservation.endTime)}
                        status={reservation.status || 'pendiente'}
                        onMarkComplete={() => console.log('Marcar como completada', reservation.id)}
                    />
                ))}
            </div>

            {!loading && !error && filteredReservations.length === 0 && (
                <p>No hay reservas para mostrar.</p>
            )}
        </div>
    )
}