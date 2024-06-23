import { IIcon, IconVersion } from '../../../../types'
import { IIconSize, CodeBlockOptionTypes } from '../types'

export const fetchIconSVG = async (iconUrl: string) => {
  const response = await fetch(iconUrl)
  return response.text()
}

export const adjustSVGAttributes = (svgContent: string, iconSize: IIconSize) => {
  const replaceOrAddAttribute = (currentSvgContent: string, attr: 'width' | 'height'): string => {
    const pattern = new RegExp(`${attr}="[^"]*"`)
    const replacement = `${attr}="${iconSize[attr]}"`
    if (currentSvgContent.includes(`${attr}=`)) {
      return currentSvgContent.replace(pattern, replacement)
    } else {
      return currentSvgContent.replace('<svg', `<svg ${replacement}`)
    }
  }

  return ['width', 'height'].reduce((acc, attr) => replaceOrAddAttribute(acc, attr as 'width' | 'height'), svgContent)
}

export const getImageTag = (icon: IIcon, iconUrl: string, iconSize: IIconSize) => {
  return `<img src="${iconUrl}" alt="${icon.name}" height="${iconSize.height}" width="${iconSize.width}" />`
}

export const getITag = (icon: IIcon, selectedVersion: IconVersion) => {
  return `<i class="devicon-${icon.name}-${selectedVersion} colored"></i>`
}

export const createIconCodeBlockText = async (
  icon: IIcon,
  iconSize: IIconSize,
  iconUrl: string,
  selectedVersion: IconVersion,
  selectedCodeBlockFormat: CodeBlockOptionTypes
) => {
  const codeClockFormats: Record<CodeBlockOptionTypes, () => string | Promise<string>> = {
    Link: () => iconUrl,
    IMG: () => getImageTag(icon, iconUrl, iconSize),
    SVG: async () => adjustSVGAttributes(await fetchIconSVG(iconUrl), iconSize),
    Icon: () => getITag(icon, selectedVersion)
  }

  return codeClockFormats[selectedCodeBlockFormat] ? await codeClockFormats[selectedCodeBlockFormat]() : ''
}
