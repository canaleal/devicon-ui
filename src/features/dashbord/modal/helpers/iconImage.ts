import { IIcon, IconVersion } from "../../../../types";

export const createStyleMap = (icon: IIcon, selectedVersion: IconVersion, selectedColor: string, iconUrl: string) => {
    if (!icon.versions.font.includes(selectedVersion)) return null;
    if( icon.color === selectedColor) return null;
    const styleMap = {
        WebkitMaskImage: `url(${iconUrl})`,
        maskImage: `url(${iconUrl})`,
        background: selectedColor
    }
    return styleMap;
}