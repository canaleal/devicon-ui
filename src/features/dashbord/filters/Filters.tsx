import { useEffect, useRef, useState } from 'react'
import FilterList from './FilterList'
import { ICON_VERSION_FA_MAP } from '../../../config'
import { IFilterGroup, IFilterItem } from './types'
import {
  DROPDOWN_POPUP_STYLE,
  DROPDOWN_SIZES,
  DROPDOWN_STYLE
} from '../../../components/Elements/Dropdown/dropdownStyles'

interface FiltersProps {
  filterGroups: IFilterGroup[]
  handleFilterClick: (filterGroup: IFilterGroup, filter: IFilterItem) => void
  handleResetFilterGroup: (filterType: IFilterGroup) => void
}

const Filters = ({ filterGroups, handleFilterClick, handleResetFilterGroup }: FiltersProps) => {
  return (
    <div className={`${DROPDOWN_POPUP_STYLE.base} ${DROPDOWN_POPUP_STYLE.customItem}`}>
      {filterGroups.map((group) => (
        <FilterList
          key={group.filterType}
          filterGroup={group}
          handleFilter={handleFilterClick}
          iconMap={ICON_VERSION_FA_MAP}
          hasMaxHeight={group.filters.length > 10}
          resetFilterGroup={handleResetFilterGroup}
        />
      ))}
    </div>
  )
}

interface FilterDropdownProps extends FiltersProps {
  size: keyof typeof DROPDOWN_SIZES
  extraClasses?: string
}

const FilterDropdown = ({
  filterGroups,
  handleFilterClick,
  handleResetFilterGroup,
  size,
  extraClasses = ''
}: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className={`relative ${DROPDOWN_SIZES[size]} ${extraClasses}`} ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`${DROPDOWN_STYLE.base} ${DROPDOWN_STYLE.light} ${DROPDOWN_STYLE.dark}`}
      >
        <span>Filters</span>
        <i className={`fas ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`} />
      </button>
      {isOpen && (
        <Filters
          filterGroups={filterGroups}
          handleFilterClick={handleFilterClick}
          handleResetFilterGroup={handleResetFilterGroup}
        />
      )}
    </div>
  )
}

export default FilterDropdown
