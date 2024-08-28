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
  if (!items.length) return null

  const itemsPerRow = Math.ceil(items.length / rows)
  const rowsOfItems = Array.from({ length: rows }, (_, i) => items.slice(i * itemsPerRow, (i + 1) * itemsPerRow))

  return (
    <div className='scroll-container'>
      {rowsOfItems.map((row, rowIndex) => (
        <div key={rowIndex} className='scroll-container__content'>
          {Array(2)
            .fill(null)
            .map((_, listIndex) => (
              <ul key={listIndex} className='animate-infinite-scroll'>
                {row.map(({ link, name }, itemIndex) => (
                  <li key={itemIndex}>
                    {itemType === 'image' ? (
                      <img src={link} alt={name} className='h-10 w-10' />
                    ) : (
                      <i className={`${link} text-4xl`} title={name} />
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
