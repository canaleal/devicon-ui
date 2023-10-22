
import React from 'react'

interface PaginationSelectionProps {
  elementsPerPage: number;
  currentPage: number;
  totalElements: number;
  elementsPerPageOptions: number[];
  handlePerPageChange: (elementsPerPage: number) => void;
}

export const PaginationSelection = ({ elementsPerPage, currentPage, totalElements, elementsPerPageOptions, handlePerPageChange }: PaginationSelectionProps) => {

  const handlePageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handlePerPageChange(parseInt(e.target.value));
  }

  return (
    <div className="flex flex-row dark:text-white gap-2">
      <p className="my-auto">Items Per Page</p>
      <select value={elementsPerPage} onChange={handlePageChange} className=" bg-white dark:bg-zinc-900 dark:border-zinc-600 border rounded-lg px-2 py-2">
        {elementsPerPageOptions.map((option: number) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <p className="my-auto">
        {(currentPage - 1) * elementsPerPage + 1}-{Math.min(currentPage * elementsPerPage, totalElements)} of {totalElements} icons
      </p>
    </div>
  )
}

export default PaginationSelection