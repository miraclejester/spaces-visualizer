"use client";

import {ColumnsIcon, ShareNetworkIcon, SignOutIcon} from '@phosphor-icons/react';
import {ToolbarButton} from '@/components/ToolbarButton';
import {useAppDispatch} from '@/store/hooks';
import {spacesOpened} from '@/store/uiSlice';

export function Toolbar() {
    const dispatch = useAppDispatch();

    return (
        <nav
            className="fixed left-1/2 top-0 z-10 flex h-14 w-88 -translate-x-1/2 items-center justify-center gap-1.5 rounded-b-xl bg-neutral-600/70 px-2 backdrop-blur-sm"
        >
            <ToolbarButton icon={SignOutIcon} label="Exit" />
            <ToolbarButton icon={ColumnsIcon} label="My spaces" onClick={() => dispatch(spacesOpened())} />
            <ToolbarButton icon={ShareNetworkIcon} label="Share" />
        </nav>
    );
}
