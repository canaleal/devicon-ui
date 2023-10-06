export type IconVersion = 'plain' | 'line' | 'original' | 'plain-wordmark' | 'line-wordmark' | 'original-wordmark';
export type CodeBlockTypes = "SVG Link" | "Img Tag" | "SVG"
export const codeBlockTypesList: CodeBlockTypes[] = ['SVG Link', 'Img Tag', "SVG"]
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
    filterNme: IconVersion,
    numberOfIcons: number,
    isSelected: boolean
}
