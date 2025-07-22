import React, { useState, useEffect } from 'react'

import SearchBar from '../../../components/Molecules/SearchBar/SearchBar'
import { filterIcons, updateFilterGroups, resetFilterGroup } from './helpers'
import { DEVICON_BRANCH, DeviconBranch, IIcon } from '../../../types'

import './styles/filters.css'
import { MultiSelectDropdown } from '../../../components/Atoms/Dropdown/MultiSelectDropdown'
import { Dropdown } from '../../../components/Atoms/Dropdown/Dropdown'
import { IFilterGroup } from './types'

interface IFilterSectionProps {
  icons: IIcon[]
  filterGroups: IFilterGroup[]
  deviconBranch: DeviconBranch
  setFilteredIcons: (icons: IIcon[]) => void
  setFilterGroups: (groups: IFilterGroup[]) => void
  setDeviconBranch: (branch: DeviconBranch) => void
}

export const FilterSection = React.memo(
  ({
    icons,
    filterGroups,
    deviconBranch,
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
            tempFilteredIcons = filterIcons(tempFilteredIcons, group.filterType, filter.filterName)
          }
        })
      })

      setFilteredIcons(tempFilteredIcons)
    }

    const handleSearch = (query: string) => setSearchQuery(query)

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
              options={[DEVICON_BRANCH.MASTER, DEVICON_BRANCH.DEVELOP]}
              onChange={(value: string) => setDeviconBranch(value as DeviconBranch)}
            />

            <SearchBar
              placeholder='Search Icons'
              extraClasses='w-full'
              onSearch={handleSearch}
              autoCompleteOptions={icons.map((icon) => icon.name)}
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
                onChange={(selected) => handleFilterChange(filterGroup.categoryName, selected)}
                onReset={() => handleFilterReset(filterGroup.categoryName)}
                extraClasses='w-full'
              />
            ))}
          </div>
        </section>
      </>
    )
  }
)
