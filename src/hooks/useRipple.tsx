import {
    CSSProperties,
    MouseEventHandler,
    RefObject,
    useEffect,
    useState,
} from "react";
import { useDebounce } from "usehooks-ts";

export function useRipple<T extends HTMLElement>(ref: RefObject<T>) {
    const [ripples, setRipples] = useState<CSSProperties[]>([]);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const clickHandler = function (e: MouseEvent) {
            const height = element.clientHeight;
            const width = element.clientWidth;
            const diameter = Math.max(width, height);

            let rect = element.getBoundingClientRect();
            let left = e.clientX - rect.left;
            let top = e.clientY - rect.top;

            setRipples([
                ...ripples,
                {
                    top: top - diameter / 2,
                    left: left - diameter / 2,
                    height: Math.max(width, height),
                    width: Math.max(width, height),
                },
            ]);
        };

        element.addEventListener("click", clickHandler);

        return () => {
            element.removeEventListener("click", clickHandler);
        };
    }, [ref, ripples]);

    const _debounced = useDebounce(ripples, 600);

    useEffect(() => {
        if (!_debounced.length) return;

        setRipples([]);
    }, [_debounced.length]);

    return ripples?.map((style, i) => {
        return (
            <span
                key={i}
                style={{
                    ...style,
                    position: "absolute",
                    backgroundColor: "#000000",
                    opacity: "25%",
                    transform: "scale(0)",
                    animation: "ripple 600ms linear",
                    borderRadius: "50%",
                }}
            />
        );
    });
}
