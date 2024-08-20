import React from 'react'
import './style/InfiniteScroll.css'

export interface IScrollItem {
  link: string
  name: string
}

interface Props {
  items: IScrollItem[]
  itemType?: 'image' | 'icon'
  rows?: number
}

const InfiniteScroll: React.FC<Props> = ({ items, itemType = 'image', rows = 1 }) => {
  const splitItemsIntoRows = (items: IScrollItem[], rows: number) => {
    const itemsPerRow = Math.ceil(items.length / rows)
    const result: IScrollItem[][] = []
    for (let i = 0; i < rows; i++) {
      result.push(items.slice(i * itemsPerRow, (i + 1) * itemsPerRow))
    }
    return result
  }
  const rowsOfItems = splitItemsIntoRows(items, rows)
  if (items.length === 0) return null

  return (
    <div className='w-full inline-flex flex-col overflow-hidden masked-image gap-4'>
      {rowsOfItems.map((row, rowIndex) => (
        <div key={rowIndex} className='w-full inline-flex flex-nowrap overflow-hidden'>
          {Array(2)
            .fill(null)
            .map((_, listIndex) => (
              <ul
                key={listIndex}
                className='flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll'
              >
                {row.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    {itemType === 'image' ? (
                      <img src={item.link} alt={item.name} className='h-10 w-10' />
                    ) : (
                      <i className={`${item.link} text-4xl`} title={item.name} />
                    )}
                  </li>
                ))}
              </ul>
            ))}
        </div>
      ))}
    </div>
  )
}

export default InfiniteScroll
