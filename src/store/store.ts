import {configureStore} from '@reduxjs/toolkit';
import spacesReducer from '@/store/spacesSlice';
import uiReducer from '@/store/uiSlice';

export const store = configureStore({
    reducer: {
        spaces: spacesReducer,
        ui: uiReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch