import { useState, useEffect } from 'react';
import { IIcon, IconVersion } from '../../../../types';
import { IIconFilterGroup } from '../types';
import { filterIcons, populateIconFilters } from '../helpers';

const INIT_FILTER_GROUPS: IIconFilterGroup[] = [
    {
        groupName: 'Versions',
        filterType: 'versions',
        filters: [],
    },
    {
        groupName: 'Tags',
        filterType: 'tags',
        filters: [],
    }
]


export const useFindFilterGroups = (icons: IIcon[], initialFilterGroups: IIconFilterGroup[] = INIT_FILTER_GROUPS) => {
    const [filterGroups, setFilterGroups] = useState<IIconFilterGroup[]>(initialFilterGroups);
    useEffect(() => {
        setFilterGroups(prevGroups => prevGroups.map(group => populateIconFilters(icons, group)));
    }, [icons]);
    return { filterGroups, setFilterGroups };
};


export const useFilterGroups = (searchedIcons: IIcon[], filterGroups: IIconFilterGroup[]) => {
    const [filteredIcons, setFilteredIcons] = useState<IIcon[]>(searchedIcons);
    useEffect(() => {
        let filtered = searchedIcons;
        filterGroups.forEach(group => {
            group.filters.forEach(filter => {
                if (filter.isSelected) {
                    filtered = filterIcons(filtered, group.filterType, filter.filterName as IconVersion);
                }
            });
        });
        setFilteredIcons(filtered);
    }, [searchedIcons, filterGroups]);
    return filteredIcons;
};


export const useSearchFilter = (icons: IIcon[], searchTerm: string) => {
    const [filteredIcons, setFilteredIcons] = useState<IIcon[]>(icons);
    useEffect(() => {
        const filtered = searchTerm ? filterIcons(icons, 'name', searchTerm) : icons;
        setFilteredIcons(filtered);
    }, [icons, searchTerm]);

    return filteredIcons;
}