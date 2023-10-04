export type IconVersion = 'plain' | 'line' | 'original' | 'plain-wordmark' | 'line-wordmark' | 'original-wordmark';
export type CodeTypes = "SVG Link" | "Img Tag" | "SVG"
export const codeTypesList: CodeTypes[] = ['SVG Link', 'Img Tag', "SVG"]

// create a map of the version name for the font icon 


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
    categoryName: IconVersion,
    numberOfIcons: number,
    isSelected: boolean
}
