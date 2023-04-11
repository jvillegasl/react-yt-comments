import "./IconButton.scss";

import { HTMLAttributes, ReactElement, cloneElement } from "react";
import classNames from "classnames";

type IconButtonProps = {
    children?: ReactElement;
} & HTMLAttributes<HTMLButtonElement>;

export function IconButton({
    children,
    className,
    onClick,
    ...buttonProps
}: IconButtonProps) {
    function modifyChild(child?: ReactElement, className?: string) {
        if (!child) return;

        const newClassName = classNames(className, child.props.className);

        const newProps = {
            ...child.props,
            className: newClassName,
        };

        return cloneElement(child, newProps);
    }

    return (
        <button
            className={classNames("c-icon-button", className)}
            {...buttonProps}
            onClick={onClick}
        >
            {modifyChild(children, "c-icon-button__icon")}
        </button>
    );
}
