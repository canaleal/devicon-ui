import React, { useState, useEffect, useRef } from 'react'

const SEARCHBAR_STYLE = {
  input: 'h-12 text-sm px-4  flex justify-between items-center border rounded-md',
  colors: 'bg-white text-dark-900 dark:bg-dark-900 dark:text-smoke-100 dark:border-dark-400'
}

const SEARCHBAR_AUTOFILL_POPUP_STYLE = {
  container: 'absolute mt-1 w-full bg-white dark:text-dark-900  border  shadow-lg z-30 rounded-md',
  item: 'px-4 py-2 hover:bg-gray-200 cursor-pointer text-sm'
}

const SEARCHBAR_SIZES = {
  sm: 'w-16',
  md: 'w-32',
  lg: 'w-48',
  xl: 'w-96',
  xxl: 'w-[24rem]',
  xxxl: 'w-[32rem]',
  full: 'w-full'
}

export interface SearchBarProps {
  placeholder?: string
  autoCompleteOptions?: string[]
  size: keyof typeof SEARCHBAR_SIZES
  onSearch: (query: string) => void
}

export const SearchBar = ({ placeholder = 'Search', autoCompleteOptions = [], size, onSearch }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [filteredOptions, setFilteredOptions] = useState<string[]>([])
  const [showOptions, setShowOptions] = useState<boolean>(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (searchTerm && autoCompleteOptions.length) {
      const options = autoCompleteOptions.filter((option) => option.toLowerCase().includes(searchTerm.toLowerCase()))
      setFilteredOptions(options)
      setShowOptions(options.length > 0)
    } else {
      setShowOptions(false)
    }
  }, [searchTerm, autoCompleteOptions])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchTerm(value)
    onSearch(value)
  }

  const handleOptionClick = (option: string) => {
    setSearchTerm(option)
    onSearch(option)
    setShowOptions(false)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
      setShowOptions(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <article className='relative' ref={searchRef}>
      <input
        type='text'
        value={searchTerm}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={`${SEARCHBAR_SIZES[size]} ${SEARCHBAR_STYLE.input} ${SEARCHBAR_STYLE.colors}`}
      />

      {showOptions && (
        <ul className={SEARCHBAR_AUTOFILL_POPUP_STYLE.container}>
          {filteredOptions.slice(0, 10).map((option, index) => (
            <li key={index} className={SEARCHBAR_AUTOFILL_POPUP_STYLE.item} onClick={() => handleOptionClick(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}

export default SearchBar
