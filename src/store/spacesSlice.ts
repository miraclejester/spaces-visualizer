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
        },
        spaceDuplicated: (state, action: PayloadAction<{ sourceId: number, newId: number }>) => {
            const index = state.spaces.findIndex((sp) => sp.id === action.payload.sourceId);
            if (index === -1) return;
            state.spaces.splice(index + 1, 0, { ...state.spaces[index], id: action.payload.newId });
        }
    }
});

export const { spaceAdded, spaceDuplicated } = spacesSlice.actions;
export default spacesSlice.reducer;