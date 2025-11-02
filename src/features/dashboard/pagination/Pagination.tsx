import React, { useState, useEffect, useMemo } from 'react'
import { IIcon } from '../../../types'
import PaginationButtons from './widgets/paginationButtons/PaginationButtons'
import PaginationCard from './widgets/paginationCard/PaginationCard'
import PaginationSelection from './widgets/paginationSelection/PaginationSelection'
import { DEFAULT_ELEMENTS_PER_PAGE, ELEMENTS_PER_PAGE_OPTIONS } from './types'
import './styles/pagination.css'
import usePagination from './hooks/usePagination'

interface IPaginationGridProps {
  icons: IIcon[]
}

const PaginationGrid = ({ icons }: IPaginationGridProps) => (
  <div className='pagination__grid'>
    {icons.map((icon) => (
      <PaginationCard key={icon.name} icon={icon} />
    ))}
  </div>
)

const NoIconsFound = () => (
  <div className='pagination__no-icons'>
    <p className='pagination__no-icons-title'>No Icons found</p>
    <p className='pagination__no-icons-description'>Try a different search term or change filters</p>
  </div>
)

interface IPaginationProps {
  filteredIcons: IIcon[]
}

export const Pagination = React.memo(({ filteredIcons }: IPaginationProps) => {
  const [elementsPerPage, setElementsPerPage] = useState(DEFAULT_ELEMENTS_PER_PAGE)
  const { paginatedIcons, totalPages, currentPage, setCurrentPage } = usePagination(filteredIcons, elementsPerPage)

  useEffect(() => {
    setCurrentPage(1)
  }, [filteredIcons, elementsPerPage])

  const handleIconsPerPageChange = (count: number) => {
    setElementsPerPage(count)
  }

  const totalIcons = useMemo(() => filteredIcons.length, [filteredIcons])

  return (
    <section className='pagination'>
      <div className='base-container pagination__container'>
        <div className='pagination__header'>
          <p className='pagination__header-title'>{totalIcons} Icons</p>
          <p className='pagination__header-info'>
            Page {currentPage} of {totalPages || 1}
          </p>
        </div>

        {paginatedIcons.length > 0 ? <PaginationGrid icons={paginatedIcons} /> : <NoIconsFound />}

        <div className='pagination__footer'>
          <PaginationSelection
            elementsPerPage={elementsPerPage}
            currentPage={currentPage}
            totalElements={totalIcons}
            elementsPerPageOptions={ELEMENTS_PER_PAGE_OPTIONS}
            handlePerPageChange={handleIconsPerPageChange}
          />
          <PaginationButtons currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
        </div>
      </div>
    </section>
)
})
