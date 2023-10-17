import { IIcon, IconVersion } from "../../../types";
import { IIconFilter } from "../types/filterTypes";

export const populateIconFilters = (icons: IIcon[], filters: IIconFilter[], attribute: 'versions.svg' | 'tags') => {
    filters.forEach((filter: IIconFilter) => {
        filter.numberOfIcons = 0;
    });

    icons.forEach((icon: IIcon) => {
        const items: string[] = attribute === 'versions.svg' ? icon.versions.svg : icon.tags;
        items.forEach((item: string) => {
            const category = filters.find(category => category.filterName === item);
            if (category) {
                category.numberOfIcons++;
            } else {
                filters.push({ filterName: item as IconVersion, numberOfIcons: 1, isSelected: false });
            }
        });
    });

    if (attribute === 'tags') {
        filters.sort((a, b) => b.numberOfIcons - a.numberOfIcons);
    }
    return filters;
};


export const filterIconsByName = (icons: IIcon[], search: string): IIcon[] => {
    return icons.filter(icon => {
        const names = [icon.name, ...(icon.altnames || [])];
        return names.some(name => name.toLowerCase().includes(search.toLowerCase()));
    });
}

export const filterIconsByVersion = (icons: IIcon[], version: IconVersion): IIcon[] => {
    return icons.filter(icon => icon.versions.svg.includes(version));
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
