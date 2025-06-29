import { BaseDropdown } from './BaseDropdown'

export interface MultiSelectDropdownProps {
  title?: string
  isDisabled?: boolean
  options: {
    label: string
    value: string
    count?: number
  }[]
  selected: string[]
  onChange: (newSelected: string[]) => void
  onReset: () => void
  extraClasses?: string
  showCount?: boolean
}

export const MultiSelectDropdown = ({
  title,
  isDisabled = false,
  options,
  selected,
  onChange,
  onReset,
  extraClasses = '',
  showCount = true
}: MultiSelectDropdownProps) => {
  const isResetDisabled = selected.length === 0

  const toggleOption = (value: string) => {
    onChange(selected.includes(value) ? selected.filter((v) => v !== value) : [...selected, value])
  }

  return (
    <BaseDropdown
      isDisabled={isDisabled}
      extraClasses={extraClasses}
      renderButton={({ isOpen, toggle }) => (
        <button
          disabled={isDisabled}
          onClick={toggle}
          className={`dropdown ${isDisabled ? 'dropdown--disabled' : ''} ${isOpen ? 'is-open' : ''}`}
        >
          <span className='dropdown__placeholder'>
            {title}
            {selected.length > 0 && (
              <span>
                ({selected.length}/{options.length})
              </span>
            )}
          </span>
          <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'}`} />
        </button>
      )}
      renderPopup={() => (
        <div className='dropdown__popup'>
          <div className='dropdown__popup-scrollable'>
            {options.map((opt) => {
              const isSelected = selected.includes(opt.value)
              return (
                <button
                  key={opt.value}
                  className={`dropdown__item ${isSelected ? 'dropdown__item--selected' : ''}`}
                  onClick={() => toggleOption(opt.value)}
                >
                  <span className='truncate'>{opt.label}</span>
                  {showCount && <span className='dropdown__item-count'>{opt.count}</span>}
                </button>
              )
            })}
          </div>

          {onReset && (
            <button
              disabled={isResetDisabled}
              onClick={() => {
                onReset()
              }}
              className={`dropdown__item dropdown__item--reset ${isResetDisabled ? 'dropdown__item--disabled' : ''}`}
            >
              <i className='fas fa-undo-alt' />
              Reset
            </button>
          )}
        </div>
      )}
    />
  )
}
