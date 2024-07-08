import { useEffect, useState } from 'react'
import { DeviconBranch, IIcon } from '../../../types'

import { Table } from '../../../components/Elements/Table'
import { createDeviconIconUrl } from '../../../helpers/iconUrl'
import { Dropdown } from '../../../components/Elements/Dropdown/Dropdown'
import PaginationButtons from './PaginationButtons'
import PaginationCard from './PaginationCard'
import PaginationSelection from './PaginationSelection'

type PaginationStyle = 'card' | 'table'

interface PaginationProps {
  icons: IIcon[]
  deviconBranch: DeviconBranch
  onSelect: (icon: IIcon) => void
}

export const NoIconsFound = () => (
  <div className='flex flex-col items-center justify-center min-h-screen'>
    <p className='text-xl'>No icons found</p>
    <p>Try a different search term or change filters</p>
  </div>
)

export const PaginationGrid = ({ icons, onSelect, deviconBranch }: PaginationProps) => {
  return (
    <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 3xl:grid-cols-9 gap-4'>
      {icons.map((icon) => (
        <PaginationCard key={icon.name} icon={icon} onSelect={onSelect} deviconBranch={deviconBranch} />
      ))}
    </div>
  )
}

export const Pagination = ({ icons, onSelect, deviconBranch }: PaginationProps) => {
  const [paginationStyle, setPaginationStyle] = useState<PaginationStyle>('card')

  const [paginatedIcons, setPaginatedIcons] = useState<IIcon[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const elementsPerPageOptions = [54, 72, 81]
  const [elementsPerPage, setElementsPerPage] = useState<number>(elementsPerPageOptions[0])
  const totalPages = Math.ceil(icons.length / elementsPerPage)

  const handleIconsPerPageChange = (elementsPerPage: number) => {
    if (!elementsPerPage) return
    setElementsPerPage(elementsPerPage)
    setCurrentPage(1)
  }

  const paginateIcons = () => {
    const startIndex = (currentPage - 1) * elementsPerPage
    const endIndex = startIndex + elementsPerPage
    setPaginatedIcons(icons.slice(startIndex, endIndex))
  }

  useEffect(() => {
    setCurrentPage(1)
    paginateIcons()
  }, [icons])

  useEffect(() => {
    paginateIcons()
  }, [currentPage, elementsPerPage])

  return (
    <section className='flex flex-col gap-4'>
      <div className='flex w-full gap-4 items-center'>
        <p className='font-bold text-xl'>{icons.length} Icons</p>
        <p className='ml-auto hidden md:inline-block text-sm'>
          Page {currentPage} of {totalPages || 1}
        </p>
        <Dropdown
          extraClasses='hidden md:inline-block'
          size={'lg'}
          selectedOption={paginationStyle}
          options={['card', 'table']}
          onChange={(value) => {
            setPaginationStyle(value as PaginationStyle)
          }}
        />
      </div>

      {paginatedIcons.length ? (
        <>
          {paginationStyle === 'card' ? (
            <PaginationGrid icons={paginatedIcons} onSelect={onSelect} deviconBranch={deviconBranch} />
          ) : (
            <Table
              data={paginatedIcons}
              headers={['Icon', 'Name', 'Tags', 'Styles']}
              keyExtractor={(item) => item.name}
              rowRenderer={(item) => [
                <img
                  className='my-2'
                  width={30}
                  height={'auto'}
                  src={createDeviconIconUrl(item.name, item.versions.svg[0], deviconBranch)}
                  alt={item.name}
                />,
                item.name,
                item.tags?.join(', ') ?? '',
                item.versions.svg.join(', ')
              ]}
              onRowClick={onSelect}
            />
          )}
        </>
      ) : (
        <NoIconsFound />
      )}

      <div className='flex flex-row justify-center lg:justify-between'>
        <PaginationSelection
          elementsPerPage={elementsPerPage}
          currentPage={currentPage}
          totalElements={icons.length}
          elementsPerPageOptions={elementsPerPageOptions}
          handlePerPageChange={handleIconsPerPageChange}
          extraClasses='hidden lg:flex'
        />
        <PaginationButtons currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
      </div>
    </section>
  )
}

export default Pagination
