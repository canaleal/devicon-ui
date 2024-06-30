import { BUTTON_STYLES } from '../../../components/Elements/Button/ButtonStyles'

interface FilterHeaderProps {
  categoryName: string
  numberOfActiveFilters: number
  totalFilters: number
  resetFilterGroup?: () => void
}

interface FilterResetButtonProps {
  resetFilterGroup?: () => void
  numberOfActiveFilters: number
}

const FilterResetButton = ({ resetFilterGroup, numberOfActiveFilters }: FilterResetButtonProps) => {
  if (!resetFilterGroup || !numberOfActiveFilters) return null
  return (
    <button className={BUTTON_STYLES.iconButton} onClick={resetFilterGroup}>
      <i className='fas fa-undo-alt' />
    </button>
  )
}

export const FilterHeader = ({
  categoryName,
  numberOfActiveFilters,
  totalFilters,
  resetFilterGroup
}: FilterHeaderProps) => (
  <div className='flex flex-row gap-2 pr-4 items-center'>
    <p className='font-bold text-md'>{categoryName}</p>
    <p className='text-sm mr-auto'>
      ({numberOfActiveFilters} / {totalFilters})
    </p>
    <FilterResetButton resetFilterGroup={resetFilterGroup} numberOfActiveFilters={numberOfActiveFilters} />
  </div>
)

export default FilterHeader
