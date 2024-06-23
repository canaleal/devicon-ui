import React from 'react'

interface PaginationSelectionProps {
  elementsPerPage: number
  currentPage: number
  totalElements: number
  elementsPerPageOptions: number[]
  handlePerPageChange: (elementsPerPage: number) => void
}

export const PaginationSelection = ({
  elementsPerPage,
  currentPage,
  totalElements,
  elementsPerPageOptions,
  handlePerPageChange
}: PaginationSelectionProps) => {
  const handlePageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handlePerPageChange(parseInt(e.target.value))
  }

  return (
    <div className='hidden lg:flex flex-row gap-2'>
      <p className='my-auto'>Items Per Page</p>
      <select
        value={elementsPerPage}
        onChange={handlePageChange}
        className=' hover:cursor-pointer  border rounded-md px-2 py-2'
      >
        {elementsPerPageOptions.map((option: number) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <p className='my-auto'>
        {(currentPage - 1) * elementsPerPage + 1}-{Math.min(currentPage * elementsPerPage, totalElements)} of{' '}
        {totalElements} icons
      </p>
    </div>
  )
}

export default PaginationSelection
