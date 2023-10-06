import { IIconFilter, IconVersion } from "../types";

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