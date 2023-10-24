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


export const useFilterGroups = (icons: IIcon[], initialFilterGroups: IIconFilterGroup[] = INIT_FILTER_GROUPS) => {
    const [filterGroups, setFilterGroups] = useState<IIconFilterGroup[]>(initialFilterGroups);

    useEffect(() => {
        if (!icons || icons.length === 0) return;
        setFilterGroups(prevGroups => prevGroups.map(group => populateIconFilters(icons, group)));
    }, [icons]);
    return { filterGroups, setFilterGroups };
};



export const useFilteredIcons = (icons: IIcon[], filterGroups: IIconFilterGroup[], searchTerm: string) => {
    const [filteredIcons, setFilteredIcons] = useState<IIcon[]>(icons);

    useEffect(() => {
        let filtered = searchTerm ? filterIcons(icons, 'name', searchTerm) : icons;
        filterGroups.forEach(group => {
            group.filters.forEach(filter => {
                if (filter.isSelected) {
                    filtered = filterIcons(filtered, group.filterType, filter.filterName as IconVersion);
                }
            });
        });
        setFilteredIcons(filtered);
    }, [icons, filterGroups, searchTerm]);

    return filteredIcons;
};
