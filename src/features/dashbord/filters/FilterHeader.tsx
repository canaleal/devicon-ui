interface FilterHeaderProps {
  categoryName: string
  numberOfActiveFilters: number
  totalFilters: number
  resetFilterGroup?: () => void
}

const FilterResetButton = ({
  resetFilterGroup,
  numberOfActiveFilters
}: {
  resetFilterGroup?: () => void
  numberOfActiveFilters: number
}) => {
  if (!resetFilterGroup || !numberOfActiveFilters) return null
  return (
    <button className='ml-auto text-sm font-bold hover:text-frog-600' onClick={resetFilterGroup}>
      <i className='fas fa-undo-alt text-lg' />
    </button>
  )
}

export const FilterHeader: React.FC<FilterHeaderProps> = ({
  categoryName,
  numberOfActiveFilters,
  totalFilters,
  resetFilterGroup
}) => (
  <div className='flex flex-row gap-2 mb-2 pr-4 items-center'>
    <p className='font-bold text-md'>{categoryName}</p>
    <p className='text-sm'>
      ({numberOfActiveFilters} / {totalFilters})
    </p>
    <FilterResetButton resetFilterGroup={resetFilterGroup} numberOfActiveFilters={numberOfActiveFilters} />
  </div>
)

export default FilterHeader
