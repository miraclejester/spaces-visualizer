import {useState} from 'react';
import {motion} from 'framer-motion';
import {HeartIcon} from '@phosphor-icons/react';
import clsx from 'clsx';
import {ToolbarButton} from '@/components/ToolbarButton';

type FavoriteButtonProps = {
    isFavorite: boolean;
    onToggle: () => void;
}

export function FavoriteButton({ isFavorite, onToggle }: FavoriteButtonProps) {
    const [wasToggled, setWasToggled] = useState(false);

    const heart = (
        <motion.span
            key={String(isFavorite)}
            className="flex"
            initial={wasToggled && isFavorite ? { scale: 0.3 } : false}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.6, duration: 0.45 }}
        >
            <HeartIcon
                size={14}
                weight={isFavorite ? "fill" : "regular"}
                className={clsx("transition-colors duration-150", isFavorite && "text-red-500")}
            />
        </motion.span>
    );

    return (
        <ToolbarButton
            icon={heart}
            label="Favorite"
            onClick={() => {
                setWasToggled(true);
                onToggle();
            }}
        />
    );
}
