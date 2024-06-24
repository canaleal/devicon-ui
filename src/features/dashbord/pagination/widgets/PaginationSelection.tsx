import React from 'react'
import { DROPDOWN_STYLE } from '../../../../components/Elements/Dropdown/dropdownStyle'

interface PaginationSelectionProps {
  elementsPerPage: number
  currentPage: number
  totalElements: number
  elementsPerPageOptions: number[]
  handlePerPageChange: (elementsPerPage: number) => void
  extraClasses?: string
}

export const PaginationSelection = ({
  elementsPerPage,
  currentPage,
  totalElements,
  elementsPerPageOptions,
  handlePerPageChange,
  extraClasses
}: PaginationSelectionProps) => {
  const handlePageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handlePerPageChange(parseInt(e.target.value))
  }

  const TOTAL_ELEMENTS_TEXT = `${(currentPage - 1) * elementsPerPage + 1}-${Math.min(currentPage * elementsPerPage, totalElements)} of ${totalElements} icons`

  return (
    <div className={`flex flex-row gap-2 text-sm items-center ${extraClasses}`}>
      <p>Items Per Page</p>
      <select value={elementsPerPage} onChange={handlePageChange} className={`${DROPDOWN_STYLE.baseSmall}`}>
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
