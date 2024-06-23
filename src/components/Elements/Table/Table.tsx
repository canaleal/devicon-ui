import React from 'react'

const sizes = {
  sm: 'w-16',
  md: 'w-32',
  lg: 'w-48',
  full: 'w-full'
}

export interface TableProps<T> {
  title?: string
  data: T[]
  headers: string[]
  keyExtractor: (item: T, index: number) => string
  rowRenderer: (item: T) => React.ReactNode[]
  onRowClick?: (item: T) => void
  size: keyof typeof sizes
  extraClasses?: string
}

export function Table<T>({
  title,
  data,
  headers,
  keyExtractor,
  rowRenderer,
  onRowClick,
  size,
  extraClasses
}: TableProps<T>) {
  if (!data.length) return null

  return (
    <div className={`flex flex-col gap-2 ${sizes[size]} ${extraClasses}`}>
      {title && <p className='font-bold text-sm '>{title}</p>}
      <div className='flex rounded-lg border-2 overflow-hidden w-full  '>
        <table className='table-auto w-full'>
          <thead className='border-b-2 bg-dark-900 text-smoke-100'>
            <tr>
              {headers.map((header, index) => (
                <th key={index} className='text-left px-4 py-2 h-12'>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={keyExtractor(item, index)}
                className='hover:bg-smoke-200 cursor-pointer'
                onClick={() => onRowClick && onRowClick(item)}
              >
                {rowRenderer(item).map((cell, cellIndex) => (
                  <td key={cellIndex} className='text-left px-4 py-2'>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table
