import React, { useState, useEffect, useRef } from 'react'
import './styles/searchBar.css'
import { SEARCHBAR_SIZES } from './SearchBarSizes'


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
        className={`${SEARCHBAR_SIZES[size]} searchbar`}
      />

      {showOptions && (
        <ul className="searchbar__popup">
          {filteredOptions.slice(0, 10).map((option, index) => (
            <li key={index} className="searchbar__popup__item" onClick={() => handleOptionClick(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}

export default SearchBar
