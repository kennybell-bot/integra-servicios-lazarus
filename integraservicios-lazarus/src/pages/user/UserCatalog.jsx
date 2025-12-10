import React, { useState, useEffect } from 'react';
import CatalogResource from '../../components/userComponents/CatalogResource.jsx';
import ReserveConfirmation from '../../components/userComponents/ReserveConfirmation.jsx';

function UserCatalog() {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedResource, setSelectedResource] = useState(null);

    // Get userId from sessionStorage each render (ensures latest session info)
    const sessionUser = (() => {
        try {
            const stored = sessionStorage.getItem('userInfo');
            return stored ? JSON.parse(stored) : null;
        } catch (err) {
            console.error('No se pudo leer userInfo de sessionStorage', err);
            return null;
        }
    })();
    const userId = sessionUser?.id;

    useEffect(() => {
        const fetchResources = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:8081/api/resources');
                
                if (!response.ok) {
                    throw new Error(`Error al cargar recursos: ${response.status}`);
                }
                
                const data = await response.json();
                setResources(data);
                setError(null);
                
                // Guardar recursos en sessionStorage
                try {
                    sessionStorage.setItem('resources', JSON.stringify(data));
                    console.log('Recursos guardados en sessionStorage:', data);
                } catch (storageErr) {
                    console.error('Error al guardar recursos en sessionStorage:', storageErr);
                }
            } catch (err) {
                console.error('Error fetching resources:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchResources();
    }, []);

    const handleReserve = (resource) => {
        setSelectedResource(resource);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedResource(null);
    };

    const handleConfirmReserve = () => {
        // Aquí va la lógica para confirmar la reserva
        alert(`Reserva confirmada para ${selectedResource?.name}`);
        setModalOpen(false);
        setSelectedResource(null);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Catálogo de Recursos</h1>
            <p>Explora y reserva los recursos disponibles</p>
            
            {loading && <p>Cargando recursos...</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
                gap: '20px',
                marginTop: '20px'
            }}>
                {resources.map((resource) => (
                    <CatalogResource
                        key={resource.id}
                        resourceName={resource.name}
                        isAvailable={resource.available}
                        description={resource.description}
                        capacity={resource.capacity}
                        onReserve={() => handleReserve(resource)}
                    />
                ))}
            </div>
            
            {!loading && !error && resources.length === 0 && (
                <p>No hay recursos disponibles en este momento.</p>
            )}
            
            <ReserveConfirmation
                open={modalOpen}
                onClose={handleCloseModal}
                resourceName={selectedResource?.name || ''}
                description={selectedResource?.description || ''}
                capacity={selectedResource?.capacity || 0}
                resourceId={selectedResource?.id}
                resourceTypeId={selectedResource?.resourceTypeId}
                userId={userId}
                onConfirm={handleConfirmReserve}
            />
        </div>
    );
}

export default UserCatalog;