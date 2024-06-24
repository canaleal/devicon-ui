import { useState, useRef, useEffect } from 'react'
import { DROPDOWN_POPUP_STYLE, DROPDOWN_STYLE } from './dropdownStyle'

const sizes = {
  sm: 'w-16',
  md: 'w-32',
  lg: 'w-48',
  full: 'w-full'
}

export interface DropdownProps {
  title?: string
  selectedOption: string
  options: string[]
  onChange: (value: string) => void
  size: keyof typeof sizes
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
    <div className={`relative ${sizes[size]} ${extraClasses} gap-2 text-sm`} ref={dropdownRef}>
      {title && <p className='font-bold mb-1'>{title}</p>}

      <button onClick={toggleDropdown} className={`${DROPDOWN_STYLE.base}`}>
        <span>{selectedOption}</span>
        <i className={`fas ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'} ml-auto my-auto`} />
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
