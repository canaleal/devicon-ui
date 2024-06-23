import FilterList from './FilterList'
import { ICON_VERSION_FA_MAP } from '../../../config'
import { IFilterGroup, IFilterItem } from './types'

interface FiltersProps {
    filterGroups: IFilterGroup[]
    handleFilterClick: (filterGroup: IFilterGroup, filter: IFilterItem) => void
    handleResetFilterGroup: (filterType: IFilterGroup) => void
}

const Filters = ({ filterGroups, handleFilterClick, handleResetFilterGroup }: FiltersProps) => {
    return (
        <div className='flex flex-col gap-4'>
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

export default Filters