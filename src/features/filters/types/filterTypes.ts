

export interface IIconFilter {
    filterName: string,
    numberOfIcons: number,
    isSelected: boolean
}

export const initialIconVersionFilters: IIconFilter[] = [
    { filterName: 'original', numberOfIcons: 0, isSelected: false },
    { filterName: 'original-wordmark', numberOfIcons: 0, isSelected: false },
    { filterName: 'plain', numberOfIcons: 0, isSelected: false },
    { filterName: 'plain-wordmark', numberOfIcons: 0, isSelected: false },
    { filterName: 'line', numberOfIcons: 0, isSelected: false },
    { filterName: 'line-wordmark', numberOfIcons: 0, isSelected: false },
]
