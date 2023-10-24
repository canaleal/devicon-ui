import { useState, useEffect } from 'react';
import { createDeviconJsonUrl } from '../helpers/iconUrl';
import { DeviconBranch, IIcon } from '../types';

export const useFetchIcons = (deviconBranch: DeviconBranch): IIcon[] => {
    const [icons, setIcons] = useState<IIcon[]>([]);

    useEffect(() => {
        const fetchIconsFromBranch = async (): Promise<IIcon[]> => {
            const response = await fetch(createDeviconJsonUrl(deviconBranch));
            return response.json();
        }

        const initializeIconsData = async () => {
            const fetchedIcons = await fetchIconsFromBranch();
            setIcons(fetchedIcons);
        }
        
        initializeIconsData();
    }, [deviconBranch]);

    return icons;
};