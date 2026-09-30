import {ComponentType, isValidElement, MouseEventHandler, ReactElement} from 'react';
import {IconProps} from '@phosphor-icons/react';
import clsx from 'clsx';

type ToolbarButtonProps = {
    icon: ComponentType<IconProps> | ReactElement;
    label: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    active?: boolean;
}

export function ToolbarButton({ icon: Icon, label, onClick, active = false }: ToolbarButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={clsx(
                "flex h-10 items-center gap-1.5 rounded-lg px-3 text-[11px] font-medium uppercase tracking-wide",
                "transition-[background-color,color,transform] duration-150 ease-out active:scale-95",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
                active
                    ? "bg-neutral-200 text-neutral-900 hover:bg-white"
                    : "bg-neutral-800/90 text-neutral-100 hover:bg-neutral-700"
            )}
        >
            {isValidElement(Icon) ? Icon : <Icon size={14} />}
            {label}
        </button>
    );
}
