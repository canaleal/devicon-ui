import { useEffect, useState } from 'react'
import { getPaginationButtons } from '../helpers/paginationHelpers'
import { v4 as uuidv4 } from 'uuid'

interface PaginationButtonsProps {
  currentPage: number
  setCurrentPage: (page: number) => void
  totalPages: number
}

const BUTTON_STYLE = {
  base: 'px-4 py-2 rounded-md text-sm',
  active: 'bg-frog-700 hover:bg-frog-800 text-smoke-100',
  hover: 'hover:bg-smoke-200',
  disabled: 'text-smoke-400 hover:bg-smoke-100'
}

interface NavButtonProps {
  disabled: boolean
  onClick: () => void
  direction: 'left' | 'right'
}

const NavButton = ({ disabled, onClick, direction }: NavButtonProps) => {
  const NAV_BUTTON_STYLE = `${BUTTON_STYLE.base} ${disabled ? BUTTON_STYLE.disabled : BUTTON_STYLE.hover}`
  return (
    <button className={NAV_BUTTON_STYLE} disabled={disabled} onClick={onClick}>
      <i className={`fa fa-arrow-${direction}`}></i>
    </button>
  )
}

interface PageButtonProps {
  page: number
  currentPage: number
  setCurrentPage: (page: number) => void
}

const PageButton = ({ page, currentPage, setCurrentPage }: PageButtonProps) => {
  const PAGE_BUTTON_STYLE = `${BUTTON_STYLE.base} ${currentPage === page ? BUTTON_STYLE.active : BUTTON_STYLE.hover}`
  return (
    <button className={PAGE_BUTTON_STYLE} onClick={() => setCurrentPage(page)}>
      {page}
    </button>
  )
}

const Ellipsis = () => {
  const ELLIPSIS_STYLE = `${BUTTON_STYLE.base} ${BUTTON_STYLE.hover}`
  return (
    <span className={ELLIPSIS_STYLE}>
      <i className='fa fa-ellipsis-h'></i>
    </span>
  )
}

export const PaginationButtons = ({ currentPage, setCurrentPage, totalPages }: PaginationButtonsProps) => {
  const [pagesToRender, setPagesToRender] = useState<(string | number)[]>([])

  useEffect(() => {
    setPagesToRender(getPaginationButtons(currentPage, totalPages))
  }, [currentPage, totalPages])

  return (
    <div className='flex flex-row '>
      <NavButton disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} direction='left' />

      {pagesToRender.map((page) => {
        return typeof page === 'number' ? (
          <PageButton key={uuidv4()} page={page} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        ) : (
          <Ellipsis key={uuidv4()} />
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
