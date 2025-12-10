import React from 'react'
import './userReserveCard.css'

/**
 * userReserveCard component
 * Displays a reservation card with resource name, type, start/end times, and cancel button
 * 
 * Props:
 * - resourceName: string - Name of the reserved resource
 * - resourceType: string - Type/category of the resource (e.g., "salon")
 * - startTime: string - Start time in format "DD MMM YYYY, HH:MM"
 * - endTime: string - End time in format "DD MMM YYYY, HH:MM"
 * - isActive: boolean - Whether the reservation is active
 * - onCancel: function - Called when cancel button is clicked
 */
const userReserveCard = ({
  resourceName = 'Recurso',
  resourceType = 'Tipo',
  startTime = '00 jan 0000, 00:00',
  endTime = '00 jan 0000, 00:00',
  isActive = true,
  onCancel = () => {},
}) => {
  return (
    <div className="reserve-card">
      <div className="reserve-card-header">
        <h3 className="resource-name">{resourceName}</h3>
        <span className={`status-badge ${isActive ? 'active' : 'inactive'}`}>
          {isActive ? 'Activa' : 'Inactiva'}
        </span>
      </div>

      <div className="resource-type-tag">
        <span>{resourceType}</span>
      </div>

      <div className="reservation-times">
        <div className="time-section">
          <label>Inicio</label>
          <p>{startTime}</p>
        </div>
        <div className="time-section">
          <label>Fin</label>
          <p>{endTime}</p>
        </div>
      </div>

      <button
        className="cancel-button"
        onClick={onCancel}
        aria-label={`Cancelar reserva de ${resourceName}`}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="2" />
          <path d="M9 9l6 6m0-6l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span>Cancelar Reserva</span>
      </button>
    </div>
  )
}

export default userReserveCard
