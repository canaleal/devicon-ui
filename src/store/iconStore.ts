
import { create } from 'zustand'
import { DeviconBranch, IIcon } from '../types';
import storage from '../helpers/storage';

interface IIconStore {
    icons: IIcon[]
    filteredIcons: IIcon[]
    selectedIcon: IIcon | null
    deviconBranch: DeviconBranch
    setIcons: (icons: IIcon[]) => void
    setSelectedIcon: (selectedIcon: IIcon | null) => void
    setDeviconBranch: (deviconBranch: DeviconBranch) => void

    setFilteredIcons: (filteredIcons: IIcon[]) => void
   
}

const useIconStore = create<IIconStore>((set) => ({
    icons: [],
    filteredIcons: [],
    selectedIcon: null,
    deviconBranch: 'develop',

    setIcons: (icons) => set({ icons }),
   
    setSelectedIcon: (selectedIcon) => {
        set({ selectedIcon });
    },

    setDeviconBranch: (deviconBranch) => {
        storage.setToken({ ...storage.getToken(), deviconBranch });
        set({ deviconBranch });
    },


    setFilteredIcons: (filteredIcons) => set({
        filteredIcons
    })
}));

export default useIconStore;
