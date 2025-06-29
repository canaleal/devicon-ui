import React from 'react'
import './table.css'

export interface TableProps<T> {
  title: string
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
    <div className={`table-container ${extraClasses}`}>
      {title && <p className='table-container__title'>{title}</p>}
      <div className='table'>
        <table>
          <thead className='table__head'>
            <tr>
              {headers.map((header, index) => (
                <th key={index} className='table__element'>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={keyExtractor(item, index)} className='table__row' onClick={() => onRowClick && onRowClick(item)}>
                {rowRenderer(item).map((cell, cellIndex) => (
                  <td key={cellIndex} className='table__element'>
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
