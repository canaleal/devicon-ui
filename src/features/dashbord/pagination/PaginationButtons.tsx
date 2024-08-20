import { useEffect, useState } from 'react'
import { getPaginationButtons } from './helpers/paginationHelpers'
import { v4 as uuidv4 } from 'uuid'

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

const ArrowButton: React.FC<ArrowButtonProps> = ({ disabled, onClick, direction }) => {
  return (
    <button
      className={`button button--small ${disabled ? 'button--disabled' : ''}`}
      disabled={disabled}
      onClick={onClick}
    >
      <i className={`fa fa-arrow-${direction}`}></i>
    </button>
  )
}

const PaginationButtons: React.FC<PaginationButtonsProps> = ({ currentPage, setCurrentPage, totalPages }) => {
  const [pagesToRender, setPagesToRender] = useState<(string | number)[]>([])

  useEffect(() => {
    setPagesToRender(getPaginationButtons(currentPage, totalPages))
  }, [currentPage, totalPages])


  return pagesToRender.length === 1 ? null : (
    <div className='flex flex-row'>
      <ArrowButton disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} direction='left' />

      {pagesToRender.map((page) =>
        typeof page === 'number' ? (
          <button
            key={uuidv4()}
            className={`button button--small ${currentPage === page ? 'button--selected' : ''}`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ) : (
          <span key={uuidv4()} className='button button--small button--disabled'>
            <i className='fa fa-ellipsis-h'></i>
          </span>
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
