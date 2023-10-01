
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IIcon } from './types';
interface IIconSliceState {
    selectedIcon: IIcon | null;
}

const initialState: IIconSliceState = {
    selectedIcon: null,
}

const iconSlice = createSlice({
    name: 'icon',
    initialState,
    reducers: {
        selectIcon: (state, action: PayloadAction<IIcon>) => {
            state.selectedIcon = action.payload
        },
        resetSelectedIcon : (state) => {
            state.selectedIcon = null
        },
        clearSelectedIcon: (state) => {
            state.selectedIcon = null
        },
    },
})

export const { selectIcon, resetSelectedIcon, clearSelectedIcon } = iconSlice.actions
export default iconSlice