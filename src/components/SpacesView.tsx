import {useEffect, useRef, useState} from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import {AnimatePresence, motion} from 'framer-motion';
import {CircleNotchIcon, PlusIcon} from '@phosphor-icons/react';
import clsx from 'clsx';
import {useAppDispatch, useAppSelector} from '@/store/hooks';
import {selectSpaces} from '@/store/selectors';
import {visualizerOpened} from '@/store/uiSlice';
import {spaceAdded, spaceDuplicated, spaceFavoriteToggled} from '@/store/spacesSlice';
import {getRandomSpace} from '@/lib/dataAccess';
import {SpaceCard} from '@/components/SpaceCard';
import {SPACE_IMAGE_SIZES} from '@/components/SpaceImageFrame';
import {FADE_AROUND_ZOOM, SCALE_IN_NEW} from '@/lib/motion';
import {useIsSwiping} from '@/lib/useIsSwiping';
import {preloadImage} from '@/lib/preloadImage';

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
    
    const revealNewSpace = (id: number) => {
        scrollToSpaceId.current = id;
        setAddedSpaceId(id);
    };

    const addSpace = async () => {
        setIsAdding(true);
        try {
            const space = await getRandomSpace(nextSpaceId());
            // Keep the + button in its loading state until the photo is ready, so the card never appears blank
            await preloadImage(space.image.imageUrl, SPACE_IMAGE_SIZES);
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

            <div ref={emblaRef} className="relative flex-1 overflow-hidden pt-8 sm:pt-20">
                <div className="flex [--slide-pad:0.5rem] sm:[--slide-pad:1.75rem]" style={{ transform: initialOffset }}>
                    {spaces.map((space) => (
                        <motion.div
                            key={space.id}
                            data-space-id={space.id}
                            {...FADE_AROUND_ZOOM}
                            initial={space.id === activeSpaceId ? false : FADE_AROUND_ZOOM.initial}
                            {...(space.id === addedSpaceId && SCALE_IN_NEW)}
                            className="min-w-0 shrink-0 grow-0 px-(--slide-pad)"
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
                        className="flex min-w-0 shrink-0 grow-0 basis-24 items-center justify-center sm:basis-40"
                        style={{ height: `calc((${SLIDE_WIDTH} - 2 * var(--slide-pad)) / 1.5)` }}
                    >
                        <button
                            type="button"
                            onClick={addSpace}
                            disabled={isAdding}
                            className={clsx(
                                "relative rounded-full p-4 transition-[color,transform] duration-200 ease-out focus-visible:outline-2 focus-visible:outline-white",
                                isAdding
                                    ? "cursor-wait text-white"
                                    : "text-neutral-400 hover:rotate-90 hover:text-white active:scale-90"
                            )}
                        >
                            <AnimatePresence mode="popLayout" initial={false}>
                                <motion.span
                                    key={isAdding ? "loading" : "idle"}
                                    className="flex"
                                    initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                    exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {isAdding
                                        ? <CircleNotchIcon size={48} weight="light" className="animate-spin" />
                                        : <PlusIcon size={48} weight="light" />}
                                </motion.span>
                            </AnimatePresence>
                            <span
                                className={clsx(
                                    "absolute left-1/2 top-full -translate-x-1/2 whitespace-nowrap font-ui text-[11px] font-medium uppercase tracking-[0.5px] text-neutral-300 transition-opacity duration-200",
                                    isAdding ? "opacity-100" : "opacity-0"
                                )}
                            >
                                Loading space
                            </span>
                        </button>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
