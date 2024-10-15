import { useEffect, useState } from 'react'
import { IIcon } from '../../../types'
import PaginationButtons from './widgets/paginationButtons/PaginationButtons'
import PaginationCard from './widgets/paginationCard/PaginationCard'
import PaginationSelection from './widgets/paginationSelection/PaginationSelection'
import { DEFAULT_ELEMENTS_PER_PAGE, ELEMENTS_PER_PAGE_OPTIONS } from './types'

import './styles/pagination.css'

interface IPaginationGridProps {
  icons: IIcon[]
}
export const PaginationGrid = ({ icons }: IPaginationGridProps) => {
  return (
    <div className='pagination__grid'>
      {icons.map((icon) => (
        <PaginationCard key={icon.name} icon={icon} />
      ))}
    </div>
  )
}

export const NoIconsFound = () => (
  <div className='pagination__no-icons'>
    <p>No icons found</p>
    <p>Try a different search term or change filters</p>
  </div>
)

interface IPaginationProps {
  filteredIcons: IIcon[]
}

export const Pagination = ({ filteredIcons }: IPaginationProps) => {
  const [paginatedIcons, setPaginatedIcons] = useState<IIcon[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [elementsPerPage, setElementsPerPage] = useState<number>(DEFAULT_ELEMENTS_PER_PAGE)
  const totalPages = Math.ceil(filteredIcons.length / elementsPerPage)

  const handleIconsPerPageChange = (elementsPerPage: number) => {
    if (!elementsPerPage) return
    setElementsPerPage(elementsPerPage)
    setCurrentPage(1)
  }

  const paginateIcons = () => {
    const startIndex = (currentPage - 1) * elementsPerPage
    const endIndex = startIndex + elementsPerPage
    setPaginatedIcons(filteredIcons.slice(startIndex, endIndex))
  }

  useEffect(() => {
    setCurrentPage(1)
    paginateIcons()
  }, [filteredIcons])

  useEffect(() => {
    paginateIcons()
  }, [currentPage, elementsPerPage])

  return (
    <section className='pagination'>
      <div className='pagination__header'>
        <p className='pagination__header__title'>{filteredIcons.length} Icons</p>
        <p className='pagination__header__page-info'>
          Page {currentPage} of {totalPages || 1}
        </p>
      </div>

      {paginatedIcons.length ? <PaginationGrid icons={paginatedIcons} /> : <NoIconsFound />}

      <div className='pagination__footer'>
        <PaginationSelection
          elementsPerPage={elementsPerPage}
          currentPage={currentPage}
          totalElements={filteredIcons.length}
          elementsPerPageOptions={ELEMENTS_PER_PAGE_OPTIONS}
          handlePerPageChange={handleIconsPerPageChange}
          extraClasses='pagination__footer__selection'
        />
        <PaginationButtons currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
      </div>
    </section>
  )
}

export default Pagination
