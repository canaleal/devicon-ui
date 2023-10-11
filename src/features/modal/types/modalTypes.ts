export type CodeBlockTypes = "Link" | "<img> Tag" | "SVG" | "<i> Tag";
export type IconSize = 'X-Small' | 'Small' | 'Medium' | 'Large' | 'X-Large'
export interface IIconSize {
    name: IconSize;
    height: number;
    width: number;
}

export const iconSizeOptions: IIconSize[] = [
    { name: 'X-Small', height: 32, width: 32 },
    { name: 'Small', height: 64, width: 64 },
    { name: 'Medium', height: 128, width: 128 },
    { name: 'Large', height: 256, width: 256 },
    { name: 'X-Large', height: 384, width: 384 },
]

export const codeBlockTypeList: CodeBlockTypes[] = ["Link", "SVG", "<img> Tag", "<i> Tag"];