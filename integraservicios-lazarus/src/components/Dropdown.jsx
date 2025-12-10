import React, { useState, useRef, useEffect } from 'react'
import './Dropdown.css'

/**
 * Dropdown component
 * Props:
 * - label: string (default text shown when closed)
 * - options: array of { value: string, label: string }
 * - selected: string (current selected value)
 * - onSelect: function(value) - called when option is selected
 * - placeholder: string (optional, shown if nothing selected)
 */
const Dropdown = ({
  label = 'Seleccionar',
  options = [],
  selected = null,
  onSelect = () => {},
  placeholder = 'Seleccionar',
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const selectedOption = options.find(opt => opt.value === selected)
  const displayLabel = selectedOption ? selectedOption.label : label

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (value) => {
    onSelect(value)
    setIsOpen(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setIsOpen(!isOpen)
    } else if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button
        type="button"
        className="dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{displayLabel}</span>
        <svg
          className={`dropdown-icon ${isOpen ? 'open' : ''}`}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <path
            d="M7 10l5 5 5-5z"
            fill="currentColor"
          />
        </svg>
      </button>

      {isOpen && (
        <ul className="dropdown-menu" role="listbox">
          {options.map((option, idx) => (
            <li key={`${option.value}-${idx}`}>
              <button
                type="button"
                className={`dropdown-option ${selected === option.value ? 'active' : ''}`}
                onClick={() => handleSelect(option.value)}
                role="option"
                aria-selected={selected === option.value}
              >
                <span>{option.label}</span>
                {selected === option.value && (
                  <svg
                    className="dropdown-checkmark"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                  >
                    <path
                      d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
                      fill="currentColor"
                    />
                  </svg>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
