import React, { useState } from 'react'
import './NewResource.css'

const NewResource = ({ onClose, onCreate, initialData = null }) => {
	const [name, setName] = useState('')
	const [type, setType] = useState('Salón')
	const [description, setDescription] = useState('')
	const [capacity, setCapacity] = useState('')
	const [available, setAvailable] = useState(true)

	React.useEffect(() => {
		if (initialData) {
			setName(initialData.name || '')
			setType(initialData.type || 'Salón')
			setDescription(initialData.description || '')
			setCapacity(initialData.capacity ? String(initialData.capacity) : '')
			setAvailable(typeof initialData.available === 'boolean' ? initialData.available : true)
		} else {
			setName('')
			setType('Salón')
			setDescription('')
			setCapacity('')
			setAvailable(true)
		}
	}, [initialData])

	const handleSubmit = (e) => {
		e.preventDefault()
		const payload = { name, type, description, capacity: Number(capacity || 0), available }
		if (onCreate) onCreate(payload)
	}

	return (
		<div className="nr-backdrop" role="dialog" aria-modal="true">
			<div className="nr-modal">
				<button className="nr-close" aria-label="Cerrar" onClick={onClose}>×</button>

				<h2 className="nr-title">Nuevo Recurso</h2>

				<form className="nr-form" onSubmit={handleSubmit}>
					<label className="nr-label">Nombre del Recurso</label>
					<input className="nr-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="" />

					<label className="nr-label">Tipo de Recurso</label>
					<select className="nr-select" value={type} onChange={(e) => setType(e.target.value)}>
						<option>Salón</option>
						<option>Laboratorio</option>
						<option>Cancha</option>
						<option>Piscina</option>
						<option>Auditorio</option>
					</select>

					<label className="nr-label">Descripción</label>
					<textarea className="nr-textarea" value={description} onChange={(e) => setDescription(e.target.value)} />

					<label className="nr-label">Capacidad (personas)</label>
					<input className="nr-input" value={capacity} onChange={(e) => setCapacity(e.target.value)} placeholder="" />

					<div className="nr-field-inline">
						<label className="nr-label">Disponible para reservas</label>
						<label className="nr-switch">
							<input type="checkbox" checked={available} onChange={(e) => setAvailable(e.target.checked)} />
							<span className="nr-slider" />
						</label>
					</div>

					<div className="nr-actions">
						<button type="button" className="nr-cancel" onClick={onClose}>Cancelar</button>
						<button type="submit" className="nr-submit">{initialData ? 'Guardar cambios' : 'Crear Recurso'}</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default NewResource

