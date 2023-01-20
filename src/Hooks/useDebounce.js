import { useEffect, useState } from "react";

export function useDebounce(value = "", delay = 1000) {

    const [debunce, setDebounce] = useState(value);

    useEffect(() => {

        const timer = setTimeout(() => setDebounce(value), delay);

        return () => clearTimeout(timer)

    }, [value, delay])

    return debunce;
}