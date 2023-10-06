export type IconVersion = 'plain' | 'line' | 'original' | 'plain-wordmark' | 'line-wordmark' | 'original-wordmark';
export type CodeBlockTypes = "Link" | "<img> Tag" | "SVG" | "<i> Tag";
export type DeviconBranch = 'master' | 'develop'

export interface IIcon {
    name: string;
    altnames: string[];
    tags: string[];
    versions: {
        svg: IconVersion[];
        font: IconVersion[];
    };
    color: string;
    aliases: {
        base: string
        alias: string
    }[]
}


export interface IIconFilter {
    filterName: string,
    numberOfIcons: number,
    isSelected: boolean
}

export type IconSize = 'X-Small' | 'Small' | 'Medium' | 'Large' | 'X-Large'
export interface IIconSize {
    name: IconSize;
    height: number;
    width: number;
}