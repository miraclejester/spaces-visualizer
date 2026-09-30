import {motion} from 'framer-motion';
import clsx from 'clsx';
import {CopyIcon, HeartIcon, ShareNetworkIcon} from '@phosphor-icons/react';
import {Space} from '@/types/space';
import {ToolbarButton} from '@/components/ToolbarButton';
import {SpaceImageFrame} from '@/components/SpaceImageFrame';
import {FADE_AROUND_ZOOM} from '@/lib/motion';

const HIDEABLE = "transition-opacity duration-200";
const HIDDEN = "pointer-events-none opacity-0";

type SpaceCardProps = {
    space: Space;
    onOpen: () => void;
    isSwiping?: boolean;
}

export function SpaceCard({ space, onOpen, isSwiping = false }: SpaceCardProps) {
    return (
        <article className="flex flex-col gap-6">
            <button
                type="button"
                onClick={onOpen}
                className={clsx(
                    "relative aspect-3/2 w-full rounded-3xl shadow-2xl transition-[filter,translate] duration-200 ease-out hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white",
                    isSwiping && "blur-sm"
                )}
            >
                <SpaceImageFrame space={space} borderRadius={24} className="absolute inset-0" />
            </button>

            <motion.div {...FADE_AROUND_ZOOM} className="flex items-center justify-between px-6">
                <div className="flex flex-col gap-1.5 text-neutral-100">
                    <h2 className="text-[11px] font-semibold uppercase tracking-wide">{space.title}</h2>
                    <p className={clsx("flex gap-8 text-[11px] text-neutral-300", HIDEABLE, isSwiping && HIDDEN)}>
                        <span>Floor - {space.floorType}</span>
                        <span>Wall - {space.wallType}</span>
                    </p>
                </div>
                <div className={clsx("flex gap-1.5", HIDEABLE, isSwiping && HIDDEN)}>
                    <ToolbarButton icon={ShareNetworkIcon} label="Share" />
                    <ToolbarButton icon={HeartIcon} label="Favorite" />
                    <ToolbarButton icon={CopyIcon} label="Duplicate" />
                </div>
            </motion.div>
        </article>
    );
}
