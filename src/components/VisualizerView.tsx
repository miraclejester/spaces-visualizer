import {useAppSelector} from '@/store/hooks';
import {Space} from '@/types/space';
import {selectActiveSpace} from '@/store/selectors';
import {Toolbar} from '@/components/Toolbar';
import {SpaceImageFrame} from '@/components/SpaceImageFrame';

export function VisualizerView() {
    const space: Space | undefined = useAppSelector(selectActiveSpace);
    if (!space) {
        return <div className="fixed inset-0 bg-neutral-900" />
    }
    return (
        <div className="fixed inset-0">
            <SpaceImageFrame space={space} borderRadius={0} priority className="absolute inset-0" />
            <Toolbar />
        </div>
    )
}
