import "./ToggleButton.scss";

import {
    ButtonHTMLAttributes,
    CSSProperties,
    ReactElement,
    useState,
} from "react";
import classNames from "classnames";

type ToggleButtonProps = {
    tooltipLabel?: string;
    iconOn: ReactElement;
    iconOff: ReactElement;
    onToggle?: () => void;
    value: boolean;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "value">;

export function ToggleButton({
    tooltipLabel = "",
    iconOn,
    iconOff,
    onToggle = () => null,
    className,
    value = false,
    ...buttonProps
}: ToggleButtonProps) {
    function toggle() {
        onToggle();
    }

    return (
        <button
            className={classNames("c-toggle-button", className)}
            style={{ "--tooltip-label": `'${tooltipLabel}'` } as CSSProperties}
            onClick={() => toggle()}
            {...buttonProps}
        >
            {value ? iconOn : iconOff}
        </button>
    );
}
