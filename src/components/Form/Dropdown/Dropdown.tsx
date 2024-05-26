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
  return (
    <div className={`flex flex-col gap-2 ${sizes[size]} ${extraClasses}`}>
      {title && <p className='font-bold text-sm dark:text-white'>{title}</p>}
      <select
        value={selectedOption}
        onChange={(e) => {
          onChange(e.target.value)
        }}
        className='bg-white h-12 dark:bg-dark-900 text-md dark:text-white border dark:border-dark-500 rounded-lg px-4 py-2 w-full'
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Dropdown
