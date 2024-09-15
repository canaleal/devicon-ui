import { useState, useEffect } from "react"
import { Dropdown } from "../../../components/Elements/Form/Dropdown"
import SearchBar from "../../../components/Elements/Form/SearchBar/SearchBar"
import useIconStore from "../../../store/iconStore"
import FilterDropdown from "./FilterDropdown"
import { filterIcons, updateFilterGroups, updateFilter, resetFilterGroup, populateIconFilters } from "./helpers"
import { IFilterGroup, IFilterItem } from "./types"
import { DeviconBranch } from "../../../types"
import { fetchIcons } from "../../../service/iconService"

const FilterSection = () => {
    const { icons, deviconBranch, setFilteredIcons, setDeviconBranch, filterGroups, setFilterGroups, setIcons} = useIconStore()
    const [searchQuery, setSearchQuery] = useState<string>('')

    const handleIconsUpdate = (tempIcons: typeof icons, search: string, tempFilterGroups: typeof filterGroups) => {
      const searchedIconsTemp = search ? filterIcons(tempIcons, 'name', search) : tempIcons
      let tempFilteredIcons: typeof icons = searchedIconsTemp
      tempFilterGroups.forEach((group) => {
        group.filters.forEach((filter) => {
          if (filter.isSelected) {
            tempFilteredIcons = filterIcons(tempFilteredIcons, group.filterType, filter.filterName as string)
          }
        })
      })
      setFilteredIcons(tempFilteredIcons)
    }
  
    useEffect(() => {
      handleIconsUpdate(icons, searchQuery, filterGroups)
    }, [icons, searchQuery, filterGroups])
  
    const handleSearch = (query: string) => {
      setSearchQuery(query)
    }
  
    const handleDeviconBranchChange = async (branch: DeviconBranch) => {
      setDeviconBranch(branch)
      const tempIcons = await fetchIcons(branch)
      const initFilterGroups = filterGroups.map((group) => populateIconFilters(tempIcons, group))
      setIcons(tempIcons)
      setDeviconBranch(branch)
      setFilterGroups(initFilterGroups)

    }
  
    const handleFilterClick = (filterGroup: IFilterGroup, filter: IFilterItem) => {
      const updatedFilterGroups = updateFilterGroups(filterGroups, updateFilter(filterGroup, filter))
      setFilterGroups(updatedFilterGroups)
    }
  
    const handleResetFilterGroup = (filterGroup: IFilterGroup) => {
      const updatedFilterGroups = updateFilterGroups(filterGroups, resetFilterGroup(filterGroup))
      setFilterGroups(updatedFilterGroups)
    }
  
    return (
      <section className='bg-white dark:bg-dark-900 border-b border-gray-600/20'>
        <div className='base-container flex-col xl:flex-row justify-between'>
          <div className='flex flex-col lg:flex-row gap-4'>
            <Dropdown
              extraClasses='w-full xl:w-32'
              isDisabled={false}
              selectedOption={deviconBranch}
              options={['master', 'develop']}
              onChange={(value) => handleDeviconBranchChange(value as DeviconBranch)}
            />
            <SearchBar
              placeholder='Search Icons'
              extraClasses='w-full xl:w-96'
              onSearch={handleSearch}
              autoCompleteOptions={icons.map((icon) => [icon.name, ...icon.altnames]).flat()}
            />
          </div>
  
          <div className='flex flex-col lg:flex-row gap-4'>
            {filterGroups.map((filterGroup) => (
              <FilterDropdown
                key={filterGroup.categoryName}
                filterGroup={filterGroup}
                handleFilterClick={handleFilterClick}
                handleResetFilterGroup={handleResetFilterGroup}
                extraClasses='w-full xl:w-64'
              />
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  export default FilterSection