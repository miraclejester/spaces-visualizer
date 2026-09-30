import {combineReducers, configureStore} from '@reduxjs/toolkit';
import spacesReducer from '@/store/spacesSlice';
import uiReducer from '@/store/uiSlice';

const rootReducer = combineReducers({ spaces: spacesReducer, ui: uiReducer })
export type RootState = ReturnType<typeof rootReducer>

export const makeStore = (preloadedState?: Partial<RootState>) =>
    configureStore({ reducer: rootReducer, preloadedState });

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];