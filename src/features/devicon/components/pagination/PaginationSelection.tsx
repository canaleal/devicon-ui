
import React from 'react'

interface PaginationSelectionProps {
    iconsPerPage: number;
    currentPage: number;
    totalIcons: number;
    handleIconsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const PaginationSelection = ({iconsPerPage, currentPage, totalIcons, handleIconsPerPageChange}: PaginationSelectionProps) => {
  return (
    <div className="flex flex-row dark:text-white">
    <p className="my-auto">Items Per Page</p>
    <select value={iconsPerPage} onChange={handleIconsPerPageChange} className="ml-2 bg-white dark:bg-zinc-900 dark:border-zinc-600 border rounded-lg px-2 py-2">
      <option value={48}>48</option>
      <option value={72}>72</option>
      <option value={96}>96</option>
    </select>
    <p className="ml-4 my-auto">
      {(currentPage - 1) * iconsPerPage + 1}-{Math.min(currentPage * iconsPerPage, totalIcons)} of {totalIcons} icons
    </p>
  </div>
  )
}

export default PaginationSelection