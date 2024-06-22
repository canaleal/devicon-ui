import { IIconFilterOption } from "./types"

interface FilterItemProps {
    filter: IIconFilterOption
    icon: string
    handleFilter: () => void
}

export const FilterItem: React.FC<FilterItemProps> = ({ filter, icon, handleFilter }) => {
    const isSelectedClass = filter.isSelected
        ? 'bg-primary-600 hover:bg-primary-800 text-white shadow-sm'
        : 'hover:bg-dark-100 dark:hover:bg-dark-900 hover:shadow-md'

    return (
        <button className={`${isSelectedClass} rounded-md  flex px-4 py-2 text-sm`} onClick={handleFilter}>
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
    <div className={`flex flex-col gap-2 overflow-y-auto ${hasMaxHeight ? 'h-[30rem]' : 'h-fit'} pr-2`}>
        {children}
    </div>
)