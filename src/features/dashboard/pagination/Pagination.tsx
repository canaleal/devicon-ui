import { useState } from 'react'
import { IIcon } from '../../../types'
import PaginationButtons from './widgets/paginationButtons/PaginationButtons'
import PaginationCard from './widgets/paginationCard/PaginationCard'
import PaginationSelection from './widgets/paginationSelection/PaginationSelection'
import { DEFAULT_ELEMENTS_PER_PAGE, ELEMENTS_PER_PAGE_OPTIONS } from './types'
import './styles/pagination.css'
import useIconStore from '../../../store/iconStore.ts'
import usePagination from './hooks/usePagination.tsx'

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
    <p>No icons found</p>
    <p>Try a different search term or change filters</p>
  </div>
)

export const Pagination = () => {
  const { filteredIcons } = useIconStore()
  const [elementsPerPage, setElementsPerPage] = useState(DEFAULT_ELEMENTS_PER_PAGE)

  const { paginatedIcons, currentPage, totalPages, setCurrentPage } = usePagination(filteredIcons, elementsPerPage)

  const handleIconsPerPageChange = (count: number) => {
    setElementsPerPage(count)
    setCurrentPage(1)
  }

  return (
    <section className='pagination'>
      <div className='base-container pagination__container'>
        <div className='pagination__header'>
          <p className='pagination__header-title'>{filteredIcons.length} Icons</p>
          <p className='pagination__header-info'>
            Page {currentPage} of {totalPages}
          </p>
        </div>

        {paginatedIcons.length > 0 ? <PaginationGrid icons={paginatedIcons} /> : <NoIconsFound />}

        <div className='pagination__footer'>
          <PaginationSelection
            elementsPerPage={elementsPerPage}
            currentPage={currentPage}
            totalElements={filteredIcons.length}
            elementsPerPageOptions={ELEMENTS_PER_PAGE_OPTIONS}
            handlePerPageChange={handleIconsPerPageChange}
          />
          <PaginationButtons currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
        </div>
      </div>
    </section>
  )
}

export default Pagination
