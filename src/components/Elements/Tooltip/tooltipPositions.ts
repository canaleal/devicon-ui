export type TooltipPosition = 'left' | 'right' | 'top' | 'bottom'
export const TOOLTIP_POSITIONS: Record<TooltipPosition, string> = {
  top: '-top-full left-1/2 transform -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
}
