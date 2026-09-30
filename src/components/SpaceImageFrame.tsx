import Image from 'next/image';
import {motion} from 'framer-motion';
import clsx from 'clsx';
import {Space} from '@/types/space';
import {ZOOM_TRANSITION} from '@/lib/motion';

const COVER = "max(100cqw, 150cqh)";
const COVER_STYLE = {
    width: COVER,
    aspectRatio: "3 / 2",
    left: `calc((100cqw - ${COVER}) / 2)`,
    top: `calc((100cqh - ${COVER} / 1.5) / 2)`,
};

type SpaceImageFrameProps = {
    space: Space;
    borderRadius: number;
    className?: string;
    priority?: boolean;
}

export function SpaceImageFrame({ space, borderRadius, className, priority }: SpaceImageFrameProps) {
    return (
        <motion.div
            layoutId={`space-frame-${space.id}`}
            transition={ZOOM_TRANSITION}
            className={clsx("overflow-hidden @container-size", className)}
            style={{ borderRadius }}
        >
            <motion.div layoutId={`space-image-${space.id}`} transition={ZOOM_TRANSITION} className="absolute" style={COVER_STYLE}>
                <Image src={space.image.imageUrl} alt={space.title} fill sizes="100vw" priority={priority} className="object-cover" />
            </motion.div>
        </motion.div>
    );
}
