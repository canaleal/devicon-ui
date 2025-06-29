import { BaseDropdown } from './BaseDropdown'

const PALETTE_COLORS = {
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

export interface ColorPickerDropdownProps {
  title: string
  isDisabled: boolean
  defaultColor: string
  selectedColor: string
  onColorChange: (value: string) => void
  extraClasses?: string
}

export const ColorPickerDropdown = ({
  title,
  isDisabled,
  defaultColor,
  selectedColor,
  onColorChange,
  extraClasses = ''
}: ColorPickerDropdownProps) => {
  const isResetDisabled = selectedColor === defaultColor

  return (
    <BaseDropdown
      title={title}
      isDisabled={isDisabled}
      extraClasses={extraClasses}
      renderButton={({ isOpen, toggle }) => (
        <button disabled={isDisabled} onClick={toggle} className={`dropdown ${isDisabled ? 'dropdown--disabled' : ''}`}>
          <span className='dropdown__placeholder'>
            <span className='dropdown-color__mark' style={{ backgroundColor: selectedColor }} />
            {selectedColor}
          </span>
          <i className={`fas ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`} />
        </button>
      )}
      renderPopup={({ close }) => (
        <div className='dropdown__popup'>
          <input
            type='color'
            value={selectedColor}
            className='dropdown-color__input'
            onChange={(e) => onColorChange(e.target.value)}
          />
          <div className='dropdown-color__grid'>
            {Object.values(PALETTE_COLORS).map((color) => (
              <div
                key={color}
                className='dropdown-color__item'
                style={{ backgroundColor: color }}
                onClick={() => onColorChange(color)}
              />
            ))}
          </div>

          <button
            disabled={isResetDisabled}
            onClick={() => {
              onColorChange(defaultColor)
              close()
            }}
            className={`dropdown__item dropdown__item--reset ${isResetDisabled ? 'dropdown__item--disabled' : ''}`}
          >
            <span className='dropdown-color__mark' style={{ backgroundColor: defaultColor }} />
            Reset Color
          </button>
        </div>
      )}
    />
  )
}
