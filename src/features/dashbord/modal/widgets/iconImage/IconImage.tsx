import { useState } from 'react'

import Tooltip from '../../../../../components/Elements/Widgets/Tooltip/Tooltip'
import { IIconSettings } from '../../types'
import '../../../../../components/Elements/Widgets/Button/button.css'
import './iconImage.css'
import { IIcon } from '../../../../../types'
import { createStyleMap } from './iconImageUtils'


interface IconContainerProps {
  icon: IIcon
  iconSettings: IIconSettings
  extraClasses?: string
}

export const IconImage = ({ icon, iconSettings, extraClasses }: IconContainerProps) => {
  const styleMap = createStyleMap(icon, iconSettings)
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
          <div
            style={{
              height: iconSettings.selectedIconSize.height,
              width: iconSettings.selectedIconSize.width,
              ...styleMap
            }}
          />
        ) : (
          <img
            height={iconSettings.selectedIconSize.height}
            width={iconSettings.selectedIconSize.width}
            src={iconSettings.iconUrl}
          />
        )}
      </div>

      <div className='flex flex-row justify-between'>
        <Tooltip content={`${isDarkBackground ? 'Light' : 'Dark'} Background`} position='top'>
          <button onClick={handleToggleBackground} className='button--icon icon--xxl'>
            {isDarkBackground ? <i className='fa-solid fa-sun'></i> : <i className='fa-solid fa-moon'></i>}
          </button>
        </Tooltip>

        <Tooltip content={`${isViewBoxVisible ? 'Hide' : 'Show'} ViewBox`} position='top'>
          <button onClick={handleToggleViewBox} className={`button--icon icon--xxl `}>
            {isViewBoxVisible ? <i className='fa-solid fa-eye-slash'></i> : <i className='fa-solid fa-eye'></i>}
          </button>
        </Tooltip>
      </div>
    </div>
  )
}

export default IconImage
