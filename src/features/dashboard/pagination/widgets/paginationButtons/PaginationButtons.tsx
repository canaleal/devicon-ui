import React, { useEffect, useState } from 'react'
import { getPaginationButtons } from './paginationHelpers'
import './paginationButtons.css'

interface PaginationButtonsProps {
  currentPage: number
  setCurrentPage: (page: number) => void
  totalPages: number
}

interface ArrowButtonProps {
  disabled: boolean
  onClick: () => void
  direction: 'left' | 'right'
}

const ArrowButton = ({ disabled, onClick, direction }: ArrowButtonProps) => (
  <button
    className={`button button--small ${disabled ? 'button--disabled' : ''}`}
    disabled={disabled}
    onClick={onClick}
  >
    <i className={`fa fa-arrow-${direction}`} />
  </button>
)

const PageButton = ({ page, isSelected, onClick }: { page: number; isSelected: boolean; onClick: () => void }) => (
  <button className={`button button--small ${isSelected ? 'button--selected' : ''}`} onClick={onClick}>
    {page}
  </button>
)

const Ellipsis = ({ index }: { index: number }) => (
  <span key={`ellipsis-${index}`} className='button button--small button--disabled'>
    <i className='fa fa-ellipsis-h' />
  </span>
)

const PaginationButtons = ({ currentPage, setCurrentPage, totalPages }: PaginationButtonsProps) => {
  const [pagesToRender, setPagesToRender] = useState<(number | string)[]>([])

  useEffect(() => {
    setPagesToRender(getPaginationButtons(currentPage, totalPages))
  }, [currentPage, totalPages])

  if (pagesToRender.length <= 1) return null

  return (
    <div className='pagination-buttons'>
      <ArrowButton disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} direction='left' />

      {pagesToRender.map((item, index) =>
        typeof item === 'number' ? (
          <PageButton key={item} page={item} isSelected={currentPage === item} onClick={() => setCurrentPage(item)} />
        ) : (
          <Ellipsis key={index} index={index} />
        )
      )}

      <ArrowButton
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
        direction='right'
      />
    </div>
  )
}

export default PaginationButtons
