import { useState } from 'react'

import Tooltip from '../../../../components/Elements/Tooltip/Tooltip'
import { IIconSize } from '../types'
import storage from '../../../../helpers/storage'

interface IconContainerProps {
  iconName: string
  iconSize: IIconSize
  iconUrl: string
  extraClasses?: string
}

const ICON_IMAGE_STYLES = {
  base: 'flex-1 flex flex-col border rounded-lg p-4 h-[30rem]',
  light: 'bg-dark-900 text-smoke-100',
  dark: 'bg-white text-dark-900',
  viewBoxLight: 'border border-dark-900 border-dotted',
  viewBoxDark: 'border border-white border-dotted'
}

export const IconImage = ({ iconName, iconSize, iconUrl, extraClasses }: IconContainerProps) => {
  const [isDark, setIsDark] = useState<boolean>(storage.getToken()['isDark'] ?? false)
  const [showViewBox, setShowViewBox] = useState<boolean>(false)

  const toggleBackground = () => {
    setIsDark(!isDark)
  }

  const toggleViewBox = () => {
    setShowViewBox(!showViewBox)
  }

  const ICON_IMAGE_STYLE = `${ICON_IMAGE_STYLES.base} ${isDark ? ICON_IMAGE_STYLES.dark : ICON_IMAGE_STYLES.light} ${extraClasses}`
  const VIEW_BOX_STYLE = `${showViewBox ? isDark ? ICON_IMAGE_STYLES.viewBoxLight : ICON_IMAGE_STYLES.viewBoxDark : ''}`

  return (
    <div className={ICON_IMAGE_STYLE}>
      <img
        className={`m-auto ${VIEW_BOX_STYLE}`}
        height={iconSize.height}
        width={iconSize.width}
        src={iconUrl}
        alt={iconName}
      />
      <div className='flex flex-row justify-between'>
        <Tooltip content={`${isDark ? 'Dark' : 'Light'} Background`} position='top'>
          <button onClick={toggleBackground} className='p-2 hover:text-frog-600 flex text-2xl'>
            {isDark ? <i className='fa-solid fa-sun'></i> : <i className='fa-solid fa-moon'></i>}
          </button>
        </Tooltip>

        <Tooltip content={`${showViewBox ? 'Hide' : 'Show'} ViewBox`} position='top'>
          <button onClick={toggleViewBox} className='p-2 hover:text-frog-600 flex text-2xl'>
            {showViewBox ? <i className='fa-solid fa-eye-slash'></i> : <i className='fa-solid fa-eye'></i>}
          </button>
        </Tooltip>
      </div>
    </div>
  )
}

export default IconImage
