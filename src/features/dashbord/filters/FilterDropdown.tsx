import { useEffect, useRef, useState } from 'react'
import { ICON_VERSION_FA_MAP } from '../../../config'
import { IFilterGroup, IFilterItem } from './types'
import { DROPDOWN_SIZES } from '../../../components/Elements/Dropdown'
import { IconVersion } from '../../../types'

interface FilterItemProps {
  filter: IFilterItem
  icon: string
  handleFilter: () => void
}

const FilterItem = ({ filter, icon, handleFilter }: FilterItemProps) => {
  return (
    <button className={`dropdown__item ${filter.isSelected ? 'dropdown__item--selected' : ''}`} onClick={handleFilter}>
      <i className={`${icon} my-auto`} />
      <span className='clamped-text'>{filter.filterName}</span>
      <span className='ml-auto'>{filter.numberOfIcons}</span>
    </button>
  )
}

interface FiltersPopupProps {
  filterGroup: IFilterGroup
  handleFilterClick: (filterGroup: IFilterGroup, filter: IFilterItem) => void
  handleResetFilterGroup: (filterGroup: IFilterGroup) => void
  size: keyof typeof DROPDOWN_SIZES
  extraClasses?: string
}

const FilterDropdown = ({
  filterGroup,
  handleFilterClick,
  handleResetFilterGroup,
  size,
  extraClasses = ''
}: FiltersPopupProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const totalFilters = filterGroup.filters.length
  const totalActiveFilters = filterGroup.filters.reduce((count, filter) => (filter.isSelected ? count + 1 : count), 0)
  const hasMaxHeight = filterGroup.filters.length > 10

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleDropdown = () => setIsOpen(!isOpen)

  return (
    <div className={`relative ${DROPDOWN_SIZES[size]} ${extraClasses}`} ref={dropdownRef}>
      <DropdownButton
        categoryName={filterGroup.categoryName}
        totalActiveFilters={totalActiveFilters}
        totalFilters={totalFilters}
        isOpen={isOpen}
        toggleDropdown={toggleDropdown}
      />
      {isOpen && (
        <DropdownMenu
          filterGroup={filterGroup}
          hasMaxHeight={hasMaxHeight}
          handleFilterClick={handleFilterClick}
          handleResetFilterGroup={handleResetFilterGroup}
        />
      )}
    </div>
  )
}

const DropdownButton = ({
  categoryName,
  totalActiveFilters,
  totalFilters,
  isOpen,
  toggleDropdown
}: {
  categoryName: string
  totalActiveFilters: number
  totalFilters: number
  isOpen: boolean
  toggleDropdown: () => void
}) => (
  <button onClick={toggleDropdown} className='dropdown'>
    <span className='dropdown__placeholder'>
      <span>{categoryName}</span>
      {totalActiveFilters > 0 && (
        <span className='text-sm'>
          ({totalActiveFilters}/{totalFilters})
        </span>
      )}
    </span>
    <i className={`fas ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`} />
  </button>
)

const DropdownMenu = ({
  filterGroup,
  hasMaxHeight,
  handleFilterClick,
  handleResetFilterGroup
}: {
  filterGroup: IFilterGroup
  hasMaxHeight: boolean
  handleFilterClick: (filterGroup: IFilterGroup, filter: IFilterItem) => void
  handleResetFilterGroup: (filterGroup: IFilterGroup) => void
}) => {

  const isResetButtonDisabled = filterGroup.filters.every((filter) => !filter.isSelected);

  return (
  <div className='dropdown__popup'>
    <div className={`flex flex-col mb-4 overflow-y-auto ${hasMaxHeight ? 'h-[30rem]' : 'h-fit'}`}>
      {filterGroup.filters.map((filter, index) => (
        <FilterItem
          key={index}
          filter={filter}
          icon={ICON_VERSION_FA_MAP[filter.filterName as IconVersion] ?? 'fa-solid fa-square'}
          handleFilter={() => handleFilterClick(filterGroup, filter)}
        />
      ))}
    </div>
    <button
      disabled={isResetButtonDisabled}
      className={`dropdown__item dropdown__item--reset ${isResetButtonDisabled ? 'dropdown__item--disabled' : ''}`}
      onClick={() => handleResetFilterGroup(filterGroup)}
    >
      <i className='fas fa-undo-alt' />
      Reset Filters
    </button>
  </div>
)}

export default FilterDropdown
