import { IconVersion, IIcon } from '../../../../types'
import { FilterType, IFilterGroup, IFilterItem } from '../types'

const FilterMapRecord: Record<FilterType, string> = {
  versions: 'versions.svg',
  color: 'color',
  tags: 'tags',
  alias: 'alias',
  name: 'name'
}

const getItemsFromPath = (icon: IIcon, path: string): string[] => {
  const result = path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in acc) {
      return (acc as Record<string, unknown>)[key]
    }
    return undefined
  }, icon)

  return Array.isArray(result) ? (result as string[]) : []
}

export const populateIconFilters = (icons: IIcon[], filterGroup: IFilterGroup): IFilterGroup => {
  const itemsPath = FilterMapRecord[filterGroup.filterType]

  filterGroup.filters.forEach((filter) => {
    filter.numberOfIcons = 0
  })

  icons.forEach((icon) => {
    const items = getItemsFromPath(icon, itemsPath)

    items.forEach((item) => {
      const existing = filterGroup.filters.find((f) => f.filterName === item)
      if (existing) {
        existing.numberOfIcons++
      } else {
        filterGroup.filters.push({
          filterName: item as IconVersion,
          numberOfIcons: 1,
          isSelected: false
        })
      }
    })
  })

  filterGroup.filters.sort((a, b) => b.numberOfIcons - a.numberOfIcons)
  return filterGroup
}

export const FilterFunctions: Record<FilterType, (icon: IIcon, criterion: string | IconVersion) => boolean> = {
  name: (icon, name) => [icon.name, ...(icon.altnames ?? [])].some((n) => n.toLowerCase().includes(name as string)),
  versions: (icon, version) => icon.versions.svg.includes(version as IconVersion),
  tags: (icon, tag) => icon.tags.includes(tag as string),
  color: () => true, // Placeholder function, update as required
  alias: () => true // Placeholder function, update as required
}

export const filterIcons = (icons: IIcon[], filterType: FilterType, criterion: string | IconVersion): IIcon[] => {
  return icons.filter((icon) => FilterFunctions[filterType](icon, criterion))
}

export const updateFilterGroups = (filterGroups: IFilterGroup[], filterGroup: IFilterGroup) => {
  return filterGroups.map((group) => (group.filterType === filterGroup.filterType ? filterGroup : group))
}

export const updateFilter = (filterGroup: IFilterGroup, filter: IFilterItem) => {
  const tempFilterGroup = { ...filterGroup }
  const filterIndex = tempFilterGroup.filters.findIndex((item) => item.filterName === filter.filterName)
  if (filterIndex === -1) return filterGroup
  tempFilterGroup.filters[filterIndex].isSelected = !filter.isSelected
  return tempFilterGroup
}

export const resetFilterGroup = (group: IFilterGroup): IFilterGroup => {
  return {
    ...group,
    filters: group.filters.map((filter) => ({ ...filter, isSelected: false }))
  }
}
