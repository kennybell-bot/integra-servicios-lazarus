import React, { useState, useEffect } from 'react';
import UserReserveCard from '../../components/userComponents/userReserveCard.jsx';

const UserReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                setLoading(true);
                
                // Get userId from sessionStorage
                let userId = null;
                try {
                    const stored = sessionStorage.getItem('userInfo');
                    const parsed = stored ? JSON.parse(stored) : null;
                    userId = parsed?.userId || parsed?.id;
                } catch (err) {
                    console.error('Error reading userInfo from sessionStorage:', err);
                }

                if (!userId) {
                    throw new Error('No se encontró el usuario en sesión');
                }

                const response = await fetch('http://localhost:8084/api/reservations');
                
                if (!response.ok) {
                    throw new Error(`Error al cargar reservas: ${response.status}`);
                }
                
                const data = await response.json();
                
                // Filter reservations by userId
                const userReservations = data.filter(reservation => reservation.userId === userId);
                
                // Get resources from sessionStorage to match resource names
                let resources = [];
                try {
                    const storedResources = sessionStorage.getItem('resources');
                    resources = storedResources ? JSON.parse(storedResources) : [];
                } catch (err) {
                    console.error('Error reading resources from sessionStorage:', err);
                }
                
                // Enrich reservations with resource name from sessionStorage
                const enrichedReservations = userReservations.map(reservation => {
                    const resource = resources.find(r => r.id === reservation.resourceId);
                    return {
                        ...reservation,
                        resourceName: resource?.name || `Recurso ${reservation.resourceId}`,
                        resourceCode: resource?.code || ''
                    };
                });
                
                setReservations(enrichedReservations);
                setError(null);
                
                console.log('User reservations:', enrichedReservations);
            } catch (err) {
                console.error('Error fetching reservations:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, []);

    const handleCancelReservation = (reservationId) => {
        console.log('Cancel reservation:', reservationId);
        // Aquí puedes implementar la lógica para cancelar la reserva
    };

    const formatDateTime = (date, time) => {
        if (!date || !time) return 'N/A';
        const [year, month, day] = date.split('-');
        const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
        return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}, ${time}`;
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Mis Reservas</h1>
            <p>Gestiona tus reservas y califica el servicio</p>
            
            {loading && <p>Cargando reservas...</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(500px, 1fr))', 
                gap: '20px',
                marginTop: '20px'
            }}>
                {reservations.map((reservation) => (
                    <UserReserveCard
                        key={reservation.id}
                        resourceName={reservation.resourceName || `Recurso ${reservation.resourceId}`}
                        resourceType={reservation.resourceType || 'salon'}
                        startTime={formatDateTime(reservation.dateLocal, reservation.startTime)}
                        endTime={formatDateTime(reservation.dateLocal, reservation.endTime)}
                        isActive={reservation.status === 'CONFIRMADA' || reservation.status === 'ACTIVA'}
                        onCancel={() => handleCancelReservation(reservation.id)}
                    />
                ))}
            </div>
            
            {!loading && !error && reservations.length === 0 && (
                <p>No tienes reservas registradas.</p>
            )}
        </div>
    );
};

export default UserReservations;