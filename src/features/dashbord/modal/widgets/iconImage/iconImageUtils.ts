import { IIcon } from '../../../../../types'
import { IIconSettings } from '../../types'

export const createStyleMap = (icon: IIcon, iconSettings: IIconSettings) => {
  if (!icon.versions.font.includes(iconSettings.selectedVersion)) return null
  if (icon.color === iconSettings.selectedColor) return null
  const styleMap = {
    WebkitMaskImage: `url(${iconSettings.iconUrl})`,
    maskImage: `url(${iconSettings.iconUrl})`,
    background: iconSettings.selectedColor
  }
  return styleMap
}