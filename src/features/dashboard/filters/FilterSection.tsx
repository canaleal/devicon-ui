import { useState, useEffect } from 'react'

import SearchBar from '../../../components/Molecules/SearchBar/SearchBar'
import { filterIcons, updateFilterGroups, resetFilterGroup, populateIconFilters } from './helpers'
import { DEVELOP, DeviconBranch, IIcon, MASTER } from '../../../types'
import { fetchIcons } from '../../../service/iconService'

import './styles/filters.css'
import { MultiSelectDropdown } from '../../../components/Atoms/Dropdown/MultiSelectDropdown'
import { Dropdown } from '../../../components/Atoms/Dropdown/Dropdown'
import { IFilterGroup } from './types'

interface IFilterSectionProps {
  icons: IIcon[]
  filterGroups: IFilterGroup[]
  deviconBranch: DeviconBranch
  setIcons: (icons: IIcon[]) => void
  setFilteredIcons: (icons: IIcon[]) => void
  setFilterGroups: (groups: IFilterGroup[]) => void
  setDeviconBranch: (branch: DeviconBranch) => void
}

const FilterSection = ({
  icons,
  filterGroups,
  deviconBranch,
  setIcons,
  setFilteredIcons,
  setFilterGroups,
  setDeviconBranch
}: IFilterSectionProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('')

  const handleIconsUpdate = (tempIcons: IIcon[], search: string, tempFilterGroups: IFilterGroup[]) => {
    let tempFilteredIcons = search ? filterIcons(tempIcons, 'name', search) : tempIcons

    tempFilterGroups.forEach((group) => {
      group.filters.forEach((filter: { isSelected: boolean; filterName: string }) => {
        if (filter.isSelected) {
          tempFilteredIcons = filterIcons(tempFilteredIcons, group.filterType, filter.filterName as string)
        }
      })
    })

    setFilteredIcons(tempFilteredIcons)
  }

  const handleSearch = (query: string) => setSearchQuery(query)

  const handleDeviconBranchChange = async (branch: DeviconBranch) => {
    setDeviconBranch(branch)
    const tempIcons = await fetchIcons(branch)
    const initFilterGroups = filterGroups.map((group) => populateIconFilters(tempIcons, group))
    setIcons(tempIcons)
    setFilterGroups(initFilterGroups)
  }

  const handleFilterChange = (groupName: string, selectedNames: string[]) => {
    const group = filterGroups.find((g) => g.categoryName === groupName)
    if (!group) return

    const updatedGroup: IFilterGroup = {
      ...group,
      filters: group.filters.map((f) => ({
        ...f,
        isSelected: selectedNames.includes(f.filterName)
      }))
    }

    setFilterGroups(updateFilterGroups(filterGroups, updatedGroup))
  }

  const handleFilterReset = (groupName: string) => {
    const group = filterGroups.find((g) => g.categoryName === groupName)
    if (!group) return

    const updatedGroup = resetFilterGroup(group)
    setFilterGroups(updateFilterGroups(filterGroups, updatedGroup))
  }

  useEffect(() => {
    handleIconsUpdate(icons, searchQuery, filterGroups)
  }, [icons, searchQuery, filterGroups])

  return (
    <>
      <section className='filters'>
        <div className='base-container filters__container'>
          <Dropdown
            extraClasses='w-full'
            isDisabled={false}
            selectedOption={deviconBranch}
            options={[MASTER, DEVELOP]}
            onChange={(value: string) => handleDeviconBranchChange(value as DeviconBranch)}
          />
          <SearchBar
            placeholder='Search Icons'
            extraClasses='w-full'
            onSearch={handleSearch}
          />

          {filterGroups.map((filterGroup) => (
            <MultiSelectDropdown
              key={filterGroup.categoryName}
              title={filterGroup.categoryName}
              options={filterGroup.filters.map((f: { filterName: string; numberOfIcons: number }) => ({
                label: f.filterName,
                value: f.filterName,
                count: f.numberOfIcons
              }))}
              selected={filterGroup.filters
                .filter((f: { isSelected: boolean }) => f.isSelected)
                .map((f: { filterName: string }) => f.filterName)}
              onChange={(selected) => handleFilterChange(filterGroup.categoryName, selected)}
              onReset={() => handleFilterReset(filterGroup.categoryName)}
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
