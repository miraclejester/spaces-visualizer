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
            state.spaces.splice(index + 1, 0, { ...state.spaces[index], id: action.payload.newId, favorite: false });
        },
        spaceFavoriteToggled: (state, action: PayloadAction<number>) => {
            const space = state.spaces.find((sp) => sp.id === action.payload);
            if (space) space.favorite = !space.favorite;
        }
    }
});

export const { spaceAdded, spaceDuplicated, spaceFavoriteToggled } = spacesSlice.actions;
export default spacesSlice.reducer;