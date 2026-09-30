import {motion} from 'framer-motion';
import clsx from 'clsx';
import {CopyIcon, ShareNetworkIcon} from '@phosphor-icons/react';
import {Space} from '@/types/space';
import {ToolbarButton} from '@/components/ToolbarButton';
import {FavoriteButton} from '@/components/FavoriteButton';
import {SpaceImageFrame} from '@/components/SpaceImageFrame';
import {FADE_AROUND_ZOOM} from '@/lib/motion';

const HIDEABLE = "transition-opacity duration-200";
const HIDDEN = "pointer-events-none opacity-0";
const BUTTON_LABEL = "hidden @md:inline";

type SpaceCardProps = {
    space: Space;
    onOpen: () => void;
    onDuplicate: () => void;
    onToggleFavorite: () => void;
    isSwiping?: boolean;
}

export function SpaceCard({ space, onOpen, onDuplicate, onToggleFavorite, isSwiping = false }: SpaceCardProps) {
    return (
        <article className="@container flex flex-col gap-4 @md:gap-6">
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

            {/* Narrow cards: details stacked, buttons below and icon-only. Wide cards: one row. */}
            <motion.div
                {...FADE_AROUND_ZOOM}
                className="flex flex-col gap-3 px-1 @2xl:flex-row @2xl:items-center @2xl:justify-between @2xl:px-6"
            >
                <div className="flex min-w-0 flex-col gap-1.5 text-neutral-100">
                    <h2 className="truncate text-[11px] font-semibold uppercase tracking-wide">{space.title}</h2>
                    <p className={clsx("flex flex-col gap-0.5 text-[11px] text-neutral-300 @md:flex-row @md:gap-8", HIDEABLE, isSwiping && HIDDEN)}>
                        <span>Floor - {space.floorType}</span>
                        <span>Wall - {space.wallType}</span>
                    </p>
                </div>
                <div className={clsx("flex shrink-0 gap-1.5", HIDEABLE, isSwiping && HIDDEN)}>
                    <ToolbarButton icon={ShareNetworkIcon} label="Share" labelClassName={BUTTON_LABEL} />
                    <FavoriteButton isFavorite={space.favorite} onToggle={onToggleFavorite} labelClassName={BUTTON_LABEL} />
                    <ToolbarButton icon={CopyIcon} label="Duplicate" onClick={onDuplicate} labelClassName={BUTTON_LABEL} />
                </div>
            </motion.div>
        </article>
    );
}
