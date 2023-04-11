import "./Button.scss";

import classNames from "classnames";

import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
    children?: ReactNode;
    size?: "sm";
    variant?: "primary" | "secondary";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
    children = null,
    size,
    variant = "primary",
    className,
    ...buttonProps
}: ButtonProps) {
    return (
        <button
            className={classNames(
                "c-button",
                `c-button--${variant}`,
                { [`c-button--${size}`]: size },
                className
            )}
            {...buttonProps}
        >
            {children}
        </button>
    );
}
