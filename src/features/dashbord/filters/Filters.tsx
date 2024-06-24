import { useEffect, useRef, useState } from 'react'
import FilterList from './FilterList'
import { ICON_VERSION_FA_MAP } from '../../../config'
import { IFilterGroup, IFilterItem } from './types'
import { DROPDOWN_POPUP_STYLE, DROPDOWN_STYLE } from '../../../components/Elements/Dropdown/dropdownStyle'

const sizes = {
  sm: 'w-16',
  md: 'w-32',
  lg: 'w-48',
  xl: 'w-96',
  full: 'w-full'
}

interface FiltersProps {
  filterGroups: IFilterGroup[]
  handleFilterClick: (filterGroup: IFilterGroup, filter: IFilterItem) => void
  handleResetFilterGroup: (filterType: IFilterGroup) => void
}

const Filters = ({ filterGroups, handleFilterClick, handleResetFilterGroup }: FiltersProps) => {
  return (
    <div className='flex flex-col gap-4 w-full'>
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
  size: keyof typeof sizes
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
    <div className={`relative ${sizes[size]} ${extraClasses} gap-2  text-sm'`} ref={dropdownRef}>
      <button onClick={toggleDropdown} className={`${DROPDOWN_STYLE.base}`}>
        <span>Filters</span>
        <i className={`fas ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'} ml-auto my-auto`} />
      </button>
      {isOpen && (
        <div className={`${DROPDOWN_POPUP_STYLE.base} ${DROPDOWN_POPUP_STYLE.customItem}`}>
          <Filters
            filterGroups={filterGroups}
            handleFilterClick={handleFilterClick}
            handleResetFilterGroup={handleResetFilterGroup}
          />
        </div>
      )}
    </div>
  )
}

export default FilterDropdown
