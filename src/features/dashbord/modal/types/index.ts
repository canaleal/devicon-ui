export type IconSize = 'X-Small' | 'Small' | 'Medium' | 'Large' | 'X-Large'

export interface IIconSize {
  name: IconSize
  height: number
  width: number
}
export const ICON_SIZE_OPTIONS: IIconSize[] = [
  { name: 'X-Small', height: 32, width: 32 },
  { name: 'Small', height: 64, width: 64 },
  { name: 'Medium', height: 128, width: 128 },
  { name: 'Large', height: 192, width: 192 },
  { name: 'X-Large', height: 256, width: 256 }
]
export const INIT_ICON_SIZE = ICON_SIZE_OPTIONS[2]

export type CodeBlockOptionTypes = 'LINK' | 'IMG' | 'SVG' | 'ICON'
export const CODE_BLOCK_OPTIONS: CodeBlockOptionTypes[] = ['LINK', 'SVG', 'IMG', 'ICON']
