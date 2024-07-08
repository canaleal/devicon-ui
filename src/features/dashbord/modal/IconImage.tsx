import { useState } from 'react'

import Tooltip from '../../../components/Elements/Tooltip/Tooltip'
import { IIconSize } from './types'
import { BUTTON_STYLES } from '../../../components/Elements/Button/ButtonStyles'

interface IconContainerProps {
  iconName: string
  iconSize: IIconSize
  iconUrl: string
  extraClasses?: string
}

const ICON_IMAGE_STYLES = {
  base: 'flex-1 flex flex-col  p-4 h-[30rem]',
  light: 'bg-white text-dark-900 border',
  dark: 'bg-dark-900 text-smoke-100 border border-dark-400'
}

const VIEW_BOX_STYLES = {
  viewBoxBase: 'm-auto',
  viewBoxLight: 'border border-dotted border-dark-900 ',
  viewBoxDark: 'border border-dotted border-dark-100'
}

export const IconImage = ({ iconName, iconSize, iconUrl, extraClasses }: IconContainerProps) => {
  const [isDark, setIsDark] = useState<boolean>(false)
  const [showViewBox, setShowViewBox] = useState<boolean>(false)

  const toggleBackground = () => {
    setIsDark(!isDark)
  }

  const toggleViewBox = () => {
    setShowViewBox(!showViewBox)
  }

  const ICON_IMAGE_STYLE = `${ICON_IMAGE_STYLES.base} ${isDark ? ICON_IMAGE_STYLES.dark : ICON_IMAGE_STYLES.light} ${extraClasses}`
  const VIEW_BOX_STYLE = `${VIEW_BOX_STYLES.viewBoxBase} ${showViewBox ? (isDark ? VIEW_BOX_STYLES.viewBoxDark : VIEW_BOX_STYLES.viewBoxLight) : ''}`

  return (
    <div className={ICON_IMAGE_STYLE}>
      <img className={VIEW_BOX_STYLE} height={iconSize.height} width={iconSize.width} src={iconUrl} alt={iconName} />
      <div className='flex flex-row justify-between'>
        <Tooltip content={`${isDark ? 'Light' : 'Dark'} Background`} position='top'>
          <button onClick={toggleBackground} className={`${BUTTON_STYLES.base} ${BUTTON_STYLES.extraLarge}`}>
            {isDark ? <i className='fa-solid fa-sun'></i> : <i className='fa-solid fa-moon'></i>}
          </button>
        </Tooltip>

        <Tooltip content={`${showViewBox ? 'Hide' : 'Show'} ViewBox`} position='top'>
          <button onClick={toggleViewBox} className={`${BUTTON_STYLES.base} ${BUTTON_STYLES.extraLarge}`}>
            {showViewBox ? <i className='fa-solid fa-eye-slash'></i> : <i className='fa-solid fa-eye'></i>}
          </button>
        </Tooltip>
      </div>
    </div>
  )
}

export default IconImage
