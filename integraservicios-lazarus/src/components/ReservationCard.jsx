import React from 'react'
import './ReservationCard.css'

/**
 * ReservationCard component
 * Props:
 * - resourceName: string (e.g. 'Salón 101')
 * - userName: string (e.g. 'Juan Pérez')
 * - startDate: string (e.g. '15 nov 2025, 09:00')
 * - endDate: string (e.g. '15 nov 2025, 11:00')
 * - status: string ('activa' | 'pendiente' | 'completada' | 'cancelada')
 * - onMarkComplete: function - called when "Marcar como Completada" is clicked
 */
const ReservationCard = ({
  resourceName = '',
  userName = '',
  startDate = '',
  endDate = '',
  status = 'pendiente',
  onMarkComplete = () => {},
}) => {
  const isActive = status.toLowerCase() === 'activa'

  const getStatusClass = () => {
    const statusLower = status.toLowerCase()
    switch (statusLower) {
      case 'activa':
        return 'status-active'
      case 'pendiente':
        return 'status-pending'
      case 'completada':
        return 'status-completed'
      case 'cancelada':
        return 'status-cancelled'
      default:
        return ''
    }
  }

  const getStatusLabel = () => {
    const statusLower = status.toLowerCase()
    switch (statusLower) {
      case 'activa':
        return 'Activa'
      case 'pendiente':
        return 'Pendiente'
      case 'completada':
        return 'Completada'
      case 'cancelada':
        return 'Cancelada'
      default:
        return status
    }
  }

  return (
    <article className="reservation-card">
      <div className="reservation-card-header">
        <div className="reservation-card-title-section">
          <h3 className="reservation-card-title">{resourceName}</h3>
          <p className="reservation-card-user">Usuario: {userName}</p>
        </div>
        <span className={`reservation-card-status ${getStatusClass()}`}>
          {getStatusLabel()}
        </span>
      </div>

      <div className="reservation-card-dates">
        <div className="reservation-date-block">
          <span className="reservation-date-label">Inicio</span>
          <span className="reservation-date-value">{startDate}</span>
        </div>
        <div className="reservation-date-block">
          <span className="reservation-date-label">Fin</span>
          <span className="reservation-date-value">{endDate}</span>
        </div>
      </div>

      {isActive && (
        <div className="reservation-card-actions">
          <button 
            className="btn-mark-complete" 
            onClick={onMarkComplete}
            aria-label="Marcar como completada"
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path 
                d="M9 12l2 2 4-4" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            </svg>
            <span>Marcar como Completada</span>
          </button>
        </div>
      )}
    </article>
  )
}

export default ReservationCard
