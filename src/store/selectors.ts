import {RootState} from '@/store/store';

export const selectSpaces = (s: RootState) => s.spaces.spaces;

export const selectActiveSpace = (s: RootState) =>
    s.spaces.spaces.find((sp) => sp.id === s.ui.activeSpaceId
);