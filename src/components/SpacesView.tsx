import useEmblaCarousel from 'embla-carousel-react';
import {motion} from 'framer-motion';
import {CheckIcon, PlusIcon} from '@phosphor-icons/react';
import {useAppDispatch, useAppSelector} from '@/store/hooks';
import {selectSpaces} from '@/store/selectors';
import {visualizerOpened} from '@/store/uiSlice';
import {ToolbarButton} from '@/components/ToolbarButton';
import {SpaceCard} from '@/components/SpaceCard';
import {FADE_AROUND_ZOOM} from '@/lib/motion';

const SLIDE_WIDTH = "min(80vw, calc((100vh - 220px) * 1.5))";

export function SpacesView() {
    const dispatch = useAppDispatch();
    const spaces = useAppSelector(selectSpaces);
    const activeSpaceId = useAppSelector((state) => state.ui.activeSpaceId);
    const startIndex = Math.max(0, spaces.findIndex((sp) => sp.id === activeSpaceId));

    const [emblaRef] = useEmblaCarousel({ align: "center", containScroll: false, startIndex });
    const initialOffset = `translate3d(calc((100% - ${SLIDE_WIDTH}) / 2 - ${startIndex} * ${SLIDE_WIDTH}), 0, 0)`;

    return (
        <main className="fixed inset-0 flex flex-col">
            <motion.div {...FADE_AROUND_ZOOM} animate={{ opacity: 1 }} className="absolute inset-0 bg-[#4a525c]" />

            <motion.nav {...FADE_AROUND_ZOOM} className="absolute left-1/2 top-0 z-10 -translate-x-1/2 rounded-b-xl bg-neutral-600/70 p-2 backdrop-blur-sm">
                <ToolbarButton icon={CheckIcon} label="Done" onClick={() => dispatch(visualizerOpened(activeSpaceId))} />
            </motion.nav>
            
            <div ref={emblaRef} className="relative flex-1 overflow-hidden pt-20">
                <div className="flex" style={{ transform: initialOffset }}>
                    {spaces.map((space) => (
                        <motion.div
                            key={space.id}
                            {...(space.id === activeSpaceId ? {} : FADE_AROUND_ZOOM)}
                            className="min-w-0 shrink-0 grow-0 px-7"
                            style={{ flexBasis: SLIDE_WIDTH }}
                        >
                            <SpaceCard space={space} onOpen={() => dispatch(visualizerOpened(space.id))} />
                        </motion.div>
                    ))}
                    <motion.div
                        {...FADE_AROUND_ZOOM}
                        className="flex min-w-0 shrink-0 grow-0 basis-40 items-center justify-center"
                        style={{ height: `calc((${SLIDE_WIDTH} - 3.5rem) / 1.5)` }}
                    >
                        <button
                            type="button"
                            className="rounded-full p-4 text-neutral-400 transition-[color,transform] duration-200 ease-out hover:rotate-90 hover:text-white active:scale-90 focus-visible:outline-2 focus-visible:outline-white"
                        >
                            <PlusIcon size={48} weight="light" />
                        </button>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
