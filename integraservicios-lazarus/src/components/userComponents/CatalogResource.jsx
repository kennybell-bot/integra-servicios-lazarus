import React from 'react'
import './CatalogResource.css'

/**
 * CatalogResource component
 * Displays a resource card with name, availability, description, capacity, and a reserve button
 * 
 * Props:
 * - resourceName: string - Name of the resource
 * - isAvailable: boolean - Whether the resource is available
 * - description: string - Description of the resource
 * - capacity: number - Capacity of the resource (number of people)
 * - onReserve: function - Called when the reserve button is clicked
 */
const CatalogResource = ({
  resourceName = 'Recurso',
  isAvailable = true,
  description = 'Descripción del recurso',
  capacity = 0,
  onReserve = () => {},
}) => {
  return (
    <div className="catalog-resource-card">
      <div className="resource-header">
        <h2 className="resource-name">{resourceName}</h2>
        <span className={`availability-badge ${isAvailable ? 'available' : 'unavailable'}`}>
          {isAvailable ? 'Disponible' : 'No Disponible'}
        </span>
      </div>

      <div className="resource-tag">
        <span className="tag-label">Salón</span>
      </div>

      <p className="resource-description">{description}</p>

      <p className="resource-capacity">
        <strong>Capacidad: {capacity} personas</strong>
      </p>

      <button
        className="reserve-button"
        onClick={onReserve}
        disabled={!isAvailable}
        aria-label={`Reservar ${resourceName}`}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <rect x="3" y="6" width="18" height="15" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M3 10h18" stroke="currentColor" strokeWidth="2" />
          <path d="M8 3v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M16 3v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span>Reservar</span>
      </button>
    </div>
  )
}

export default CatalogResource
