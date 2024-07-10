import { BUTTON_STYLES } from '../../../components/Elements/Button/ButtonStyles'
import { IFilterItem, IFilterGroup } from './types'

interface FilterHeaderProps {
  categoryName: string
  numberOfActiveFilters: number
  totalFilters: number
  resetFilterGroup?: () => void
}

const FilterHeader = ({ categoryName, numberOfActiveFilters, totalFilters, resetFilterGroup }: FilterHeaderProps) => {
  const shouldShowResetButton = resetFilterGroup && numberOfActiveFilters > 0;

  return (
    <div className='flex flex-row gap-2 pr-4 items-center'>
      <span className='font-bold text-md'>{categoryName}</span>
      <span className='text-sm mr-auto'>
        ({numberOfActiveFilters} / {totalFilters})
      </span>
      {shouldShowResetButton && (
        <button className={BUTTON_STYLES.icon} onClick={resetFilterGroup}>
          <i className='fas fa-undo-alt' />
        </button>
      )}
    </div>
  )
}

interface FilterItemProps {
  filter: IFilterItem
  icon: string
  handleFilter: () => void
}

const FILTER_ITEM_STYLES = {
  base: 'flex px-4 py-2 text-sm cursor-pointer',
  selected: 'bg-frog-700 text-smoke-100',
  unselected: 'hover:bg-gray-200'
}

const FilterItem = ({ filter, icon, handleFilter }: FilterItemProps) => {
  const isSelectedClass = filter.isSelected ? FILTER_ITEM_STYLES.selected : FILTER_ITEM_STYLES.unselected

  return (
    <button className={`${FILTER_ITEM_STYLES.base} ${isSelectedClass}`} onClick={handleFilter}>
      <i className={`${icon} my-auto`} />
      <span className='ml-2 clamped-text'>{filter.filterName}</span>
      <span className='ml-auto'>{filter.numberOfIcons}</span>
    </button>
  )
}

interface FilterListProps {
  filterGroup: IFilterGroup
  iconMap: { [key: string]: string }
  hasMaxHeight: boolean
  handleFilter: (filterGroup: IFilterGroup, filter: IFilterItem) => void
  resetFilterGroup: (filterGroup: IFilterGroup) => void
}

const FilterList = ({ filterGroup, iconMap, hasMaxHeight, handleFilter, resetFilterGroup }: FilterListProps) => {
  const numberOfActiveFilters = filterGroup.filters.reduce(
    (count, filter) => (filter.isSelected ? count + 1 : count),
    0
  )

  return (
    <div className='flex flex-col gap-2'>
      <FilterHeader
        categoryName={filterGroup.filterType}
        numberOfActiveFilters={numberOfActiveFilters}
        totalFilters={filterGroup.filters.length}
        resetFilterGroup={() => resetFilterGroup(filterGroup)}
      />
      <div className={`flex flex-col gap-2 overflow-y-auto ${hasMaxHeight ? 'h-[30rem]' : 'h-fit'} pr-2`}>
        {filterGroup.filters.map((filter, index) => (
          <FilterItem
            key={index}
            filter={filter}
            icon={iconMap[filter.filterName] ?? 'fa-solid fa-square'}
            handleFilter={() => handleFilter(filterGroup, filter)}
          />
        ))}
      </div>
    </div>
  )
}

export default FilterList
