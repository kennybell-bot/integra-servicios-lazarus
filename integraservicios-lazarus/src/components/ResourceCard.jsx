import React from 'react'
import './ResourceCard.css'

/**
 * ResourceCard
 * Props:
 * - title: string (e.g. 'Total Recursos')
 * - value: number|string (e.g. 8)
 * - subtitle: string (e.g. '7 disponibles')
 * - icon: React node (preferred) OR iconSrc: string (image path)
 * - iconAlt: string
 */
const ResourceCard = ({ title = '', value = '', subtitle = '', icon = null, iconSrc = '', iconAlt = '' }) => {
  const renderIcon = () => {
    if (icon) return icon
    if (iconSrc) return <img src={iconSrc} alt={iconAlt || title + ' icon'} />
    return null
  }

  return (
    <div className="resource-card">
      <div className="resource-card-header">
        <h3 className="resource-card-title">{title}</h3>
        {renderIcon() && (
          <div className="resource-card-icon" aria-hidden>
            {renderIcon()}
          </div>
        )}
      </div>

      <div className="resource-card-body">
        <div className="resource-card-value">{value}</div>
        {subtitle && <div className="resource-card-sub">{subtitle}</div>}
      </div>
    </div>
  )
}

export default ResourceCard
