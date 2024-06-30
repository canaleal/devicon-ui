import FilterHeader from './FilterHeader'
import { IFilterItem, IFilterGroup } from './types'

interface FilterItemProps {
  filter: IFilterItem
  icon: string
  handleFilter: () => void
}

const FILTER_ITEM_STYLES = {
  base: ' flex px-4 py-2 text-sm cursor-pointer',
  selected: 'bg-frog-700 text-smoke-100',
  unselected: 'hover:bg-gray-200'
}

export const FilterItem = ({ filter, icon, handleFilter }: FilterItemProps) => {
  const isSelectedClass = filter.isSelected ? FILTER_ITEM_STYLES.selected : FILTER_ITEM_STYLES.unselected

  return (
    <button className={`${FILTER_ITEM_STYLES.base} ${isSelectedClass}`} onClick={handleFilter}>
      <i className={`${icon} my-auto`} />
      <p className='ml-2 clamped-text'>{filter.filterName}</p>
      <p className='ml-auto'>{filter.numberOfIcons}</p>
    </button>
  )
}

interface FilterContainerProps {
  children: React.ReactNode
  hasMaxHeight: boolean
}

export const FilterContainer = ({ children, hasMaxHeight }: FilterContainerProps) => (
  <div className={`flex flex-col gap-2 overflow-y-auto ${hasMaxHeight ? 'h-[30rem]' : 'h-fit'} pr-2`}>{children}</div>
)

interface FilterListProps {
  filterGroup: IFilterGroup
  iconMap: { [key: string]: string }
  hasMaxHeight: boolean
  handleFilter: (filterGroup: IFilterGroup, filter: IFilterItem) => void
  resetFilterGroup: (filterGroup: IFilterGroup) => void
}

export const FilterList = ({ filterGroup, iconMap, hasMaxHeight, handleFilter, resetFilterGroup }: FilterListProps) => {
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
      <FilterContainer hasMaxHeight={hasMaxHeight}>
        {filterGroup.filters.map((filter, index) => (
          <FilterItem
            key={index}
            filter={filter}
            icon={iconMap[filter.filterName] ?? 'fa-solid fa-square'}
            handleFilter={() => handleFilter(filterGroup, filter)}
          />
        ))}
      </FilterContainer>
    </div>
  )
}

export default FilterList
