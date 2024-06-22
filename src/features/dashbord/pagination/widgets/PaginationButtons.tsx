import { useEffect, useState } from 'react'
import { getPaginationButtons } from '../helpers/paginationHelpers'

interface PaginationButtonsProps {
  currentPage: number
  setCurrentPage: (page: number) => void
  totalPages: number
}

const BUTTON_STYLE = {
  base: 'px-4 py-2 rounded-md text-sm',
  active: 'bg-primary-600 text-white',
  hover: 'hover:bg-gray-200 hover:shadow-sm dark:hover:bg-dark-600',
  disabled: 'text-gray-400'
}

const NavButton = ({ disabled, onClick, direction }: { disabled: boolean, onClick: () => void, direction: 'left' | 'right' }) => (
  <button
    className={`${BUTTON_STYLE.base} ${BUTTON_STYLE.hover} ${disabled ? BUTTON_STYLE.disabled : ''}`}
    disabled={disabled}
    onClick={onClick}
  >
    <i className={`fa fa-arrow-${direction}`}></i>
  </button>
)

const PageButton = ({ page, currentPage, setCurrentPage }: { page: number, currentPage: number, setCurrentPage: (page: number) => void }) => (
  <button
    key={page}
    className={`${BUTTON_STYLE.base} ${page === currentPage ? BUTTON_STYLE.active : BUTTON_STYLE.hover}`}
    onClick={() => setCurrentPage(page)}
  >
    {page}
  </button>
)

const Ellipsis = ({ key }: { key: string }) => (
  <span key={key} className={`${BUTTON_STYLE.base} ${BUTTON_STYLE.hover}`}>
    ...
  </span>
)

export const PaginationButtons = ({ currentPage, setCurrentPage, totalPages }: PaginationButtonsProps) => {
  const [pagesToRender, setPagesToRender] = useState<(string | number)[]>([])

  useEffect(() => {
    setPagesToRender(getPaginationButtons(currentPage, totalPages))
  }, [currentPage, totalPages])

  return (
    <div className='flex flex-row dark:text-white'>
      <NavButton
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        direction='left'
      />

      {pagesToRender.map((page, idx) => {
        const isNumber = typeof page === 'number'
        const key = isNumber ? page : `${pagesToRender[idx - 1]}-${pagesToRender[idx + 1]}`
        return isNumber ? (
          <PageButton key={key} page={page} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        ) : (
          <Ellipsis key={key as string} />
        )
      })}

      <NavButton
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
        direction='right'
      />
    </div>
  )
}

export default PaginationButtons
