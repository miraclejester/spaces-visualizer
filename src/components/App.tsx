"use client"

import {AnimatePresence} from 'framer-motion';
import {AppMode} from '@/types/space';
import {useAppSelector} from '@/store/hooks';
import {VisualizerView} from '@/components/VisualizerView';
import {SpacesView} from '@/components/SpacesView';

export function App() {
    const mode: AppMode = useAppSelector((state) => state.ui.mode);

    return (
        <AnimatePresence initial={false}>
            { mode === "visualizer" ? <VisualizerView key="visualizer" /> : <SpacesView key="spaces" /> }
        </AnimatePresence>
    )
}
