import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Space} from '@/types/space';

type SpacesState = {
    spaces: Space[];
}

const initialState: SpacesState = {
    spaces: []
}

const spacesSlice = createSlice({
    name: 'spaces',
    initialState,
    reducers: {
        spaceAdded: (state, action: PayloadAction<Space>) => {
            state.spaces.push(action.payload);
        }
    }
});

export const { spaceAdded } = spacesSlice.actions;
export default spacesSlice.reducer;