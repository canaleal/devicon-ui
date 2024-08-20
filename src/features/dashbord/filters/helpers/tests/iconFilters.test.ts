import { describe, it, expect } from 'vitest'

import {
  populateIconFilters,
  filterIcons,
  FilterFunctions,
  updateFilterGroups,
  updateFilter,
  resetFilterGroup
} from '../index'
import { IIcon } from '../../../../../types'
import { IFilterGroup, FilterType } from '../../types'

describe('populateIconFilters', () => {
  const mockIcons: IIcon[] = [
    {
      name: 'example',
      altnames: [],
      tags: ['tag1', 'tag2'],
      versions: {
        svg: ['plain', 'line', 'original'],
        font: ['plain', 'line']
      },
      color: '#ffffff',
      aliases: [{ base: 'original', alias: 'plain' }]
    },
    {
      name: 'another',
      altnames: ['alt1', 'alt2'],
      tags: ['tag3'],
      versions: {
        svg: ['original', 'line'],
        font: ['original']
      },
      color: '#000000',
      aliases: [{ base: 'line', alias: 'original' }]
    }
  ]

  it('should populate icon filters correctly', () => {
    const mockFilterGroup: IFilterGroup = {
      categoryName: 'testGroup',
      filterType: 'tags',
      filters: [
        { filterName: 'tag1', numberOfIcons: 0, isSelected: false },
        { filterName: 'tag2', numberOfIcons: 0, isSelected: false }
      ]
    }

    const result = populateIconFilters(mockIcons, mockFilterGroup)

    expect(result.categoryName).toEqual('testGroup')
    expect(result.filters.length).toBe(3)
    expect(result.filters.find((filter) => filter.filterName === 'tag1')?.numberOfIcons).toEqual(1)
    expect(result.filters.find((filter) => filter.filterName === 'tag3')?.numberOfIcons).toEqual(1)
  })

  it('should handle an empty icons array', () => {
    const mockFilterGroup: IFilterGroup = {
      categoryName: 'testGroup',
      filterType: 'tags',
      filters: []
    }

    const result = populateIconFilters([], mockFilterGroup)

    expect(result.filters.length).toBe(0)
  })

  it('should add new filters to the group if they do not exist', () => {
    const mockFilterGroup: IFilterGroup = {
      categoryName: 'testGroup',
      filterType: 'tags',
      filters: []
    }

    const result = populateIconFilters(mockIcons, mockFilterGroup)

    expect(result.filters.length).toBe(3)
    expect(result.filters.find((filter) => filter.filterName === 'tag3')?.numberOfIcons).toEqual(1)
  })
})

describe('filterIcons', () => {
  const mockIcons: IIcon[] = [
    {
      name: 'example',
      altnames: [],
      tags: ['tag1', 'tag2'],
      versions: {
        svg: ['plain', 'line', 'original'],
        font: ['plain', 'line']
      },
      color: '#ffffff',
      aliases: [{ base: 'original', alias: 'plain' }]
    },
    {
      name: 'another',
      altnames: ['alt1', 'alt2'],
      tags: ['tag3'],
      versions: {
        svg: ['original', 'line'],
        font: ['original']
      },
      color: '#000000',
      aliases: [{ base: 'line', alias: 'original' }]
    }
  ]

  it('should filter icons based on name criterion', () => {
    const result = filterIcons(mockIcons, 'name' as FilterType, 'example')
    expect(result.length).toBe(1)

    const result2 = filterIcons(mockIcons, 'name' as FilterType, 'nonexistent')
    expect(result2.length).toBe(0)
  })

  it('should filter icons based on versions criterion', () => {
    const result = filterIcons(mockIcons, 'versions' as FilterType, 'plain')
    expect(result.length).toBe(1)

    const result2 = filterIcons(mockIcons, 'versions' as FilterType, 'nonexistent')
    expect(result2.length).toBe(0)
  })

  it('should filter icons based on tags criterion', () => {
    const result = filterIcons(mockIcons, 'tags' as FilterType, 'tag1')
    expect(result.length).toBe(1)
  })

  it('should always return true for color filter', () => {
    const result = FilterFunctions['color'](mockIcons[0], 'placeholder')
    expect(result).toBe(true)
  })

  it('should always return true for alias filter', () => {
    const result = FilterFunctions['alias'](mockIcons[0], 'placeholder')
    expect(result).toBe(true)
  })
})

describe('updateFilterGroups', () => {
  const mockFilterGroups: IFilterGroup[] = [
    {
      categoryName: 'group1',
      filterType: 'tags',
      filters: [{ filterName: 'tag1', numberOfIcons: 1, isSelected: false }]
    },
    {
      categoryName: 'group2',
      filterType: 'versions',
      filters: [{ filterName: 'plain', numberOfIcons: 1, isSelected: false }]
    }
  ]

  it('should update the correct filter group', () => {
    const updatedGroup: IFilterGroup = {
      categoryName: 'group1',
      filterType: 'tags',
      filters: [{ filterName: 'tag1', numberOfIcons: 2, isSelected: true }]
    }

    const result = updateFilterGroups(mockFilterGroups, updatedGroup)

    expect(result.length).toBe(2)
    expect(result[0]).toEqual(updatedGroup)
    expect(result[1].categoryName).toBe('group2')
  })

  it('should not modify groups when no match is found', () => {
    const updatedGroup: IFilterGroup = {
      categoryName: 'nonexistent',
      filterType: 'name',
      filters: [{ filterName: 'example', numberOfIcons: 1, isSelected: false }]
    }

    const result = updateFilterGroups(mockFilterGroups, updatedGroup)

    expect(result).toEqual(mockFilterGroups)
  })
})

describe('updateFilter', () => {
  const mockFilterGroup: IFilterGroup = {
    categoryName: 'group1',
    filterType: 'tags',
    filters: [
      { filterName: 'tag1', numberOfIcons: 1, isSelected: false },
      { filterName: 'tag2', numberOfIcons: 1, isSelected: true }
    ]
  }

  it('should toggle the isSelected property of the filter', () => {
    const result = updateFilter(mockFilterGroup, { filterName: 'tag1', numberOfIcons: 1, isSelected: false })

    expect(result.filters[0].isSelected).toBe(true)
  })

  it('should return the original filter group if the filter is not found', () => {
    const result = updateFilter(mockFilterGroup, { filterName: 'nonexistent', numberOfIcons: 1, isSelected: false })

    expect(result).toEqual(mockFilterGroup)
  })
})

describe('resetFilterGroup', () => {
  const mockFilterGroup: IFilterGroup = {
    categoryName: 'group1',
    filterType: 'tags',
    filters: [
      { filterName: 'tag1', numberOfIcons: 1, isSelected: false },
      { filterName: 'tag2', numberOfIcons: 1, isSelected: true }
    ]
  }

  it('should reset all filters to isSelected = false', () => {
    const result = resetFilterGroup(mockFilterGroup)

    expect(result.filters.every((filter) => filter.isSelected === false)).toBe(true)
  })

  it('should not modify the numberOfIcons', () => {
    const result = resetFilterGroup(mockFilterGroup)

    expect(result.filters[0].numberOfIcons).toBe(1)
    expect(result.filters[1].numberOfIcons).toBe(1)
  })
})
