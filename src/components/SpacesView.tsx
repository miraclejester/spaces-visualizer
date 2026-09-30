import {useEffect, useRef, useState} from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import {motion} from 'framer-motion';
import {PlusIcon} from '@phosphor-icons/react';
import clsx from 'clsx';
import {useAppDispatch, useAppSelector} from '@/store/hooks';
import {selectSpaces} from '@/store/selectors';
import {visualizerOpened} from '@/store/uiSlice';
import {spaceAdded, spaceDuplicated, spaceFavoriteToggled} from '@/store/spacesSlice';
import {getRandomSpace} from '@/lib/dataAccess';
import {SpaceCard} from '@/components/SpaceCard';
import {FADE_AROUND_ZOOM, SCALE_IN_NEW} from '@/lib/motion';
import {useIsSwiping} from '@/lib/useIsSwiping';

const SLIDE_WIDTH = "min(80vw, calc((100vh - 220px) * 1.5))";

export function SpacesView() {
    const dispatch = useAppDispatch();
    const spaces = useAppSelector(selectSpaces);
    const activeSpaceId = useAppSelector((state) => state.ui.activeSpaceId);
    const startIndex = Math.max(0, spaces.findIndex((sp) => sp.id === activeSpaceId));

    const [emblaRef, emblaApi] = useEmblaCarousel({ align: "center", containScroll: false, startIndex });
    const isSwiping = useIsSwiping(emblaApi);
    const initialOffset = `translate3d(calc((100% - ${SLIDE_WIDTH}) / 2 - ${startIndex} * ${SLIDE_WIDTH}), 0, 0)`;

    const [isAdding, setIsAdding] = useState(false);
    const scrollToSpaceId = useRef<number | null>(null);
    const [addedSpaceId, setAddedSpaceId] = useState<number | null>(null);
    
    useEffect(() => {
        if (!emblaApi) return;
        const onSlidesChanged = () => {
            const index = emblaApi.slideNodes().findIndex((node) => node.dataset.spaceId === String(scrollToSpaceId.current));
            if (index === -1) return;
            scrollToSpaceId.current = null;
            emblaApi.scrollTo(index);
        };
        emblaApi.on("slidesChanged", onSlidesChanged);
        return () => {
            emblaApi.off("slidesChanged", onSlidesChanged);
        };
    }, [emblaApi]);

    const nextSpaceId = () => Math.max(0, ...spaces.map((sp) => sp.id)) + 1;

    /** Marks a space that's about to be added so it scales in and gets scrolled to */
    const revealNewSpace = (id: number) => {
        scrollToSpaceId.current = id;
        setAddedSpaceId(id);
    };

    const addSpace = async () => {
        setIsAdding(true);
        try {
            const space = await getRandomSpace(nextSpaceId());
            revealNewSpace(space.id);
            dispatch(spaceAdded(space));
        } catch (e) {
            console.error(e);
        } finally {
            setIsAdding(false);
        }
    };

    const duplicateSpace = (sourceId: number) => {
        const newId = nextSpaceId();
        revealNewSpace(newId);
        dispatch(spaceDuplicated({ sourceId, newId }));
    };

    return (
        <main className="fixed inset-0 flex flex-col">
            <motion.div {...FADE_AROUND_ZOOM} animate={{ opacity: 1 }} className="absolute inset-0 bg-[#4a525c]" />

            <div ref={emblaRef} className="relative flex-1 overflow-hidden pt-20">
                <div className="flex" style={{ transform: initialOffset }}>
                    {spaces.map((space) => (
                        <motion.div
                            key={space.id}
                            data-space-id={space.id}
                            {...FADE_AROUND_ZOOM}
                            initial={space.id === activeSpaceId ? false : FADE_AROUND_ZOOM.initial}
                            {...(space.id === addedSpaceId && SCALE_IN_NEW)}
                            className="min-w-0 shrink-0 grow-0 px-7"
                            style={{ flexBasis: SLIDE_WIDTH }}
                        >
                            <SpaceCard
                                space={space}
                                onOpen={() => dispatch(visualizerOpened(space.id))}
                                onDuplicate={() => duplicateSpace(space.id)}
                                onToggleFavorite={() => dispatch(spaceFavoriteToggled(space.id))}
                                isSwiping={isSwiping}
                            />
                        </motion.div>
                    ))}
                    <motion.div
                        {...FADE_AROUND_ZOOM}
                        className="flex min-w-0 shrink-0 grow-0 basis-40 items-center justify-center"
                        style={{ height: `calc((${SLIDE_WIDTH} - 3.5rem) / 1.5)` }}
                    >
                        <button
                            type="button"
                            onClick={addSpace}
                            disabled={isAdding}
                            className={clsx(
                                "rounded-full p-4 text-neutral-400 transition-[color,transform] duration-200 ease-out hover:rotate-90 hover:text-white active:scale-90 focus-visible:outline-2 focus-visible:outline-white",
                                isAdding && "animate-pulse cursor-wait"
                            )}
                        >
                            <PlusIcon size={48} weight="light" />
                        </button>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
