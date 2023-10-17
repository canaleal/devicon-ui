import { IIcon, IconVersion } from "../../../types";
import { IIconFilter } from "../types/filterTypes";

export const populateIconFilters = (icons: IIcon[], filters: IIconFilter[], attribute: 'versions.svg' | 'tags') => {
    // Create a map to store the counts of each filter
    const filterCounts: { [key: string]: number } = {};

    // Iterate over icons to count filter occurrences
    icons.forEach((icon: IIcon) => {
        const items: string[] = attribute === 'versions.svg' ? icon.versions.svg : icon.tags;
        items.forEach((item: string) => {
            filterCounts[item] = (filterCounts[item] || 0) + 1;
        });
    });

    // Update or add filters based on the counts
    filters.forEach((filter: IIconFilter) => {
        filter.numberOfIcons = filterCounts[filter.filterName] || 0;
    });

    // Add any new filters that don't exist in the initial list
    icons.forEach((icon: IIcon) => {
        const items: string[] = attribute === 'versions.svg' ? icon.versions.svg : icon.tags;
        items.forEach((item: string) => {
            if (!filters.some((filter) => filter.filterName === item)) {
                filters.push({ filterName: item as IconVersion, numberOfIcons: 1, isSelected: false });
            }
        });
    });

    // Sort filters for 'tags' attribute
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
