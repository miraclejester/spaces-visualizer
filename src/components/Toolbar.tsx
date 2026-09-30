"use client";

import {ColumnsIcon, ShareNetworkIcon, SignOutIcon} from '@phosphor-icons/react';
import {motion} from 'framer-motion';
import {FADE_AROUND_ZOOM} from '@/lib/motion';
import {ToolbarButton} from '@/components/ToolbarButton';
import {useAppDispatch} from '@/store/hooks';
import {spacesOpened} from '@/store/uiSlice';

export function Toolbar() {
    const dispatch = useAppDispatch();

    return (
        <motion.nav
            {...FADE_AROUND_ZOOM}
            className="fixed left-1/2 top-0 z-10 flex h-14 w-88 -translate-x-1/2 items-center justify-center gap-2 rounded-b-xl bg-[#303438]/55 px-2 backdrop-blur-sm"
        >
            <ToolbarButton icon={SignOutIcon} label="Exit" className="w-21.5" />
            <ToolbarButton icon={ColumnsIcon} label="My spaces" className="w-32.25" onClick={() => dispatch(spacesOpened())} />
            <ToolbarButton icon={ShareNetworkIcon} label="Share" className="w-26.25" />
        </motion.nav>
    );
}
