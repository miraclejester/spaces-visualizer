"use client"

import {AppMode} from '@/types/space';
import {useAppSelector} from '@/store/hooks';
import {VisualizerView} from '@/components/VisualizerView';

export function App() {
    const mode: AppMode = useAppSelector((state) => state.ui.mode);
    
    return <VisualizerView />
}