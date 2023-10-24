import { IIcon, IconVersion } from "../../../../types";
import { FilterType, IIconFilter, IIconFilterGroup } from "../types";

const FilterMapRecord: Record<FilterType, string> = {
    versions: 'versions.svg',
    color: 'color',
    tags: 'tags',
    alias: 'alias',
    name: 'name'
};

const getItemsFromPath = (icons: IIcon, path: string): string[] => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const items = path.split('.').reduce((acc: any, curr: string) => acc[curr], icons);
    return items;
}

export const populateIconFilters = (icons: IIcon[], filterGroup: IIconFilterGroup) => {
    const itemsPath = FilterMapRecord[filterGroup.filterType];
    filterGroup.filters.forEach(filter => {
        filter.numberOfIcons = 0;
    });

    icons.forEach(icon => {
        const items: string[] = getItemsFromPath(icon, itemsPath);
        items.forEach(item => {
            const category = filterGroup.filters.find(category => category.filterName === item);
            if (category) {
                category.numberOfIcons++;
            } else {
                filterGroup.filters.push({ filterName: item as IconVersion, numberOfIcons: 1, isSelected: false });
            }
        });
    });

    filterGroup.filters.sort((a, b) => b.numberOfIcons - a.numberOfIcons);
    return filterGroup;
};

const FilterFunctions: Record<FilterType, (icon: IIcon, criterion: string | IconVersion) => boolean> = {
    name: (icon, name) => [icon.name, ...(icon.altnames ?? [])].some(n => n.toLowerCase().includes(name as string)),
    versions: (icon, version) => icon.versions.svg.includes(version as IconVersion),
    tags: (icon, tag) => icon.tags.includes(tag as string),
    color: () => true, // Placeholder function, update as required
    alias: () => true  // Placeholder function, update as required
};

export const filterIcons = (icons: IIcon[], filterType: FilterType, criterion: string | IconVersion): IIcon[] => {
    return icons.filter(icon => FilterFunctions[filterType](icon, criterion));
}

export const updateFilter = (filterGroup: IIconFilterGroup, filter: IIconFilter) => {
    const tempFilterGroup = { ...filterGroup };
    const filterIndex = tempFilterGroup.filters.findIndex(item => item.filterName === filter.filterName);
    if (filterIndex === -1) return filterGroup;
    tempFilterGroup.filters[filterIndex].isSelected = !filter.isSelected;
    return tempFilterGroup;
}
