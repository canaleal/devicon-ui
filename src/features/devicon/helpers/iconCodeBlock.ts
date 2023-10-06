import { CodeBlockTypes, IIcon } from "../types";

const fetchIconSVG = async (iconUrl:string) => {
    const response = await fetch(iconUrl);
    return response.text();
}

export const createIconCodeBlockText = async (icon: IIcon, iconUrl: string, selectedOption: CodeBlockTypes) =>{
    let text = "";
    switch (selectedOption) {
        case "SVG Link":
            text = iconUrl;
            break;
        case "Img Tag":
            text = `<img src="${iconUrl}" alt="${icon.name}" />`;
            break;
        case "SVG": {
            const svg = await fetchIconSVG(iconUrl);
            text = svg;
            break;
        }
    }
    return text;
}