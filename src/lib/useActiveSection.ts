import { useEffect, useState } from "react";

// Scrollspy: returns the id of the section currently in the middle of the viewport.
export default function useActiveSection(ids: string[]) {
    const [active, setActive] = useState(ids[0]);
    const key = ids.join(",");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(entry.target.id);
                });
            },
            { rootMargin: "-40% 0px -55% 0px" }
        );

        key.split(",").forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [key]);

    return active;
}
