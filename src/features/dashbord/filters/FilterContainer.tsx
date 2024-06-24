import { IFilterItem } from './types'

interface FilterItemProps {
  filter: IFilterItem
  icon: string
  handleFilter: () => void
}

const BUTTON_STYLE = {
  base: 'rounded-md flex px-4 py-2 text-sm px-4 py-2  cursor-pointer',
  selected: 'bg-frog-700 text-smoke-100',
  unselected: 'hover:bg-gray-200'
}

export const FilterItem: React.FC<FilterItemProps> = ({ filter, icon, handleFilter }) => {
  const isSelectedClass = filter.isSelected ? BUTTON_STYLE.selected : BUTTON_STYLE.unselected

  return (
    <button className={`${BUTTON_STYLE.base} ${isSelectedClass}`} onClick={handleFilter}>
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

export const FilterContainer: React.FC<FilterContainerProps> = ({ children, hasMaxHeight }) => (
  <div className={`flex flex-col gap-2 overflow-y-auto ${hasMaxHeight ? 'h-[30rem]' : 'h-fit'} pr-2`}>{children}</div>
)
