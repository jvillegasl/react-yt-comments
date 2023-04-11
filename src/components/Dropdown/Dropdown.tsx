import "./Dropdown.scss";

import { useRipple } from "@/hooks";

import {
    ButtonHTMLAttributes,
    MouseEventHandler,
    ReactNode,
    useEffect,
    useRef,
    useState,
} from "react";

type DropdownProps = {
    children?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Dropdown({ children, onClick = () => null }: DropdownProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const ripples = useRipple(buttonRef);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        if (!showMenu) return;

        const containerElement = containerRef.current;

        if (!containerElement) return;

        const handleClickOutside = function (e: MouseEvent) {
            if (!(e.target instanceof Element)) return;

            if (containerElement.contains(e.target)) return;

            setShowMenu(false);
        };

        document.addEventListener("click", handleClickOutside);

        return () => document.removeEventListener("click", handleClickOutside);
    }, [showMenu]);

    const handleClick: MouseEventHandler<HTMLButtonElement> = function (e) {
        setShowMenu((prev) => !prev);

        onClick(e);
    };

    return (
        <div ref={containerRef} className="c-dropdown">
            <button
                ref={buttonRef}
                className="c-dropdown__button"
                onClick={handleClick}
            >
                {children}
                {ripples}
            </button>

            {showMenu && <Menu />}
        </div>
    );
}

function Menu() {
    return (
        <div className="c-dropdown__menu">
            <ul className="c-dropdown__items">
                <li className="c-dropdown__item">
                    <button className="c-dropdown__action">Top comments</button>
                </li>

                <li className="c-dropdown__item">
                    <button className="c-dropdown__action">Newest first</button>
                </li>
            </ul>
        </div>
    );
}
