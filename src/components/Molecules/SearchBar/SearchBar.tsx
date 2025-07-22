import React, { useState, useEffect, useRef } from 'react'
import './searchBar.css'

export interface SearchBarProps {
  placeholder?: string
  autoCompleteOptions?: string[]
  extraClasses?: string
  onSearch: (query: string) => void
}

export const SearchBar = ({
  placeholder = 'Search',
  autoCompleteOptions = [],
  extraClasses,
  onSearch
}: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [filteredOptions, setFilteredOptions] = useState<string[]>([])
  const [showOptions, setShowOptions] = useState<boolean>(false)
  const [isFocused, setIsFocused] = useState<boolean>(false)
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
      setIsFocused(false)
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
    <div className={`searchBar-container ${extraClasses}`} ref={searchRef}>
      <div className='searchBar__input'>
        <div className='searchBar__input-icon'>
          <i className='fa fa-search' />
        </div>
        <input
          type='text'
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 100)} // allow option click
          placeholder={placeholder}
          className='searchBar__input-text'
        />
      </div>

      {showOptions && isFocused && (
        <ul className='searchBar__popup'>
          {filteredOptions.slice(0, 10).map((option, index) => (
            <li key={index} className='searchBar__popup-item' onClick={() => handleOptionClick(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchBar
