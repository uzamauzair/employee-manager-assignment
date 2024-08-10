import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ViewState {
    isGridView: boolean;
}

const initialState: ViewState = {
    isGridView: false,
};

const viewSlice = createSlice({
    name: 'view',
    initialState,
    reducers: {
        toggleView: (state) => {
            state.isGridView = !state.isGridView;
        },
        setGridView: (state, action: PayloadAction<boolean>) => {
            state.isGridView = action.payload;
        },
    },
});

export const { toggleView, setGridView } = viewSlice.actions;
export default viewSlice.reducer;
