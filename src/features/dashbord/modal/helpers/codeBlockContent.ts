import { IIcon, IconVersion } from '../../../../types'
import { IIconSize, CodeBlockOptionTypes, CODE_BLOCK_OPTIONS } from '../types'

export const getCodeBlockOptions = (deviconBranch: string, icon: IIcon, selectedVersion: IconVersion) => {
  return deviconBranch === 'develop' || !icon.versions.font.includes(selectedVersion)
  ? CODE_BLOCK_OPTIONS.filter((option) => option !== 'ICON')
  : CODE_BLOCK_OPTIONS
}


export const fetchIconSVG = async (iconUrl: string) => {
  const response = await fetch(iconUrl)
  return response.text()
}

export const adjustSVGAttributes = (
  icon: IIcon,
  svgContent: string,
  iconSize: IIconSize,
  selectedColor: string
) => {
  const replaceOrAddAttribute = (content: string, attr: 'width' | 'height'): string => {
    if (iconSize[attr] === 128) return content;
    const pattern = new RegExp(`${attr}="[^"]*"`);
    const replacement = `${attr}="${iconSize[attr]}"`;
    return content.includes(`${attr}=`)
      ? content.replace(pattern, replacement)
      : content.replace('<svg', `<svg ${replacement}`);
  };

  const replaceOrAddFillColors = (content: string): string => {
    if (icon.color !== selectedColor) {
      content = content.replace(/fill="[^"]*"/g, `fill="${selectedColor}"`);
      if (!content.includes('fill=')) {
        content = content.replace('<svg', `<svg fill="${selectedColor}"`);
      }
    }
    return content;
  };

  let updatedSvgContent = svgContent;
  updatedSvgContent = replaceOrAddAttribute(updatedSvgContent, 'width');
  updatedSvgContent = replaceOrAddAttribute(updatedSvgContent, 'height');
  updatedSvgContent = replaceOrAddFillColors(updatedSvgContent);
  return updatedSvgContent;
};


export const getImageTag = (icon: IIcon, iconUrl: string, iconSize: IIconSize) => {
  const styles: { [key: string]: string } = {};

  if (iconSize.name !== 'Medium') {
    styles.height = iconSize.height.toString();
    styles.width = iconSize.width.toString();
  }

  const styleString = Object.entries(styles).map(([key, value]) => `${key}: ${value};`).join(' ');
  return `<img src="${iconUrl}" alt="${icon.name}" ${styleString ? `style="${styleString}"` : ''}/>`;
}


export const getIconTag = (icon: IIcon, selectedVersion: IconVersion, iconSize: IIconSize, selectedColor: string) => {
  const styles: { [key: string]: string } = {};

  if (iconSize.name !== 'Medium') {
    styles.height = iconSize.height.toString();
    styles.width = iconSize.width.toString();
  }

  if (icon.color !== selectedColor) {
    styles.color = selectedColor;
  }

  const styleString = Object.entries(styles).map(([key, value]) => `${key}: ${value};`).join(' ');
  return `<i class="devicon-${icon.name}-${selectedVersion} colored" ${styleString ? `style="${styleString}"` : ''}/>`;
};


export const createIconCodeBlockText = (
  icon: IIcon,
  iconSize: IIconSize,
  iconUrl: string,
  svgContent: string,
  selectedVersion: IconVersion,
  selectedColor: string,
  selectedCodeBlockFormat: CodeBlockOptionTypes
) => {
  const codeClockFormats: Record<CodeBlockOptionTypes, () => string> = {
    LINK: () => iconUrl,
    IMG: () => getImageTag(icon, iconUrl, iconSize),
    ICON: () => getIconTag(icon, selectedVersion, iconSize, selectedColor),
    SVG: () => adjustSVGAttributes(icon, svgContent, iconSize, selectedColor)
  }

  return codeClockFormats[selectedCodeBlockFormat]();
}
