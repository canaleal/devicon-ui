import React, { useEffect, useState, useMemo } from 'react'
import Tooltip from '../../../../../components/Atoms/Tooltip/Tooltip'
import './iconImage.css'
import { DeviconBranch, IIcon } from '../../../../../types'
import { createStyleMap } from './iconImageUtils'
import { createIconCodeBlockText } from '../../helpers/codeBlockContent'
import { downloadText } from '../../../../../helpers/downloadText'
import { getDeviconIconGithubUrl } from '../../../../../helpers/iconUrl'
import { IIconSettings } from '../../types'

interface IconContainerProps {
  icon: IIcon
  deviconBranch: DeviconBranch
  iconSettings: IIconSettings
  extraClasses?: string
}

export const IconImage = ({ icon, deviconBranch, iconSettings, extraClasses = '' }: IconContainerProps) => {
  const [isCheckeredBackground, setIsCheckeredBackground] = useState(false)
  const [isDarkBackground, setIsDarkBackground] = useState(false)
  const [isViewBoxVisible, setIsViewBoxVisible] = useState(false)
  const [styleMap, setStyleMap] = useState<React.CSSProperties | null>(null)

  useEffect(() => {
    setStyleMap(createStyleMap(icon, iconSettings))
  }, [icon, iconSettings])

  const toggle = (setter: React.Dispatch<React.SetStateAction<boolean>>, onEnable?: () => void) => {
    setter((prev) => {
      const next = !prev
      if (next && onEnable) onEnable()
      return next
    })
  }

  const handleDownload = async () => {
    const code = await createIconCodeBlockText(icon, iconSettings, 'SVG')
    const { selectedVersion, selectedIconSize } = iconSettings
    const fileName = `${icon.name}-${selectedVersion}-${selectedIconSize.width}x${selectedIconSize.height}.svg`
    downloadText(code, fileName)
  }

  const viewBoxClass = useMemo(() => {
    if (!isViewBoxVisible) return ''
    return isDarkBackground ? 'image-container__view-box--dark' : 'image-container__view-box--light'
  }, [isViewBoxVisible, isDarkBackground])

  const imageContainerClass = useMemo(() => {
    return [
      isDarkBackground ? 'image-container--dark' : 'image-container--light',
      isCheckeredBackground ? 'image-container--checkered' : ''
    ].join(' ')
  }, [isDarkBackground, isCheckeredBackground])

  return (
    <div className={`image-container ${imageContainerClass} ${extraClasses}`}>
      <div className='image-container__header'>
        <Tooltip content='Download SVG' position='top' flashMessage='Copied!'>
          <button onClick={handleDownload} className='button--icon icon--xl'>
            <i className='fa-solid fa-download'></i>
          </button>
        </Tooltip>
        <Tooltip content='Icon GitHub' position='top'>
          <a
            href={getDeviconIconGithubUrl(icon.name, iconSettings.selectedVersion, deviconBranch)}
            target='_blank'
            rel='noreferrer'
            className='button--icon icon--xl'
          >
            <i className='fa-brands fa-github'></i>
          </a>
        </Tooltip>
      </div>

      <div className='image-container__view-box-wrapper'>
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
              alt={`${icon.name} icon`}
              draggable={false}
            />
          )}
        </div>
      </div>

      <div className='image-container__footer'>
        <Tooltip content={`${isDarkBackground ? 'Light' : 'Dark'} Background`} position='top'>
          <button
            onClick={() => toggle(setIsDarkBackground, () => setIsCheckeredBackground(false))}
            className='button--icon icon--xl'
          >
            <i className={`fa-solid ${isDarkBackground ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>
        </Tooltip>

        <Tooltip content={`${isCheckeredBackground ? 'Hide' : 'Show'} Checkered Background`} position='top'>
          <button
            onClick={() => toggle(setIsCheckeredBackground, () => setIsDarkBackground(false))}
            className='button--icon icon--xl'
          >
            <i className={`fa-solid ${isCheckeredBackground ? 'fa-border-none' : 'fa-border-all'}`}></i>
          </button>
        </Tooltip>

        <Tooltip content={`${isViewBoxVisible ? 'Hide' : 'Show'} ViewBox`} position='top'>
          <button onClick={() => toggle(setIsViewBoxVisible)} className='button--icon icon--xl'>
            <i className={`fa-solid ${isViewBoxVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
          </button>
        </Tooltip>
      </div>
    </div>
  )
}
