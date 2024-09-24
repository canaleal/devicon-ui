import { useState, useRef, useEffect } from 'react'
import './styles/dropdown.css'

export interface DropdownProps {
  title?: string
  isDisabled: boolean
  selectedOption: string
  options: string[]
  onChange: (value: string) => void
  extraClasses?: string
}

interface DropdownButtonProps {
  isDisabled: boolean
  selectedOption: string
  isOpen: boolean
  toggleDropdown: () => void
}

interface DropdownMenuProps {
  options: string[]
  handleOptionClick: (option: string) => void
}

export const Dropdown = ({
  title,
  selectedOption,
  options,
  onChange,
  isDisabled = false,
  extraClasses = ''
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={`dropdown-container ${extraClasses}`} ref={dropdownRef}>
      {title && <p className='dropdown-container__title'>{title}</p>}
      <DropdownButton
        isDisabled={isDisabled}
        selectedOption={selectedOption}
        isOpen={isOpen}
        toggleDropdown={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <DropdownMenu
          options={options}
          handleOptionClick={(option) => {
            onChange(option)
            setIsOpen(false)
          }}
        />
      )}
    </div>
  )
}

const DropdownButton = ({ isDisabled, selectedOption, isOpen, toggleDropdown }: DropdownButtonProps) => {
  return (
    <button onClick={toggleDropdown} className={`dropdown ${isDisabled ? 'dropdown--disabled' : ''}`} disabled={isDisabled}>
      <span className='dropdown__placeholder'>{selectedOption}</span>
      <i className={`fas ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`} />
    </button>
  )
}

const DropdownMenu = ({ options, handleOptionClick }: DropdownMenuProps) => (
  <ul className='dropdown__popup'>
    {options.map((option) => (
      <li key={option} onClick={() => handleOptionClick(option)} className='dropdown__item'>
        {option}
      </li>
    ))}
  </ul>
)

export default Dropdown
