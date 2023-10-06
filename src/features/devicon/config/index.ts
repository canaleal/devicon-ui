import { CodeBlockTypes, IIconFilter, IIconSize, IconVersion } from "../types";

export const iconVersionMap: Record<IconVersion, string> = {
    'original': 'fa-solid fa-square',
    'original-wordmark': 'fa-solid fa-square',
    'plain': 'fa-regular fa-square',
    'plain-wordmark': 'fa-regular fa-square',
    'line': 'fa-solid fa-wave-square',
    'line-wordmark': 'fa-solid fa-wave-square',
}

export const initialIconVersionFilters: IIconFilter[] = [
    { filterNme: 'original', numberOfIcons: 0, isSelected: false },
    { filterNme: 'original-wordmark', numberOfIcons: 0, isSelected: false },
    { filterNme: 'plain', numberOfIcons: 0, isSelected: false },
    { filterNme: 'plain-wordmark', numberOfIcons: 0, isSelected: false },
    { filterNme: 'line', numberOfIcons: 0, isSelected: false },
    { filterNme: 'line-wordmark', numberOfIcons: 0, isSelected: false },
]

export const iconSizeOptions: IIconSize[] = [
    { name: 'X-Small', height: 32, width: 32 },
    { name: 'Small', height: 64, width: 64 },
    { name: 'Medium', height: 128, width: 128 },
    { name: 'Large', height: 256, width: 256 },
    { name: 'X-Large', height: 384, width: 384 },
]

export const codeBlockTypeList: CodeBlockTypes[] = ["Link", "Img Tag", "SVG"];