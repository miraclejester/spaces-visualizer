import {AppMode} from '@/types/space';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type UIState = {
    mode: AppMode,
    activeSpaceId: number;
}

const initialState: UIState = {
    mode: "spaces",
    activeSpaceId: 0
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        spacesOpened: (state) => {
            state.mode = "spaces";
        },
        visualizerOpened: (state, action: PayloadAction<number>) => {
            state.mode = "visualizer";
            state.activeSpaceId = action.payload;
        },
        activeSpaceSet: (state, action: PayloadAction<number>) => {
            state.activeSpaceId = action.payload;
        }
    }
});

export const { spacesOpened, visualizerOpened, activeSpaceSet } = uiSlice.actions;

export default uiSlice.reducer;