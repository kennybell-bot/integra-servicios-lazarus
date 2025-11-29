import React, { useState } from "react";
import NewResource from './NewResource.jsx'
import './Resource.css'
import ResourceItem from '../components/ResourceItem'
import '../components/ResourceItem.css'

const Resources = () => {
    const [showNew, setShowNew] = useState(false)
    const [items, setItems] = useState([])
    const [editing, setEditing] = useState(null)

    const handleOpen = () => {
        setEditing(null)
        setShowNew(true)
    }
    const handleClose = () => setShowNew(false)

    const handleCreate = (payload) => {
        // add id so we can edit/delete later
        const item = { id: Date.now(), ...payload }
        setItems(prev => [item, ...prev])
        setShowNew(false)
    }

    const handleDelete = (id) => {
        setItems(prev => prev.filter(i => i.id !== id))
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
                        {items.map((it) => (
                            <ResourceItem
                                key={it.id}
                                title={it.name}
                                tag={it.type}
                                status={it.available ? 'Disponible' : 'No disponible'}
                                description={it.description}
                                capacity={it.capacity ? `${it.capacity} personas` : ''}
                                onEdit={() => handleEdit(it.id)}
                                onDelete={() => handleDelete(it.id)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {showNew && (
                // If editing, pass initial values and a handler that preserves id
                <NewResource
                    onClose={handleClose}
                    onCreate={(payload) => {
                        if (editing) {
                            handleUpdate({ id: editing.id, ...payload })
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