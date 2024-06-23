import FilterHeader from './FilterHeader'
import { IFilterItem, IFilterGroup } from './types'
import { FilterContainer, FilterItem } from './FilterContainer'

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
    <div className='flex flex-col'>
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
