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
			// Prefer type name, fallback to stored type string
			setType(initialData.type?.name || initialData.type || 'Salón')
			const descAttr = initialData.attributesJson?.descripcion || initialData.description || ''
			setDescription(descAttr)
			const capAttr = initialData.attributesJson?.capacidad ?? initialData.capacity
			setCapacity(capAttr !== undefined && capAttr !== null ? String(capAttr) : '')
			// active/available mapping
			const availableFlag = typeof initialData.active === 'boolean' ? initialData.active : initialData.available
			setAvailable(typeof availableFlag === 'boolean' ? availableFlag : true)
		} else {
			setName('')
			setType('Salón')
			setDescription('')
			setCapacity('')
			setAvailable(true)
		}
	}, [initialData])

	const handleSubmit = async (e) => {
		e.preventDefault()

		// Derive code: first 3 letters of the name (uppercased) + the first number found
		const prefix = (name || '').trim().slice(0, 3).toUpperCase()
		const numMatch = (name || '').match(/(\d+)/)
		const numPart = numMatch ? numMatch[1] : '001'
		const code = `${prefix}-${numPart}`

		const body = {
			code,
			name,
			attributesJson: {
				capacidad: Number(capacity || 0),
				equipoDisponible: null,
				descripcion: description,
			},
			photoUrl: null,
			active: available,
			location: {
				id: 'fc592db8-c831-46ec-b151-ae1e09b77569',
			},
			type: {
				id: '782febf8-3982-452e-9998-47a9e1603ed4',
			},
		}

		const isEditing = Boolean(initialData?.id)
		const url = isEditing
			? `http://localhost:8081/api/resources/${initialData.id}`
			: 'http://localhost:8081/api/resources'
		const method = isEditing ? 'PUT' : 'POST'

		try {
			const res = await fetch(url, {
				method,
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			})

			if (!res.ok) {
				console.error('Error al guardar recurso')
				return
			}

			const data = await res.json()
			console.log(isEditing ? 'Finos con el PUT de recurso' : 'Finos con el POST de recurso')
			if (onCreate) onCreate(data)
		} catch (err) {
			console.error('Error en la petición:', err)
		}
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

