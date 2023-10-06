import { IIconFilter, IIcon, IconVersion } from "../types";

export const getIconVersionFilters = (icons: IIcon[], filters: IIconFilter[]) => {
    // reset the number of icons for each filter
    filters.forEach((filter: IIconFilter) => {
        filter.numberOfIcons = 0;
    });

    icons.forEach((icon: IIcon) => {
        const items: string[] = icon.versions.svg;
        items.forEach((item: string) => {
            const category = filters.find(category => category.filterNme === item);
            if (category) {
                category.numberOfIcons++;
            } else {
                filters.push({ filterNme: item as IconVersion, numberOfIcons: 1, isSelected: false });
            }
        });
    });

    return filters;
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
