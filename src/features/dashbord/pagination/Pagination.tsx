import { useEffect, useState } from 'react'
import { IIcon } from '../../../types'
import PaginationButtons from './PaginationButtons'
import PaginationCard from './paginationCard/PaginationCard'
import PaginationSelection from './PaginationSelection'
import { DEFAULT_ELEMENTS_PER_PAGE, ELEMENTS_PER_PAGE_OPTIONS } from './types'
import useIconStore from '../../../store/iconStore'

interface IPaginationGridProps {
  icons: IIcon[]
}
export const PaginationGrid = ({ icons }: IPaginationGridProps) => {
  return (
    <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4'>
      {icons.map((icon) => (
        <PaginationCard key={icon.name} icon={icon} />
      ))}
    </div>
  )
}

export const NoIconsFound = () => (
  <div className='flex flex-col items-center justify-center min-h-screen'>
    <p className='text-xl'>No icons found</p>
    <p>Try a different search term or change filters</p>
  </div>
)

export const Pagination = () => {
  const { filteredIcons } = useIconStore()

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
    <section className='flex flex-col gap-6 w-full'>
      <div className='flex w-full gap-4 items-center'>
        <p className='font-semibold text-xl'>{filteredIcons.length} Icons</p>
        <p className='ml-auto hidden md:inline-block text-xs'>
          Page {currentPage} of {totalPages || 1}
        </p>
      </div>

      {paginatedIcons.length ? <PaginationGrid icons={paginatedIcons} /> : <NoIconsFound />}

      <div className='flex flex-row justify-center lg:justify-between'>
        <PaginationSelection
          elementsPerPage={elementsPerPage}
          currentPage={currentPage}
          totalElements={filteredIcons.length}
          elementsPerPageOptions={ELEMENTS_PER_PAGE_OPTIONS}
          handlePerPageChange={handleIconsPerPageChange}
          extraClasses='hidden lg:flex'
        />
        <PaginationButtons currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
      </div>
    </section>
  )
}

export default Pagination
