export type FilterType = 'versions' | 'color' | 'tags' | 'alias' | 'name'

export interface IFilterItem {
  filterName: string
  numberOfIcons: number
  isSelected: boolean
}

export interface IFilterGroup {
  categoryName: string
  filterType: FilterType
  filters: IFilterItem[]
}
