import { useEffect, useState } from 'react'
import { getPaginationButtons } from '../helpers/paginationHelpers'
import { v4 as uuidv4 } from 'uuid'
import { BUTTON_STYLES } from '../../../../components/Elements/Button/ButtonStyles'

interface PaginationButtonsProps {
  currentPage: number
  setCurrentPage: (page: number) => void
  totalPages: number
}

interface NavButtonProps {
  disabled: boolean
  onClick: () => void
  direction: 'left' | 'right'
}

const NavButton = ({ disabled, onClick, direction }: NavButtonProps) => {
  return (
    <button
      className={`${BUTTON_STYLES.baseSmall} ${disabled ? BUTTON_STYLES.disabled : BUTTON_STYLES.hover}`}
      disabled={disabled}
      onClick={onClick}
    >
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
  return (
    <button
      className={`${BUTTON_STYLES.baseSmall} ${currentPage === page ? BUTTON_STYLES.active : BUTTON_STYLES.hover}`}
      onClick={() => setCurrentPage(page)}
    >
      {page}
    </button>
  )
}

const Ellipsis = () => {
  return (
    <span className={`${BUTTON_STYLES.baseSmall} ${BUTTON_STYLES.hover}`}>
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
