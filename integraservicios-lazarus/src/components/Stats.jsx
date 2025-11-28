import React from 'react'
import './Stats.css'

/**
 * Stats
 * Props:
 * - title: string (card title)
 * - items: array of { label, value, total }
 */
const Stats = ({ title = 'Distribución de Recursos', items = [] }) => {
  return (
    <div className="stats-card">
      <h2 className="stats-title">{title}</h2>

      <div className="stats-list">
        {items.map((it, idx) => {
          const { label, value, total } = it
          const pct = total > 0 ? Math.round((value / total) * 100) : 0
          return (
            <div className="stats-item" key={idx}>
              <div className="stats-item-row">
                <div className="stats-label">{label}</div>
                <div className="stats-count">{value}/{total}</div>
              </div>

              <div className="stats-track" aria-hidden>
                <div className="stats-fill" style={{ width: `${pct}%` }} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Stats
