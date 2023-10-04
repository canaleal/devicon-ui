import { ICategory, IconVersion } from "../types";

export const iconVersionMap: Record<IconVersion, string> = {
    'original': 'fa-solid fa-square',
    'original-wordmark': 'fa-solid fa-square',
    'plain': 'fa-regular fa-square',
    'plain-wordmark': 'fa-regular fa-square',
    'line': 'fa-solid fa-wave-square',
    'line-wordmark': 'fa-solid fa-wave-square',
}

export const initialIconVersionCategories: ICategory[] = [
    { categoryName: 'original', numberOfIcons: 0, isSelected: false },
    { categoryName: 'original-wordmark', numberOfIcons: 0, isSelected: false },
    { categoryName: 'plain', numberOfIcons: 0, isSelected: false },
    { categoryName: 'plain-wordmark', numberOfIcons: 0, isSelected: false },
    { categoryName: 'line', numberOfIcons: 0, isSelected: false },
    { categoryName: 'line-wordmark', numberOfIcons: 0, isSelected: false },
]