import { useState, useRef, useEffect } from 'react'

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
    <div className={`relative ${sizes[size]} ${extraClasses} gap-2 text-sm `} ref={dropdownRef}>
      {title && <p className='font-bold mb-1'>{title}</p>}

      <button
        onClick={toggleDropdown}
        className='h-12 hover:cursor-pointer  border rounded-lg px-4 py-2 w-full flex justify-between items-center bg-white '
      >
        <span>{selectedOption}</span>
        <i className={`fas ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'} ml-auto my-auto`} />
      </button>

      {isOpen && (
        <ul className='absolute mt-1 w-full bg-white border rounded-lg shadow-lg z-50'>
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleOptionClick(option)}
              className='px-4 py-2 hover:bg-gray-200 cursor-pointer'
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
