import { useState, useEffect } from 'react'

import SearchBar from '../../../components/Molecules/SearchBar/SearchBar'
import useIconStore from '../../../store/iconStore'

import { filterIcons, updateFilterGroups, resetFilterGroup, populateIconFilters } from './helpers'

import { DeviconBranch } from '../../../types'
import { fetchIcons } from '../../../service/iconService'
import './styles/filters.css'
import { MultiSelectDropdown } from '../../../components/Atoms/Dropdown/MultiSelectDropdown'
import { Dropdown } from '../../../components/Atoms/Dropdown/Dropdown'

const FilterSection = () => {
  const { icons, deviconBranch, setFilteredIcons, setDeviconBranch, filterGroups, setFilterGroups, setIcons } =
    useIconStore()
  const [searchQuery, setSearchQuery] = useState<string>('')

  const handleIconsUpdate = (tempIcons: typeof icons, search: string, tempFilterGroups: typeof filterGroups) => {
    let tempFilteredIcons: typeof icons = search ? filterIcons(tempIcons, 'name', search) : tempIcons
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

  return (
    <>
      <section className='filters'>
        <div className='base-container filters__container'>
          <Dropdown
            extraClasses='w-full'
            isDisabled={false}
            selectedOption={deviconBranch}
            options={['master', 'develop']}
            onChange={(value: string) => handleDeviconBranchChange(value as DeviconBranch)}
          />
          <SearchBar
            placeholder='Search Icons'
            extraClasses='w-full'
            onSearch={handleSearch}
            autoCompleteOptions={icons.map((icon) => [icon.name, ...icon.altnames]).flat()}
          />

          {filterGroups.map((filterGroup) => (
            <MultiSelectDropdown
              key={filterGroup.categoryName}
              title={filterGroup.categoryName}
              options={filterGroup.filters.map((f) => ({
                label: f.filterName,
                value: f.filterName,
                count: f.numberOfIcons
              }))}
              selected={filterGroup.filters.filter((f) => f.isSelected).map((f) => f.filterName)}
              onChange={(selectedNames) => {
                const updatedGroup = {
                  ...filterGroup,
                  filters: filterGroup.filters.map((f) => ({
                    ...f,
                    isSelected: selectedNames.includes(f.filterName)
                  }))
                }

                setFilterGroups(updateFilterGroups(filterGroups, updatedGroup))
              }}
              onReset={() => {
                const updatedGroup = resetFilterGroup(filterGroup)
                setFilterGroups(updateFilterGroups(filterGroups, updatedGroup))
              }}
              extraClasses='w-full'
            />
          ))}
        </div>
      </section>
      <div className='filters__placeholder' />
    </>
  )
}

export default FilterSection