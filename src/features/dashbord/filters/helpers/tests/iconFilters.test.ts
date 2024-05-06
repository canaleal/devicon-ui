import { FilterType } from '../..';
import { IIcon } from '../../../../../types';
import { FilterFunctions, filterIcons, populateIconFilters } from '../index'; // replace 'yourModule' with the actual module path

describe('populateIconFilters', () => {
  const mockIcons: IIcon[] = [
    {
      name: 'example',
      altnames: [],
      tags: ['tag1', 'tag2'],
      versions: {
        svg: ['plain', 'line', 'original'],
        font: ['plain', 'line'],
      },
      color: '#ffffff',
      aliases: [{ base: 'original', alias: 'plain' }],
    },
    // Add more mock icons as needed
  ];

  it('should populate icon filters correctly', () => {
    const mockFilterGroup = {
      categoryName: 'testGroup',
      filterType: 'tags' as FilterType,
      filters: [
        { filterName: 'tag1', numberOfIcons: 0, isSelected: false },
        { filterName: 'tag2', numberOfIcons: 0, isSelected: false },
      ],
    };

    const result = populateIconFilters(mockIcons, mockFilterGroup);

    // Assertions based on your logic
    expect(result.categoryName).toEqual('testGroup');
    expect(result.filters.length).toBeGreaterThan(0);
    // Add more assertions based on your logic and expected behavior
  });

  // Add more test cases as needed
});

describe('filterIcons', () => {
  const mockIcons: IIcon[] = [
    {
      name: 'example',
      altnames: [],
      tags: ['tag1', 'tag2'],
      versions: {
        svg: ['plain', 'line', 'original'],
        font: ['plain', 'line'],
      },
      color: '#ffffff',
      aliases: [{ base: 'original', alias: 'plain' }],
    },
    // Add more mock icons as needed
  ];

  it('should filter icons based on name criterion', () => {
    const result = filterIcons(mockIcons, 'name' as FilterType, 'example');
    expect(result.length).toBeGreaterThan(0);
    // Add more assertions based on your logic and expected behavior

    const result2 = filterIcons(mockIcons, 'name' as FilterType, 'nonexistent');
    expect(result2.length).toBe(0);
  });

  it('should filter icons based on versions criterion', () => {
    const result = filterIcons(mockIcons, 'versions' as FilterType, 'plain');
    expect(result.length).toBeGreaterThan(0);
    // Add more assertions based on your logic and expected behavior

    const result2 = filterIcons(
      mockIcons,
      'versions' as FilterType,
      'nonexistent',
    );
    expect(result2.length).toBe(0);
  });

  it('should filter icons based on tags criterion', () => {
    const result = filterIcons(mockIcons, 'tags' as FilterType, 'tag1');
    expect(result.length).toBeGreaterThan(0);
    // Add more assertions based on your logic and expected behavior
  });

  // Add more test cases for other filter types

  // Test the placeholder functions in FilterFunctions
  it('should always return true for color filter', () => {
    const result = FilterFunctions['color'](mockIcons[0], 'placeholder');
    expect(result).toBe(true);
  });

  it('should always return true for alias filter', () => {
    const result = FilterFunctions['alias'](mockIcons[0], 'placeholder');
    expect(result).toBe(true);
  });
});
