import { useState, useRef, useEffect } from 'react'
import { DROPDOWN_SIZES } from './dropdownSize'
import './styles/dropdown.css'

export interface DropdownProps {
  title?: string
  isDisabled: boolean
  selectedOption: string
  options: string[]
  onChange: (value: string) => void
  size: keyof typeof DROPDOWN_SIZES
  extraClasses?: string
}

export const Dropdown = ({
  title,
  selectedOption,
  options,
  onChange,
  size,
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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleDropdown = () => setIsOpen(!isOpen)

  return (
    <div className={`relative ${DROPDOWN_SIZES[size]} ${extraClasses}`} ref={dropdownRef}>
      {title && <p className='font-bold text-sm mb-1'>{title}</p>}
      <DropdownButton
        isDisabled={isDisabled}
        selectedOption={selectedOption}
        isOpen={isOpen}
        toggleDropdown={toggleDropdown}
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

const DropdownButton = ({
  isDisabled,
  selectedOption,
  isOpen,
  toggleDropdown
}: {
  isDisabled: boolean
  selectedOption: string
  isOpen: boolean
  toggleDropdown: () => void
}) => {
  const BUTTON_STYLE = `dropdown ${isDisabled ? 'dropdown--disabled' : ''}`
  return (
    <button onClick={toggleDropdown} className={BUTTON_STYLE}>
      <span className='dropdown__placeholder'>{selectedOption}</span>
      <i className={`fas ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`} />
    </button>
  )
}

const DropdownMenu = ({
  options,
  handleOptionClick
}: {
  options: string[]
  handleOptionClick: (option: string) => void
}) => (
  <ul className='dropdown__popup'>
    {options.map((option) => (
      <li key={option} onClick={() => handleOptionClick(option)} className={'dropdown__item'}>
        {option}
      </li>
    ))}
  </ul>
)

export default Dropdown
