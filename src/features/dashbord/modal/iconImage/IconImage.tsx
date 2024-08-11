import { useState } from 'react'

import Tooltip from '../../../../components/Elements/Widgets/Tooltip/Tooltip'
import { IIconSize } from '../types'
import '../../../../components/Elements/Widgets/Button/styles/button.css'
import './styles/iconImage.css'
import { IconVersion, IIcon } from '../../../../types'
import { createStyleMap } from '../helpers/iconImage'

interface IconContainerProps {
  icon: IIcon
  selectedIconSize: IIconSize
  selectedColor: string
  selectedVersion: IconVersion
  iconUrl: string
  extraClasses?: string
}

export const IconImage = ({
  icon,
  selectedIconSize,
  selectedColor,
  selectedVersion,
  iconUrl,
  extraClasses
}: IconContainerProps) => {
  const styleMap = createStyleMap(icon, selectedVersion, selectedColor, iconUrl)
  const [isDarkBackground, setIsDarkBackground] = useState<boolean>(false)
  const [isViewBoxVisible, setIsViewBoxVisible] = useState<boolean>(false)

  const handleToggleBackground = () => {
    setIsDarkBackground(!isDarkBackground)
  }

  const handleToggleViewBox = () => {
    setIsViewBoxVisible(!isViewBoxVisible)
  }

  return (
    <div className={`icon-image ${isDarkBackground ? 'icon-image--dark' : 'icon-image--light'} ${extraClasses}`}>
      <div className={`view-box  ${isViewBoxVisible ? (isDarkBackground ? 'view-box--dark' : 'view-box--light') : ''}`}>
        {styleMap ? (
          <div style={{ height: selectedIconSize.height, width: selectedIconSize.width, ...styleMap }} />
        ) : (
          <img height={selectedIconSize.height} width={selectedIconSize.width} src={iconUrl} />
        )}
      </div>

      <div className='flex flex-row justify-between'>
        <Tooltip content={`${isDarkBackground ? 'Light' : 'Dark'} Background`} position='top'>
          <button onClick={handleToggleBackground} className='button button--icon icon--xxl'>
            {isDarkBackground ? <i className='fa-solid fa-sun'></i> : <i className='fa-solid fa-moon'></i>}
          </button>
        </Tooltip>

        <Tooltip content={`${isViewBoxVisible ? 'Hide' : 'Show'} ViewBox`} position='top'>
          <button onClick={handleToggleViewBox} className='button button--icon icon--xxl'>
            {isViewBoxVisible ? <i className='fa-solid fa-eye-slash'></i> : <i className='fa-solid fa-eye'></i>}
          </button>
        </Tooltip>
      </div>
    </div>
  )
}

export default IconImage
