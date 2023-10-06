import { CodeBlockTypes, IIcon, IIconSize, IconVersion } from "../types";

const fetchIconSVG = async (iconUrl: string) => {
    const response = await fetch(iconUrl);
    return response.text();
};

const adjustSVGAttributes = (svgContent: string, iconSize: IIconSize) => {
    const replaceOrAddAttribute = (attr: "width" | "height") => {
        const pattern = new RegExp(`${attr}="[^"]*"`);
        const replacement = `${attr}="${iconSize[attr]}"`;
        if (svgContent.includes(`${attr}=`)) {
            return svgContent.replace(pattern, replacement);
        } else {
            return svgContent.replace('<svg', `<svg ${replacement}`);
        }
    };

    return ["width", "height"].reduce(
        (_acc, attr) => replaceOrAddAttribute(attr as "width" | "height"),
        svgContent
    );
};

export const createIconCodeBlockText = async (
    icon: IIcon,
    iconSize: IIconSize,
    iconUrl: string,
    selectedVersion: IconVersion,
    selectedOption: CodeBlockTypes
) => {
    const outputFormats = {
        "Link": () => iconUrl,
        "<img> Tag": () => `<img src="${iconUrl}" alt="${icon.name}" height="${iconSize.height}" width="${iconSize.width}" />`,
        "SVG": async () => adjustSVGAttributes(await fetchIconSVG(iconUrl), iconSize),
        "<i> Tag": () => `<i class="devicon-${icon.name}-${selectedVersion} colored"></i>`
    };

    return outputFormats[selectedOption] ? await outputFormats[selectedOption]() : "";
};
