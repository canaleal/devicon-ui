import { useState, useEffect } from 'react'
import { IIcon, IconVersion } from '../../../../types'
import { IFilterGroup } from '../types'
import { filterIcons, populateIconFilters } from '../helpers'

const INIT_FILTER_GROUPS: IFilterGroup[] = [
  {
    categoryName: 'Versions',
    filterType: 'versions',
    filters: []
  },
  {
    categoryName: 'Tags',
    filterType: 'tags',
    filters: []
  }
]

export const useInitializeFilterGroups = (
  icons: IIcon[],
  initialFilterGroups: IFilterGroup[] = INIT_FILTER_GROUPS
) => {
  const [filterGroups, setFilterGroups] = useState<IFilterGroup[]>(initialFilterGroups)
  useEffect(() => {
    setFilterGroups((prevGroups) => prevGroups.map((group) => populateIconFilters(icons, group)))
  }, [icons])
  return { filterGroups, setFilterGroups }
}

export const useApplyFilters = (searchedIcons: IIcon[], filterGroups: IFilterGroup[]) => {
  const [filteredIcons, setFilteredIcons] = useState<IIcon[]>(searchedIcons)
  useEffect(() => {
    let filtered = searchedIcons
    filterGroups.forEach((group) => {
      group.filters.forEach((filter) => {
        if (filter.isSelected) {
          filtered = filterIcons(filtered, group.filterType, filter.filterName as IconVersion)
        }
      })
    })
    setFilteredIcons(filtered)
  }, [searchedIcons, filterGroups])
  return filteredIcons
}

export const useFilterBySearchTerm = (allIcons: IIcon[], searchTerm: string) => {
  const [filteredIcons, setFilteredIcons] = useState<IIcon[]>(allIcons)
  useEffect(() => {
    const filtered = searchTerm ? filterIcons(allIcons, 'name', searchTerm) : allIcons
    setFilteredIcons(filtered)
  }, [allIcons, searchTerm])

  return filteredIcons
}
