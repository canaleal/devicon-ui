import React from 'react'
import './paginationSelection.css'

interface PaginationSelectionProps {
  elementsPerPage: number
  currentPage: number
  totalElements: number
  elementsPerPageOptions: number[]
  handlePerPageChange: (elementsPerPage: number) => void
  extraClasses?: string
}

const PaginationSelection: React.FC<PaginationSelectionProps> = ({
  elementsPerPage,
  currentPage,
  totalElements,
  elementsPerPageOptions,
  handlePerPageChange,
  extraClasses = ''
}) => {
  const firstElementIndex = (currentPage - 1) * elementsPerPage + 1
  const lastElementIndex = Math.min(currentPage * elementsPerPage, totalElements)
  const totalElementsText = `${firstElementIndex}-${lastElementIndex} of ${totalElements} icons`

  return (
    <div className={`pagination-selection ${extraClasses}`}>
      <p>Items Per Page</p>
      <select
        value={elementsPerPage}
        onChange={(e) => handlePerPageChange(parseInt(e.target.value))}
        className='dropdown dropdown--small'
      >
        {elementsPerPageOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <p>{totalElementsText}</p>
    </div>
  )
}

export default PaginationSelection
