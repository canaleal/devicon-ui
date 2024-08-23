import { CODE_BLOCK_OPTIONS, CodeBlockOptionTypes, IIconSettings, INIT_ICON_SIZE } from './types'
import { create } from 'zustand'

interface IIconSettingStore {
  codeText: string
  iconSettings: IIconSettings
  selectedCodeBlockOption: CodeBlockOptionTypes
  codeBlockOptions: CodeBlockOptionTypes[]
  setCodeText: (codeText: string) => void
  setIconSettings: (iconSettings: IIconSettings) => void
  setCodeBlockOptions: (codeBlockOptions: CodeBlockOptionTypes[]) => void
  setSelectedCodeBlockOption: (selectedCodeBlockOption: CodeBlockOptionTypes) => void
}

export const useIconSettingStore = create<IIconSettingStore>((set) => ({
  codeText: '',
  iconSettings: {
    iconUrl: '',
    selectedVersion: 'original',
    selectedIconSize: INIT_ICON_SIZE,
    selectedColor: ''
  },
  codeBlockOptions: CODE_BLOCK_OPTIONS,
  selectedCodeBlockOption: 'LINK',
  setCodeText: (codeText) => set({ codeText }),
  setIconSettings: (iconSettings) => set({ iconSettings }),
  setCodeBlockOptions: (codeBlockOptions) => set({ codeBlockOptions }),
  setSelectedCodeBlockOption: (selectedCodeBlockOption) => set({ selectedCodeBlockOption })
}))
