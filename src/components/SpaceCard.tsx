import Image from 'next/image';
import {CopyIcon, HeartIcon, ShareNetworkIcon} from '@phosphor-icons/react';
import {Space} from '@/types/space';
import {ToolbarButton} from '@/components/ToolbarButton';

type SpaceCardProps = {
    space: Space;
    onOpen: () => void;
}

export function SpaceCard({ space, onOpen }: SpaceCardProps) {
    return (
        <article className="flex flex-col gap-6">
            <button
                type="button"
                onClick={onOpen}
                className="relative aspect-3/2 w-full overflow-hidden rounded-3xl shadow-2xl transition-transform duration-200 ease-out hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
                <Image src={space.image.imageUrl} alt={space.title} fill sizes="80vw" className="object-cover" />
            </button>

            <div className="flex items-center justify-between px-6">
                <div className="flex flex-col gap-1.5 text-neutral-100">
                    <h2 className="text-[11px] font-semibold uppercase tracking-wide">{space.title}</h2>
                    <p className="flex gap-8 text-[11px] text-neutral-300">
                        <span>Floor - {space.floorType}</span>
                        <span>Wall - {space.wallType}</span>
                    </p>
                </div>
                <div className="flex gap-1.5">
                    <ToolbarButton icon={ShareNetworkIcon} label="Share" />
                    <ToolbarButton icon={HeartIcon} label="Favorite" />
                    <ToolbarButton icon={CopyIcon} label="Duplicate" />
                </div>
            </div>
        </article>
    );
}
