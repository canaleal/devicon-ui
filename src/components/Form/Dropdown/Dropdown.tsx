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
      {title && <p className='font-bold text-sm '>{title}</p>}
      <select
        value={selectedOption}
        onChange={(e) => {
          onChange(e.target.value)
        }}
        className=' h-12 hover:cursor-pointer text-md  border  rounded-lg px-4 py-2 w-full'
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
