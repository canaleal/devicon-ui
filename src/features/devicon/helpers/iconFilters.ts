import { IIconFilter, IIcon, IconVersion } from "../types";

export const getIconVersionFilters = (icons: IIcon[]) => {
    const categories: IIconFilter[] = [];
    
    icons.forEach((icon: IIcon) => {
        const items: string[] = icon.versions.svg;
        items.forEach((item: string) => {
            const category = categories.find(category => category.categoryName === item);
            if (category) {
                category.numberOfIcons++;
            } else {
                categories.push({ categoryName: item as IconVersion, numberOfIcons: 1, isSelected: false });
            }
        });
    });

    return categories;
}

export const filterIconsByName = (icons: IIcon[], search: string): IIcon[] => {
    return icons.filter(icon => {
        const names = [icon.name, ...(icon.altnames || [])];
        return names.some(name => name.toLowerCase().includes(search.toLowerCase()));
    })
}

export const filterIconsByVersion = (icons: IIcon[], version: IconVersion): IIcon[] => {
    return icons.filter(icon => icon.versions.svg.includes(version as IconVersion));
}
