export type CodeBlockTypes = "Link" | "<img> Tag" | "SVG" | "<i> Tag" | 'React';
export type IconSize = 'X-Small' | 'Small' | 'Medium' | 'Large' | 'X-Large'
export interface IIconSize {
    name: IconSize;
    height: number;
    width: number;
}

export const ICON_SIZE_OPTIONS: IIconSize[] = [
    { name: 'X-Small', height: 32, width: 32 },
    { name: 'Small', height: 64, width: 64 },
    { name: 'Medium', height: 128, width: 128 },
    { name: 'Large', height: 256, width: 256 },
    { name: 'X-Large', height: 384, width: 384 },
]

export const CODE_BLOCK_TYPE_LIST: CodeBlockTypes[] = ["Link", "SVG", "<img> Tag", "<i> Tag"];
export const INIT_ICON_SIZE = ICON_SIZE_OPTIONS[2];