import { useState } from 'react'

import Tooltip from '../../../../components/Elements/Tooltip/Tooltip'
import { IIconSize } from '../types'
import '../../../../components/Elements/Button/styles/button.css'
import './styles/iconImage.css'
import { IconVersion, IIcon } from '../../../../types'

interface IconContainerProps {
  icon: IIcon,
  selectedIconSize: IIconSize
  selectedColor: string
  selectedVersion: IconVersion
  iconUrl: string
  extraClasses?: string
}

export const IconImage = ({ icon, selectedIconSize, selectedColor, selectedVersion, iconUrl, extraClasses }: IconContainerProps) => {
  const [isDark, setIsDark] = useState<boolean>(false)
  const [showViewBox, setShowViewBox] = useState<boolean>(false)

  const toggleBackground = () => {
    setIsDark(!isDark)
  }

  const toggleViewBox = () => {
    setShowViewBox(!showViewBox)
  }

  const ICON_IMAGE_STYLE = `icon-image ${isDark ? 'icon-image--dark' : 'icon-image--light'} ${extraClasses}`
  const VIEW_BOX_STYLE = `view-box ${showViewBox ? (isDark ? 'view-box--dark' : 'view-box--light') : ''}`

  const createStyleMap = () => {
    const styleMap = {
      WebkitMaskImage: `url(${iconUrl})`,
      maskImage: `url(${iconUrl})`,
      background: selectedColor
    }
    return styleMap;
  }
  const USE_MASK = icon.versions.font.includes(selectedVersion);
  const STYLE_MAP = USE_MASK && createStyleMap()

  return (
    <div className={ICON_IMAGE_STYLE}>
      <div className={VIEW_BOX_STYLE}>
        {USE_MASK ? (
          <div style={{ height: selectedIconSize.height, width: selectedIconSize.width, ...STYLE_MAP }} />
        ) : (
          <img
            height={selectedIconSize.height}
            width={selectedIconSize.width}
            src={iconUrl}
            alt={icon.name}
          />
        )}
      </div>

      <div className='flex flex-row justify-between'>
        <Tooltip content={`${isDark ? 'Light' : 'Dark'} Background`} position='top'>
          <button onClick={toggleBackground} className='button button--icon icon--xxl'>
            {isDark ? <i className='fa-solid fa-sun'></i> : <i className='fa-solid fa-moon'></i>}
          </button>
        </Tooltip>

        <Tooltip content={`${showViewBox ? 'Hide' : 'Show'} ViewBox`} position='top'>
          <button onClick={toggleViewBox} className='button button--icon icon--xxl'>
            {showViewBox ? <i className='fa-solid fa-eye-slash'></i> : <i className='fa-solid fa-eye'></i>}
          </button>
        </Tooltip>
      </div>
    </div>
  )
}

export default IconImage
