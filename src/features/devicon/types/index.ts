export type Version = 'plain' | 'line' | 'original' | 'plain-wordmark' | 'line-wordmark' | 'original-wordmark';


export interface IIcon {
    name: string;
    altNames: string[];
    tags: string[];
    versions: {
        svg: Version[];
        font: Version[];
    };
    color: string;
    aliases: string[];
}

export interface IVersion {
    versionType: Version,
    numberOfIcons: number
}