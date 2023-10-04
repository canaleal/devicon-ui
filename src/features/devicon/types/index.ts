export type Version = 'plain' | 'line' | 'original' | 'plain-wordmark' | 'line-wordmark' | 'original-wordmark';
export type CodeTypes = "SVG Link" | "Img Tag" | "SVG"
export const codeTypesList: CodeTypes[] = ['SVG Link', 'Img Tag', "SVG"]

// create a map of the version name for the font icon 
export const versionIconMap: Record<Version, string> = {
    'original': 'fa-solid fa-square',
    'original-wordmark': 'fa-solid fa-square',
    'plain': 'fa-regular fa-square',
    'plain-wordmark': 'fa-regular fa-square',
    'line': 'fa-solid fa-wave-square',
    'line-wordmark': 'fa-solid fa-wave-square',
}

export type DeviconBranch = 'master' | 'develop'

export interface IIcon {
    name: string;
    altnames: string[];
    tags: string[];
    versions: {
        svg: Version[];
        font: Version[];
    };
    color: string;
    aliases: {
        base: string
        alias: string
    }[]
}

export interface ICategory {
    versionName: Version,
    numberOfIcons: number,
    isSelected: boolean
}

export const initialVersionStyle: ICategory[] = [
    { versionName: 'original', numberOfIcons: 0, isSelected: false },
    { versionName: 'original-wordmark', numberOfIcons: 0, isSelected: false },
    { versionName: 'plain', numberOfIcons: 0, isSelected: false },
    { versionName: 'plain-wordmark', numberOfIcons: 0, isSelected: false },
    { versionName: 'line', numberOfIcons: 0, isSelected: false },
    { versionName: 'line-wordmark', numberOfIcons: 0, isSelected: false },
]