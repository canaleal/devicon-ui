import React from 'react'

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
  extraClasses
}: PaginationSelectionProps) => {
  const handlePageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handlePerPageChange(parseInt(e.target.value, 10))
  }

  const firstElementIndex = (currentPage - 1) * elementsPerPage + 1
  const lastElementIndex = Math.min(currentPage * elementsPerPage, totalElements)
  const TOTAL_ELEMENTS_TEXT = `${firstElementIndex}-${lastElementIndex} of ${totalElements} icons`

  return (
    <div className={`flex flex-row items-center gap-2 text-sm ${extraClasses}`}>
      <p>Items Per Page</p>
      <select
        value={elementsPerPage}
        onChange={handlePageChange}
        className="dropdown dropdown--small"
      >
        {elementsPerPageOptions.map((option: number) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <p>{TOTAL_ELEMENTS_TEXT}</p>
    </div>
  )
}

export default PaginationSelection
