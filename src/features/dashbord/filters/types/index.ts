
export type FilterType = 'versions' | 'color' | 'tags' | 'alias' | 'name'

export interface IIconFilter {
    filterName: string,
    numberOfIcons: number,
    isSelected: boolean
}

export interface IIconFilterGroup {
    groupName: string,
    filterType: FilterType,
    filters: IIconFilter[]
}