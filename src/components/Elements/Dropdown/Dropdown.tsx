import { useState, useRef, useEffect } from 'react'
import { DROPDOWN_POPUP_STYLE, DROPDOWN_SIZES, DROPDOWN_STYLE } from './dropdownStyles'

export interface DropdownProps {
  title?: string
  selectedOption: string
  options: string[]
  onChange: (value: string) => void
  size: keyof typeof DROPDOWN_SIZES
  extraClasses?: string
}

export const Dropdown = ({ title, selectedOption, options, onChange, size, extraClasses = '' }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionClick = (option: string) => {
    onChange(option)
    setIsOpen(false)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className={`relative ${DROPDOWN_SIZES[size]} ${extraClasses}`} ref={dropdownRef}>
      {title && <p className='font-bold text-sm mb-1'>{title}</p>}
      <button
        onClick={toggleDropdown}
        className={`${DROPDOWN_STYLE.base} ${DROPDOWN_STYLE.light} ${DROPDOWN_STYLE.dark}`}
      >
        <span>{selectedOption}</span>
        <i className={`fas ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`} />
      </button>
      {isOpen && (
        <ul className={`${DROPDOWN_POPUP_STYLE.base}`}>
          {options.map((option) => (
            <li key={option} onClick={() => handleOptionClick(option)} className={`${DROPDOWN_POPUP_STYLE.item}`}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
