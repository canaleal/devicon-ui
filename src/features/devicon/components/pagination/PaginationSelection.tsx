
import React from 'react'

interface PaginationSelectionProps {
  elementsPerPage: number;
  currentPage: number;
  totalIcons: number;
  elementsPerPageOptions: number[];
  handlePerPageChange: (elementsPerPage: number) => void;
}

const PaginationSelection = ({ elementsPerPage, currentPage, totalIcons, elementsPerPageOptions, handlePerPageChange }: PaginationSelectionProps) => {

  const handlePageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handlePerPageChange(parseInt(e.target.value));
  }

  return (
    <div className="flex flex-row dark:text-white">
      <p className="my-auto">Items Per Page</p>
      <select value={elementsPerPage} onChange={handlePageChange} className="ml-2 bg-white dark:bg-zinc-900 dark:border-zinc-600 border rounded-lg px-2 py-2">
        {elementsPerPageOptions.map((option: number) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <p className="ml-4 my-auto">
        {(currentPage - 1) * elementsPerPage + 1}-{Math.min(currentPage * elementsPerPage, totalIcons)} of {totalIcons} icons
      </p>
    </div>
  )
}

export default PaginationSelection