import React from 'react'

const TABLE_STYLES = {
  background: 'flex border-2 dark:border-dark-400 overflow-hidden w-full rounded-md',
  thead: 'border-b-2 dark:border-dark-400 bg-dark-900 text-smoke-100',
  tElement: 'text-left px-4 py-2 h-12',
  tRow: 'hover:bg-smoke-200 dark:bg-dark-800 dark:hover:bg-dark-900 cursor-pointer text-sm'
}

export interface TableProps<T> {
  title?: string
  data: T[]
  headers: string[]
  keyExtractor: (item: T, index: number) => string
  rowRenderer: (item: T) => React.ReactNode[]
  onRowClick?: (item: T) => void
  extraClasses?: string
}

export function Table<T>({ title, data, headers, keyExtractor, rowRenderer, onRowClick, extraClasses }: TableProps<T>) {
  if (!data.length) return null

  return (
    <div className={`flex flex-col gap-2 ${extraClasses}`}>
      {title && <p className='font-bold text-sm'>{title}</p>}
      <div className={TABLE_STYLES.background}>
        <table className='table-auto w-full'>
          <thead className={TABLE_STYLES.thead}>
            <tr>
              {headers.map((header, index) => (
                <th key={index} className={TABLE_STYLES.tElement}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={keyExtractor(item, index)}
                className={TABLE_STYLES.tRow}
                onClick={() => onRowClick && onRowClick(item)}
              >
                {rowRenderer(item).map((cell, cellIndex) => (
                  <td key={cellIndex} className={TABLE_STYLES.tElement}>
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
