import { IIcon, IconVersion } from "../types";

export const filterIconsByName = (icons: IIcon[], search: string): IIcon[] => {
    return icons.filter(icon => {
        const names = [icon.name, ...(icon.altnames || [])];
        return names.some(name => name.toLowerCase().includes(search.toLowerCase()));
    })
}

export const filterIconsByVersion = (icons: IIcon[], version: IconVersion): IIcon[] => {
    return icons.filter(icon => icon.versions.svg.includes(version));
}