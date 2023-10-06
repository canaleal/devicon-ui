import { CodeBlockTypes, IIcon, IIconSize } from "../types";

const fetchIconSVG = async (iconUrl:string) => {
    const response = await fetch(iconUrl);
    return response.text();
}

const adjustSVGAttributes = (svgContent: string, iconSize: IIconSize) => {
    let adjustedSVG = svgContent;

    // Replace or add width and height attributes in the SVG content
    if(adjustedSVG.includes("width=")){
        adjustedSVG = adjustedSVG.replace(/width="[^"]*"/, `width="${iconSize.width}"`);
    } else {
        adjustedSVG = adjustedSVG.replace('<svg', `<svg width="${iconSize.width}"`);
    }
    if(adjustedSVG.includes("height=")){
        adjustedSVG = adjustedSVG.replace(/height="[^"]*"/, `height="${iconSize.height}"`);
    } else {
        adjustedSVG = adjustedSVG.replace('<svg', `<svg height="${iconSize.height}"`);
    }

    return adjustedSVG;
}

export const createIconCodeBlockText = async (
    icon: IIcon, 
    iconSize: IIconSize, 
    iconUrl: string, 
    selectedOption: CodeBlockTypes
) => {
    let text = "";
    switch (selectedOption) {
        case "Link":
            text = iconUrl;
            break;
        case "Img Tag":
            text = `<img src="${iconUrl}" alt="${icon.name}" height="${iconSize.height}" width="${iconSize.width}" />`;
            break;
        case "SVG": {
            const svg = await fetchIconSVG(iconUrl);
            text = adjustSVGAttributes(svg, iconSize);
            break;
        }
    }
    return text;
}