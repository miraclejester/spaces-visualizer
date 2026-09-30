import {AppMode} from '@/types/space';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type UIState = {
    mode: AppMode,
    activeSpaceId: string | null;
}

const initialState: UIState = {
    mode: "spaces",
    activeSpaceId: null
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        spacesOpened: (state) => {
            state.mode = "spaces";
        },
        visualizerOpened: (state, action: PayloadAction<string>) => {
            state.mode = "visualizer";
        },
        activeSpaceSet: (state, action: PayloadAction<string>) => {
            state.activeSpaceId = action.payload;
        }
    }
});

export const { spacesOpened, visualizerOpened, activeSpaceSet } = uiSlice.actions;

export default uiSlice.reducer;