import React from 'react'
import './ResourceItem.css'

const ResourceItem = ({
  title = 'Recurso',
  tag = '',
  status = 'Disponible',
  description = '',
  capacity = '',
  onEdit = () => {},
  onDelete = () => {},
}) => {
  return (
    <article className="resource-item" role="group" aria-label={title}>
      <div className="resource-item-top">
        <h4 className="resource-item-title">{title}</h4>
        <span className={`resource-item-status ${status && status.toLowerCase() === 'disponible' ? 'available' : 'unavailable'}`}>
          {status}
        </span>
      </div>

      {tag && <span className="resource-item-tag">{tag}</span>}

      {description && <p className="resource-item-desc">{description}</p>}

      {capacity && (
        <div className="resource-item-capacity">
          <strong>Capacidad:</strong> {capacity}
        </div>
      )}

      <div className="resource-item-actions">
        <button className="btn-edit" onClick={onEdit} aria-label={`Editar ${title}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" fill="currentColor" />
            <path d="M20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z" fill="currentColor" />
          </svg>
          <span>Editar</span>
        </button>

        <button className="btn-delete" onClick={onDelete} aria-label={`Eliminar ${title}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M6 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M19 7l-1 12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </article>
  )
}

export default ResourceItem
