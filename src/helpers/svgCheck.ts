
import { IconVersion, IException, IIcon } from '../types/index';

// Fill color does not match plain, line version
// Viewbox is not 128x128
// SVG paths do not reach the edges of the viewbox
// Background is not transparent
// SVG is not centered horizontally and vertically


const svgDoesNotContainColor = (icon: IIcon, svgContent: string) => {
    return !svgContent.toLowerCase().includes(icon.color.toLowerCase());
  }

const svgViewBoxNot128 = (svgContent: string) => {
    return !svgContent.includes('viewBox="0 0 128 128"');
}

const getAllUniqueFillColorsThatAreNotNull = (svgContent: string) => {
    const fillColors = svgContent.match(/fill="[^"]*"/g);
    if (!fillColors) return [];
    // Remove fill="none" and fill="null"
    const notNoneColors = fillColors.filter((color) => !color.includes('none') && !color.includes('null'));
    const removedFill = notNoneColors.map((color) => color.replace('fill="', '').replace('"', ''));
    return Array.from(new Set(removedFill));
    
}


export const getSvgExceptions = (icon: IIcon, selectedIconVersion: IconVersion, svgContent: string) => {
    const exceptions: IException[] = [];

    if (!icon.versions.font.includes(selectedIconVersion)) return exceptions;

    if (svgDoesNotContainColor(icon, svgContent)) {
        exceptions.push({ name: 'fill', message: `Fill color ${icon.color} missing from the SVG` });
    }

    if (svgViewBoxNot128(svgContent)) {
        exceptions.push({ name: 'viewBox', message: 'SVG Viewbox is not 128x128' });
    }

    const fillColors = getAllUniqueFillColorsThatAreNotNull(svgContent);
    if (fillColors && fillColors.length > 1) {
        exceptions.push({ name: 'fill', message: `Multiple fill colors present in the SVG  [ ${fillColors.toString()} ]` });
    }

    return exceptions;

}
