import Image from 'next/image';
import {useAppSelector} from '@/store/hooks';
import {Space} from '@/types/space';
import {selectActiveSpace} from '@/store/selectors';
import {Toolbar} from '@/components/Toolbar';

export function VisualizerView() {
    const space: Space | undefined = useAppSelector(selectActiveSpace);
    if (!space) {
        return <div className="fixed inset-0 bg-neutral-900" />
    }
    return (
        <>
            <Image src={space.image.imageUrl} alt={space.title} fill priority className="object-cover"/>
            <Toolbar />
        </>
    )
}