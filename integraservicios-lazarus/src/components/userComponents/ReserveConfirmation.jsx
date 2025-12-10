import React, { useState } from 'react'
import './ReserveConfirmation.css'

function ReserveConfirmation({
  open,
  onClose,
  resourceName,
  description,
  capacity,
  onConfirm,
  resourceId,
  resourceTypeId,
}) {
  const [startDateTime, setStartDateTime] = useState('')
  const [endDateTime, setEndDateTime] = useState('')
  const [repeat, setRepeat] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  if (!open) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      let userId = null
      try {
        const stored = sessionStorage.getItem('userInfo')
        console.log('userInfo from sessionStorage:', stored)
        const parsed = stored ? JSON.parse(stored) : null
        console.log('Parsed userInfo:', parsed)
        // Intenta primero con 'userId', luego con 'id'
        userId = parsed?.userId || parsed?.id
        console.log('Extracted userId:', userId)
      } catch (err) {
        console.error('No se pudo leer userInfo de sessionStorage', err)
      }

      if (!userId) {
        throw new Error('No se encontró el usuario en sesión')
      }

      if (!resourceId) {
        throw new Error('No se encontró el recurso a reservar')
      }

      const start = new Date(startDateTime)
      const end = new Date(endDateTime)
      const dateLocal = start.toISOString().slice(0, 10) // yyyy-mm-dd
      const startTime = start.toTimeString().slice(0, 5) // hh:mm
      const endTime = end.toTimeString().slice(0, 5) // hh:mm

      const body = {
        userId,
        resourceId,
        resourceTypeId: '660e8400-e29b-41d4-a716-446655440001',
        dateLocal,
        startTime,
        endTime,
        status: 'CONFIRMADA',
      }

      const response = await fetch('http://localhost:8084/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      console.log('Reservation request body:', body)

      if (!response.ok) {
        throw new Error('Error al confirmar la reserva')
      }

      onConfirm && onConfirm()
      onClose()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="reserve-modal-overlay">
      <div className="reserve-modal">
        <button className="close-btn" onClick={onClose} aria-label="Cerrar">×</button>
        <h2>Reservar {resourceName}</h2>
        <p className="subtitle">Selecciona la fecha y hora para tu reserva</p>
        <form className="reserve-form" onSubmit={handleSubmit}>
          <label>
            Fecha y Hora de Inicio
            <input
              type="datetime-local"
              name="start"
              value={startDateTime}
              onChange={(e) => setStartDateTime(e.target.value)}
              required
            />
          </label>
          <label>
            Fecha y Hora de Fin
            <input
              type="datetime-local"
              name="end"
              value={endDateTime}
              onChange={(e) => setEndDateTime(e.target.value)}
              required
            />
          </label>
          <label className="repeat-label">
            <input
              type="checkbox"
              name="repeat"
              checked={repeat}
              onChange={(e) => setRepeat(e.target.checked)}
            />
            Reserva repetitiva
          </label>
          <div className="resource-info">
            <p><strong>Descripción:</strong> {description}</p>
            <p><strong>Capacidad:</strong> {capacity} personas</p>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose} disabled={loading}>Cancelar</button>
            <button type="submit" className="confirm-btn" disabled={loading}>Confirmar Reserva</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ReserveConfirmation
