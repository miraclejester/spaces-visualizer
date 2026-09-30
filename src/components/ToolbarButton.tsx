import {ComponentType, isValidElement, MouseEventHandler, ReactElement} from 'react';
import {IconProps} from '@phosphor-icons/react';
import clsx from 'clsx';

type ToolbarButtonProps = {
    icon: ComponentType<IconProps> | ReactElement;
    label: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    active?: boolean;
    className?: string;
}

export function ToolbarButton({ icon: Icon, label, onClick, active = false, className }: ToolbarButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={clsx(
                "flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-xl px-3 font-ui text-[11px] font-medium uppercase tracking-[0.5px]",
                "transition-[background-color,color,transform] duration-150 ease-out active:scale-95",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
                active
                    ? "bg-neutral-200 text-neutral-900 hover:bg-white"
                    : "bg-black/35 text-neutral-100 hover:bg-black/55",
                className
            )}
        >
            {isValidElement(Icon) ? Icon : <Icon size={14} />}
            {label}
        </button>
    );
}
