export const DROPDOWN_STYLE = {
  input: 'h-12 hover:cursor-pointer text-sm px-4 w-full flex justify-between items-center border rounded-md',
  inputSmall: 'h-8 hover:cursor-pointer text-sm px-2 flex justify-between items-center border  rounded-md',
  selected: 'bg-frog-800 text-smoke-100',
  unselected: 'hover:bg-gray-200',
  colors: 'bg-white text-dark-900 dark:bg-dark-900 dark:text-smoke-100 dark:border-dark-400'
}

export const DROPDOWN_POPUP_STYLE = {
  container: 'absolute mt-1 w-full bg-white dark:text-dark-900  border  shadow-lg z-30  rounded-md',
  item: 'px-4 py-2 hover:bg-gray-200 cursor-pointer text-sm',
  customItem: 'p-4 flex flex-col gap-4 '
}

export const DROPDOWN_SIZES = {
  sm: 'w-16',
  md: 'w-32',
  lg: 'w-48',
  xl: 'w-96',
  full: 'w-full'
}
