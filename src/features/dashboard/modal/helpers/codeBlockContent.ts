import { IIconSettings, IIconSize, CodeBlockOptionTypes, CODE_BLOCK_OPTIONS } from '../types'
import { IIcon, IconVersion } from '../../../../types'

export const getCodeBlockOptions = (deviconBranch: string, icon: IIcon, selectedVersion: IconVersion) => {
  const isFontVersion = icon.versions.font.includes(selectedVersion)
  const allowIcon = deviconBranch !== 'develop' && isFontVersion
  return allowIcon ? CODE_BLOCK_OPTIONS : CODE_BLOCK_OPTIONS.filter((opt) => opt !== 'ICON')
}

export const adjustSVGAttributes = (icon: IIcon, svg: string, size: IIconSize, color: string): string => {
  const updateAttr = (content: string, attr: 'width' | 'height', value: number): string => {
    const pattern = new RegExp(`${attr}="[^"]*"`)
    const replacement = `${attr}="${value}"`
    return pattern.test(content)
      ? content.replace(pattern, replacement)
      : content.replace('<svg', `<svg ${replacement}`)
  }

  let updated = svg
  if (size.width !== 128) updated = updateAttr(updated, 'width', size.width)
  if (size.height !== 128) updated = updateAttr(updated, 'height', size.height)

  if (icon.color !== color) {
    updated = /fill="/.test(updated)
      ? updated.replace(/fill="[^"]*"/g, `fill="${color}"`)
      : updated.replace('<svg', `<svg fill="${color}"`)
  }

  return updated
}

const getSVGTag = async (icon: IIcon, url: string, size: IIconSize, color: string) => {
  const response = await fetch(url)
  const rawSvg = await response.text()
  return adjustSVGAttributes(icon, rawSvg, size, color)
}

const buildStyle = (styles: Record<string, string>) =>
  Object.entries(styles)
    .map(([k, v]) => `${k}: ${v};`)
    .join(' ')

export const getImageTag = (icon: IIcon, url: string, size: IIconSize) => {
  const style: Record<string, string> = {}
  if (size.name !== 'Medium') {
    style.width = `${size.width}`
    style.height = `${size.height}`
  }

  const styleStr = buildStyle(style)
  return `<img src="${url}" alt="${icon.name}" ${styleStr ? `style="${styleStr}"` : ''}/>`
}

export const getIconTag = (icon: IIcon, version: IconVersion, size: IIconSize, color: string) => {
  const style: Record<string, string> = {}

  if (size.name !== 'Medium') {
    style.width = `${size.width}`
    style.height = `${size.height}`
  }

  if (icon.color !== color) {
    style.color = color
  }

  const styleStr = buildStyle(style)
  return `<i class="devicon-${icon.name}-${version} colored" ${styleStr ? `style="${styleStr}"` : ''}/>`
}

export const createIconCodeBlockText = (
  icon: IIcon,
  settings: IIconSettings,
  format: CodeBlockOptionTypes
): Promise<string> | string => {
  switch (format) {
    case 'LINK':
      return settings.iconUrl
    case 'IMG':
      return getImageTag(icon, settings.iconUrl, settings.selectedIconSize)
    case 'ICON':
      return getIconTag(icon, settings.selectedVersion, settings.selectedIconSize, settings.selectedColor)
    case 'SVG':
      return getSVGTag(icon, settings.iconUrl, settings.selectedIconSize, settings.selectedColor)
  }
}
