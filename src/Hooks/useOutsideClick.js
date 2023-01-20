import { useEffect } from "react";

export default function useOutsideClick({ ref, handler, isActive }) {

    useEffect(() => {
        if (!isActive) return;

        const handleClick = (e) => {
            if (!ref.current) return;
            if (!ref.current.contains(e.target)) handler();
        };

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [ref, handler, isActive]);
}