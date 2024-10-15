import { useEffect, useState } from 'react'
import Tooltip from '../../../../../components/Elements/Tooltip/Tooltip'
import './iconImage.css'
import { DeviconBranch, IIcon } from '../../../../../types'
import { createStyleMap } from './iconImageUtils'
import { useIconSettingStore } from '../../store/iconSettingStore'
import { createIconCodeBlockText } from '../../helpers/codeBlockContent'
import { downloadText } from '../../../../../helpers/downloadText'
import { getDeviconIconGithubUrl } from '../../../../../helpers/iconUrl'

interface IconContainerProps {
  icon: IIcon
  deviconBranch: DeviconBranch
  extraClasses?: string
}

export const IconImage = ({ icon, deviconBranch, extraClasses }: IconContainerProps) => {
  const { iconSettings } = useIconSettingStore()

  const [isCheckeredBackground, setIsCheckeredBackground] = useState<boolean>(false)
  const [isDarkBackground, setIsDarkBackground] = useState<boolean>(false)
  const [isViewBoxVisible, setIsViewBoxVisible] = useState<boolean>(false)
  const [styleMap, setStyleMap] = useState<React.CSSProperties | null>(null)

  useEffect(() => {
    const tempStyleMap = createStyleMap(icon, iconSettings)
    setStyleMap(tempStyleMap)
  }, [icon, iconSettings])

  const handleToggleBackground = () => {
    setIsDarkBackground(!isDarkBackground)
    if (isCheckeredBackground) setIsCheckeredBackground(false)
  }

  const handleToggleViewBox = () => {
    setIsViewBoxVisible(!isViewBoxVisible)
  }

  const handleCheckeredBackground = () => {
    setIsCheckeredBackground(!isCheckeredBackground)
    if (!isCheckeredBackground) setIsDarkBackground(false) // force light theme
  }

  const handleCopySVGClick = async () => {
    const code = await createIconCodeBlockText(icon, iconSettings, 'SVG')
    const fileName = `${icon.name}-${iconSettings.selectedVersion}-${iconSettings.selectedIconSize.width}x${iconSettings.selectedIconSize.height}.svg`
    downloadText(code, fileName)
  }

  const viewBoxClass = `${isViewBoxVisible ? (isDarkBackground ? 'image-container__view-box--dark' : 'image-container__view-box--light') : ''}`
  return (
    <div
      className={`image-container ${isDarkBackground ? 'image-container--dark' : 'image-container--light'} ${isCheckeredBackground ? 'image-container--checkered' : ''} ${extraClasses}`}
    >
      <div className='image-container__options-list'>
        <Tooltip content='Download SVG' position='top' flashMessage='Copied!'>
          <button onClick={handleCopySVGClick} className='button--icon icon--xxl'>
            <i className='fa-solid fa-download'></i>
          </button>
        </Tooltip>

        <Tooltip content='Icon GitHub' position='top'>
          <a
            href={getDeviconIconGithubUrl(icon.name, iconSettings.selectedVersion, deviconBranch)}
            target='_blank'
            rel='noreferrer'
            className='button--icon icon--xxl'
          >
            <i className='fa-brands fa-github'></i>
          </a>
        </Tooltip>
      </div>

      <div className={`image-container__view-box ${viewBoxClass}`}>
        {styleMap ? (
          <div
            className='image-container__image'
            style={{
              height: iconSettings.selectedIconSize.height,
              width: iconSettings.selectedIconSize.width,
              ...styleMap
            }}
          />
        ) : (
          <img
            className='image-container__image'
            height={iconSettings.selectedIconSize.height}
            width={iconSettings.selectedIconSize.width}
            src={iconSettings.iconUrl}
          />
        )}
      </div>

      <div className='image-container__options-list'>
        <Tooltip content={`${isDarkBackground ? 'Light' : 'Dark'} Background`} position='top'>
          <button onClick={handleToggleBackground} className='button--icon icon--xxl'>
            {isDarkBackground ? <i className='fa-solid fa-sun'></i> : <i className='fa-solid fa-moon'></i>}
          </button>
        </Tooltip>
        <Tooltip content={`${isCheckeredBackground ? 'Hide' : 'Show'} Checkered Background`} position='top'>
          <button onClick={handleCheckeredBackground} className='button--icon icon--xxl'>
            {isCheckeredBackground ? (
              <i className='fa-solid fa-border-none'></i>
            ) : (
              <i className='fa-solid fa-border-all'></i>
            )}
          </button>
        </Tooltip>
        <Tooltip content={`${isViewBoxVisible ? 'Hide' : 'Show'} ViewBox`} position='top'>
          <button onClick={handleToggleViewBox} className='button--icon icon--xxl'>
            {isViewBoxVisible ? <i className='fa-solid fa-eye-slash'></i> : <i className='fa-solid fa-eye'></i>}
          </button>
        </Tooltip>
      </div>
    </div>
  )
}

export default IconImage
