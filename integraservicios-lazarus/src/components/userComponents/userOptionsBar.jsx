import React from 'react'
import './userOptionsBar.css'

/**
 * userOptionsBar component
 * Props:
 * - onCatalogClick: function - called when "Catálogo" button is clicked
 * - onMyReservationsClick: function - called when "Mis Reservas" button is clicked
 * - activeTab: string ('catalog' | 'reservations') - optional, indicates active tab
 */
const UserOptionsBar = ({
  onCatalogClick = () => {},
  onMyReservationsClick = () => {},
  activeTab = null,
}) => {
  const handleCatalogClick = () => {
    onCatalogClick()
  }

  const handleReservationsClick = () => {
    onMyReservationsClick()
  }

  return (
    <div className="user-options-bar">
      <button
        className={`user-option-btn catalog-btn ${activeTab === 'catalog' ? 'active' : ''}`}
        onClick={handleCatalogClick}
        aria-label="Ver catálogo de recursos"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
          <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span>Catálogo</span>
      </button>

      <button
        className={`user-option-btn reservations-btn ${activeTab === 'reservations' ? 'active' : ''}`}
        onClick={handleReservationsClick}
        aria-label="Ver mis reservas"
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
          <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span>Mis Reservas</span>
      </button>

    </div>
  )
}

export default UserOptionsBar
