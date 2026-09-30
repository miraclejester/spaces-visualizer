import {MotionProps, Transition} from 'framer-motion';

export const ZOOM_TRANSITION: Transition = { type: "spring", bounce: 0, duration: 0.55 };

export const FADE_AROUND_ZOOM: MotionProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { delay: 0.3, duration: 0.25 } },
    exit: { opacity: 0, transition: { duration: 0.15 } },
};
