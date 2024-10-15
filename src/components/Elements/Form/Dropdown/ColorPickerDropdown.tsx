import { useEffect, useRef, useState } from 'react'
import './styles/dropdown.css'

export interface DropdownProps {
  title?: string
  isDisabled: boolean
  defaultColor: string
  selectedColor: string
  onColorChange: (value: string) => void
  extraClasses?: string
}

interface DropdownButtonProps {
  isDisabled: boolean
  selectedColor: string
  isOpen: boolean
  toggleDropdown: () => void
}

interface DropdownPopupProps {
  selectedColor: string
  defaultColor: string
  onColorChange: (color: string) => void
  resetColor: () => void
}

interface ColorInputProps {
  selectedColor: string
  onColorChange: (color: string) => void
}

interface ColorPaletteProps {
  onColorChange: (color: string) => void
}

const PALLET_COLORS = {
  rose: '#f44336',
  orange: '#ff9800',
  yellow: '#ffc107',
  cyan: '#00bcd4',
  green: '#4caf50',
  brown: '#795548',
  purple: '#673ab7',
  blue: '#2196f3',
  gray: '#9e9e9e',
  black: '#000000',
  white: '#ffffff',
  pink: '#e91e63'
}

const ColorPickerDropdown = ({
  title,
  isDisabled,
  defaultColor,
  selectedColor,
  onColorChange,
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
        selectedColor={selectedColor}
        isOpen={isOpen}
        toggleDropdown={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <DropdownPopup
          selectedColor={selectedColor}
          defaultColor={defaultColor}
          onColorChange={onColorChange}
          resetColor={() => onColorChange(defaultColor)}
        />
      )}
    </div>
  )
}

const DropdownButton = ({ isDisabled, selectedColor, isOpen, toggleDropdown }: DropdownButtonProps) => {
  return (
    <button
      disabled={isDisabled}
      onClick={toggleDropdown}
      className={`dropdown ${isDisabled ? 'dropdown--disabled' : ''}`}
    >
      <span className='dropdown__placeholder'>
        <span className='dropdown__color-picker__mark' style={{ backgroundColor: selectedColor }} />
        {selectedColor}
      </span>
      <i className={`fas ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`} />
    </button>
  )
}

const DropdownPopup = ({ selectedColor, defaultColor, onColorChange, resetColor }: DropdownPopupProps) => {
  const isResetButtonDisabled = selectedColor === defaultColor
  return (
    <div className='dropdown__popup'>
      <div className='flex flex-col gap-2 p-4'>
        <ColorInput selectedColor={selectedColor} onColorChange={onColorChange} />
        <ColorPalette onColorChange={onColorChange} />
      </div>
      <button
        disabled={isResetButtonDisabled}
        className={`dropdown__item dropdown__item--reset ${isResetButtonDisabled ? 'dropdown__item--disabled' : ''}`}
        onClick={resetColor}
      >
        <span className='dropdown__color-picker__mark' style={{ backgroundColor: defaultColor }} />
        Reset Color
      </button>
    </div>
  )
}

const ColorInput = ({ selectedColor, onColorChange }: ColorInputProps) => (
  <input
    type='color'
    value={selectedColor}
    className='dropdown__color-picker__input'
    onChange={(e) => onColorChange(e.target.value)}
  />
)

const ColorPalette = ({ onColorChange }: ColorPaletteProps) => (
  <div className='dropdown__color-picker__grids'>
    {Object.values(PALLET_COLORS).map((color) => (
      <div
        key={color}
        className='dropdown__color-picker__item'
        style={{ backgroundColor: color }}
        onClick={() => onColorChange(color)}
      />
    ))}
  </div>
)

export default ColorPickerDropdown
