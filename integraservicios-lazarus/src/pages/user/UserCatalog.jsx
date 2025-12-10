import React, { useState, useEffect } from 'react';
import CatalogResource from '../../components/userComponents/CatalogResource.jsx';

function UserCatalog() {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            } catch (err) {
                console.error('Error fetching resources:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchResources();
    }, []);

    const handleReserve = (resourceId, resourceName) => {
        console.log(`Reservar recurso: ${resourceName} (ID: ${resourceId})`);
        // Aquí puedes implementar la lógica de reserva
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
                        onReserve={() => handleReserve(resource.id, resource.name)}
                    />
                ))}
            </div>
            
            {!loading && !error && resources.length === 0 && (
                <p>No hay recursos disponibles en este momento.</p>
            )}
        </div>
    );
}

export default UserCatalog;