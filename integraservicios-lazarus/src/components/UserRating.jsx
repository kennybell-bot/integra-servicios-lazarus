import React from 'react'
import './UserRating.css'

/**
 * UserRating card
 * Props:
 * - title: string (e.g., 'Cancha de Fútbol')
 * - userName: string (e.g., 'María García')
 * - dateText: string (e.g., '13 nov 2025')
 * - comment: string
 * - rating: number (1-5)
 */
const UserRating = ({ title, userName, dateText, comment, rating = 0 }) => {
  const safeRating = Math.max(0, Math.min(5, Number(rating) || 0))

  return (
    <article className="user-rating-card">
      <header className="user-rating-header">
        <div className="user-rating-info">
          <h3 className="user-rating-title">{title}</h3>
            <p className="user-rating-meta">{userName} - {dateText}</p>
        </div>
        <div className="user-rating-stars" aria-label={`Calificación ${safeRating} de 5`}>
          {[1, 2, 3, 4, 5].map((n) => (
            <span key={n} className={n <= safeRating ? 'star filled' : 'star'}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill={n <= safeRating ? '#b79e60ff' : 'none'}
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path
                    d="M12 3.5l2.472 5.007 5.528.804-4 3.898.944 5.503L12 16.9 7.056 18.712 8 13.21l-4-3.898 5.528-.804L12 3.5z"
                    stroke="#b79e60ff"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />
                </svg>
            </span>
          ))}
        </div>
      </header>

      <p className="user-rating-comment">{comment}</p>
    </article>
  )
}

export default UserRating
