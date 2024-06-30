import React, { useState, useEffect, useRef } from 'react'
import { SEARCHBAR_AUTO_STYLE, SEARCHBAR_SIZES, SEARCHBAR_STYLE } from './SearchBarStyles'

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
    <div className='relative' ref={searchRef}>
      <input
        type='text'
        value={searchTerm}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={`${SEARCHBAR_SIZES[size]} ${SEARCHBAR_STYLE.base} ${SEARCHBAR_STYLE.light} ${SEARCHBAR_STYLE.dark}`}
      />

      {showOptions && (
        <ul className={SEARCHBAR_AUTO_STYLE.base}>
          {filteredOptions.slice(0, 10).map((option, index) => (
            <li key={index} className={SEARCHBAR_AUTO_STYLE.item} onClick={() => handleOptionClick(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchBar
