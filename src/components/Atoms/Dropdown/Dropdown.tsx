import { BaseDropdown } from './BaseDropdown'

export interface DropdownProps {
  title?: string
  isDisabled: boolean
  selectedOption: string
  options: string[]
  onChange: (value: string) => void
  extraClasses?: string
}

export const Dropdown = ({
  title,
  isDisabled,
  selectedOption,
  options,
  onChange,
  extraClasses = ''
}: DropdownProps) => {
  return (
    <BaseDropdown
      title={title}
      isDisabled={isDisabled}
      extraClasses={extraClasses}
      renderButton={({ isOpen, toggle }) => (
        <button onClick={toggle} className={`dropdown ${isDisabled ? 'dropdown--disabled' : ''}`} disabled={isDisabled}>
          <span className='dropdown__placeholder'>{selectedOption}</span>
          <i className={`fas ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`} />
        </button>
      )}
      renderPopup={({ close }) => (
        <ul className='dropdown__popup'>
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                onChange(option)
                close()
              }}
              className='dropdown__item'
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    />
  )
}
