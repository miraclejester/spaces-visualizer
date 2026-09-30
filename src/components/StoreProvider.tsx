"use client";

import {AppStore, makeStore, RootState} from '@/store/store';
import {ReactNode, useRef} from 'react';
import {Provider} from 'react-redux';

type StoreProviderProps = {
    preloaded: Partial<RootState>,
    children: ReactNode
}

export function StoreProvider({ preloaded, children }: StoreProviderProps) {
    const storeRef = useRef<AppStore | null>(null);
    if (!storeRef.current) {
        storeRef.current = makeStore(preloaded);
    }
    return <Provider store={storeRef.current}>{children}</Provider>
}