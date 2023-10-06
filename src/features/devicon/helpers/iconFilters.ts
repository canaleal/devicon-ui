import { IIconFilter, IIcon, IconVersion } from "../types";

export const getIconVersionFilters = (icons: IIcon[], filters: IIconFilter[]) => {
    filters.forEach((filter: IIconFilter) => {
        filter.numberOfIcons = 0;
    });

    icons.forEach((icon: IIcon) => {
        const items: string[] = icon.versions.svg;
        items.forEach((item: string) => {
            const category = filters.find(category => category.filterName === item);
            if (category) {
                category.numberOfIcons++;
            } else {
                filters.push({ filterName: item as IconVersion, numberOfIcons: 1, isSelected: false });
            }
        });
    });

    return filters;
}

export const getIconTagFilters = (icons: IIcon[], filters: IIconFilter[]) => {
    filters.forEach((filter: IIconFilter) => {
        filter.numberOfIcons = 0;
    });
    icons.forEach((icon: IIcon) => {
        const items: string[] = icon.tags;
        items.forEach((item: string) => {
            const category = filters.find(category => category.filterName === item);
            if (category) {
                category.numberOfIcons++;
            } else {
                filters.push({ filterName: item, numberOfIcons: 1, isSelected: false });
            }
        });
    });

    // SORT BY NUMBER OF ICONS
    filters.sort((a, b) => b.numberOfIcons - a.numberOfIcons);

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

export const filterIconsByTag = (icons: IIcon[], tag: string): IIcon[] => {
    return icons.filter(icon => icon.tags.includes(tag));
}

export const updateFilters = (filters: IIconFilter[], category: IIconFilter) => {
    const updatedCategories = [...filters];
    const index = updatedCategories.findIndex((c) => c.filterName === category.filterName);
    updatedCategories[index].isSelected = !updatedCategories[index].isSelected;
    return updatedCategories;
}
