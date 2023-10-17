import { IIcon, IconVersion } from "../../../types";
import { IIconSize, CodeBlockTypes } from "../types/modalTypes";

const fetchIconSVG = async (iconUrl: string) => {
    const response = await fetch(iconUrl);
    return response.text();
};

const adjustSVGAttributes = (svgContent: string, iconSize: IIconSize) => {
    const replaceOrAddAttribute = (currentSvgContent: string, attr: "width" | "height"): string => {
        const pattern = new RegExp(`${attr}="[^"]*"`);
        const replacement = `${attr}="${iconSize[attr]}"`;
        if (currentSvgContent.includes(`${attr}=`)) {
            return currentSvgContent.replace(pattern, replacement);
        } else {
            return currentSvgContent.replace('<svg', `<svg ${replacement}`);
        }
    };

    return ["width", "height"].reduce(
        (acc, attr) => replaceOrAddAttribute(acc, attr as "width" | "height"),
        svgContent
    );
};


const createReactJSXIconCodeBlockText = (
    icon: IIcon,
    iconSize: IIconSize,
    selectedVersion: IconVersion,
    svgContent: string
) => {
    const getAttribute = (content: string, attr: string) => {
        const match = content.match(new RegExp(`${attr}="([^"]+)"`));
        return match ? match[1] : null;
    };

    // Extract the viewBox and fill attributes from the SVG content
    const viewBox = getAttribute(svgContent, "viewBox") || "0 0 128 128";
    const fill = getAttribute(svgContent, "fill") || "none";

    // Extracting the inner content of the SVG
    const innerSVGContent = svgContent
        .replace(/^<svg[^>]*>/i, "")
        .replace(/<\/svg>$/i, "");

    const componentName = `${icon.name}Component`;
    
    const jsx = `import * as React from "react";
    const ${componentName} = (props) => (
        <svg
            width={${iconSize.width}}
            height={${iconSize.height}}
            viewBox="${viewBox}"
            fill="${fill}"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
        ${innerSVGContent}
        </svg>
    );
    export default ${componentName};
    `;

    return jsx;
};


export const createIconCodeBlockText = async (
    icon: IIcon,
    iconSize: IIconSize,
    iconUrl: string,
    selectedVersion: IconVersion,
    selectedOption: CodeBlockTypes
) => {
    const outputFormats: Record<CodeBlockTypes, () => string | Promise<string>> = {
        "Link": () => iconUrl,
        "<img> Tag": () => `<img src="${iconUrl}" alt="${icon.name}" height="${iconSize.height}" width="${iconSize.width}" />`,
        "SVG": async () => adjustSVGAttributes(await fetchIconSVG(iconUrl), iconSize),
        "<i> Tag": () => `<i class="devicon-${icon.name}-${selectedVersion} colored"></i>`,
        "React": async () => createReactJSXIconCodeBlockText(icon, iconSize, selectedVersion, await fetchIconSVG(iconUrl))
    };

    return outputFormats[selectedOption] ? await outputFormats[selectedOption]() : "";
};
