import FilterHeader from './FilterHeader'
import { IIconFilterOption, IIconFilterCategory } from './types'
import { FilterContainer, FilterItem } from './FilterContainer'

interface FilterListProps {
  filterGroup: IIconFilterCategory
  iconMap: { [key: string]: string }
  hasMaxHeight: boolean
  handleFilter: (filterGroup: IIconFilterCategory, filter: IIconFilterOption) => void
  resetFilterGroup: (filterGroup: IIconFilterCategory) => void
}

export const FilterList = ({ filterGroup, iconMap, hasMaxHeight, handleFilter, resetFilterGroup }: FilterListProps) => {
  const numberOfActiveFilters = filterGroup.filters.reduce(
    (count, filter) => (filter.isSelected ? count + 1 : count),
    0
  )

  return (
    <div className='flex flex-col text-gray-800 dark:text-gray-200'>
      <FilterHeader
        categoryName={filterGroup.filterType}
        numberOfActiveFilters={numberOfActiveFilters}
        totalFilters={filterGroup.filters.length}
        resetFilterGroup={() => resetFilterGroup(filterGroup)}
      />
      <FilterContainer hasMaxHeight={hasMaxHeight} >
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
