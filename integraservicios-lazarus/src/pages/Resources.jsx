import React, { useState, useEffect } from "react";
import NewResource from './NewResource.jsx'
import './Resource.css'
import ResourceItem from '../components/ResourceItem'
import '../components/ResourceItem.css'

const Resources = () => {
    const [showNew, setShowNew] = useState(false)
    const [items, setItems] = useState([])
    const [editing, setEditing] = useState(null)

    useEffect(() => {
        fetch('http://localhost:8081/api/resources')
            .then(res => res.json())
            .then(data => {
                console.log('Finos')
                setItems(data)
            })
            .catch(err => console.error('Error fetching resources:', err))
    }, [])

    const handleOpen = () => {
        setEditing(null)
        setShowNew(true)
    }
    const handleClose = () => setShowNew(false)

    const handleCreate = (payload) => {
        // payload viene de la API (ya tiene id)
        setItems(prev => [payload, ...prev])
        setShowNew(false)
    }

    const handleDelete = (id) => {
        fetch(`http://localhost:8081/api/resources/${id}`, {
            method: 'DELETE'
        })
            .then(res => {
                if (res.ok) {
                    console.log('Recurso eliminado exitosamente')
                    setItems(prev => prev.filter(i => i.id !== id))
                } else {
                    console.error('Error al eliminar recurso')
                }
            })
            .catch(err => console.error('Error en la petición DELETE:', err))
    }

    const handleEdit = (id) => {
        const item = items.find(i => i.id === id)
        if (!item) return
        // prefill modal for editing: set editing and open modal
        setEditing(item)
        setShowNew(true)
    }

    const handleUpdate = (updated) => {
        setItems(prev => prev.map(i => i.id === updated.id ? updated : i))
        setShowNew(false)
        setEditing(null)
    }

    return (
        <div className="resourcesPage">
            <div className="resourcesHeader">
                <div>
                    <h1>Gestión de Recursos</h1>
                    <p>Administra los recursos disponibles para reserva</p>
                </div>
                <div>
                    <button onClick={handleOpen} >Agregar Recurso</button>
                </div>
            </div>

            <div className="resourcesList">
                {items.length === 0 ? (
                    <p>No hay recursos aún.</p>
                ) : (
                    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:16}}>
                        {items.map((it) => {
                            // Convert attributesJson to natural language description
                            const descriptionText = it.attributesJson 
                                ? Object.entries(it.attributesJson)
                                    .map(([key, value]) => `${key}: ${value}`)
                                    .join(', ')
                                : ''
                            
                            // Extract capacity from attributesJson
                            const capacityValue = it.attributesJson?.capacidad || ''

                            return (
                                <ResourceItem
                                    key={it.id}
                                    title={it.name}
                                    tag={it.code}
                                    status={it.active ? 'Disponible' : 'No disponible'}
                                    description={descriptionText}
                                    capacity={capacityValue ? `${capacityValue} personas` : ''}
                                    onEdit={() => handleEdit(it.id)}
                                    onDelete={() => handleDelete(it.id)}
                                />
                            )
                        })}
                    </div>
                )}
            </div>

            {showNew && (
                // If editing, pass initial values and a handler that preserves id
                <NewResource
                    onClose={handleClose}
                    onCreate={(payload) => {
                        if (editing) {
                            handleUpdate(payload)
                        } else {
                            handleCreate(payload)
                        }
                    }}
                    initialData={editing}
                />
            )}

        </div>
    );
};

export default Resources;