import { IIcon } from '../../../../../types'
import { IIconSettings } from '../../types'
import React from 'react'

export const createStyleMap = (icon: IIcon, settings: IIconSettings): React.CSSProperties | null => {
  const isFontIcon = icon.versions.font.includes(settings.selectedVersion)
  const isCustomColor = icon.color !== settings.selectedColor

  if (!isFontIcon || !isCustomColor) return null

  const maskUrl = `url(${settings.iconUrl})`

  return {
    WebkitMaskImage: maskUrl,
    maskImage: maskUrl,
    background: settings.selectedColor
  }
}
