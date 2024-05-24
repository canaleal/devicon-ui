export type FilterType = 'versions' | 'color' | 'tags' | 'alias' | 'name'

export interface IIconFilterOption {
  filterName: string
  numberOfIcons: number
  isSelected: boolean
}

export interface IIconFilterCategory {
  categoryName: string
  filterType: FilterType
  filters: IIconFilterOption[]
}
