import { create } from 'zustand'
import { DeviconBranch, IIcon } from '../types'
import storage from '../helpers/storage'
import { IFilterGroup } from '../features/dashboard/filters/types'

interface IIconStore {
  icons: IIcon[]
  filteredIcons: IIcon[]
  selectedIcon: IIcon | null
  deviconBranch: DeviconBranch
  filterGroups: IFilterGroup[]
  setIcons: (icons: IIcon[]) => void
  setSelectedIcon: (selectedIcon: IIcon | null) => void
  setDeviconBranch: (deviconBranch: DeviconBranch) => void
  setFilteredIcons: (filteredIcons: IIcon[]) => void
  setFilterGroups: (filterGroups: IFilterGroup[]) => void
}

const useIconStore = create<IIconStore>((set) => ({
  icons: [],
  filteredIcons: [],
  selectedIcon: null,
  deviconBranch: 'develop',
  filterGroups: [],
  setIcons: (icons) => set({ icons }),
  setSelectedIcon: (selectedIcon) => {
    set({ selectedIcon })
  },
  setDeviconBranch: (deviconBranch) => {
    storage.setToken({ ...storage.getToken(), deviconBranch })
    set({ deviconBranch })
  },
  setFilteredIcons: (filteredIcons) =>
    set({
      filteredIcons
    }),
  setFilterGroups: (filterGroups) => set({ filterGroups })
}))

export default useIconStore
