import {useEffect, useState} from 'react';
import {EmblaCarouselType} from 'embla-carousel';

const SETTLED_DISTANCE_PX = 2;

export function useIsSwiping(emblaApi: EmblaCarouselType | undefined): boolean {
    const [isSwiping, setIsSwiping] = useState(false);

    useEffect(() => {
        if (!emblaApi) return;
        const update = () => {
            const engine = emblaApi.internalEngine();
            const distanceToTarget = Math.abs(engine.target.get() - engine.location.get());
            setIsSwiping(engine.dragHandler.pointerDown() || distanceToTarget > SETTLED_DISTANCE_PX);
        };
        emblaApi.on("scroll", update).on("pointerUp", update).on("settle", update);
        return () => {
            emblaApi.off("scroll", update).off("pointerUp", update).off("settle", update);
        };
    }, [emblaApi]);

    return isSwiping;
}
