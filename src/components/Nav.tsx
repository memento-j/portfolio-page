import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { sections } from "../lib/content";
import useActiveSection from "../lib/useActiveSection";

// The fixed nav. Over the top of the hero it is just the words; once you scroll it gathers into a
// small frosted pill. One cyan marker glides between the links: under the current section, or
// under whichever link is hovered or focused. Over the hero it's an underline; in the pill, a dot.
export default function Nav() {
    const active = useActiveSection(sections.map((s) => s.id));
    const reduce = useReducedMotion();
    const [hovered, setHovered] = useState<string | null>(null);
    // A clicked link keeps the marker while the page scrolls there, instead of it falling back to the
    // section being passed on the way
    const [clicked, setClicked] = useState<string | null>(null);
    useEffect(() => {
        if (clicked !== null && clicked === active) setClicked(null);
    }, [active, clicked]);
    const marked = hovered ?? clicked ?? active;

    const [solid, setSolid] = useState(false);
    const { scrollY } = useScroll();
    useMotionValueEvent(scrollY, "change", (v) => setSolid(v > 60));

    return (
        <header>
            <nav className={`nav${solid ? " nav--solid" : ""}`} aria-label="Sections">
                <ul onMouseLeave={() => setHovered(null)}>
                    {sections.map((s) => (
                        <li key={s.id}>
                            <a
                                href={`#${s.id}`}
                                aria-current={(clicked ?? active) === s.id ? "location" : undefined}
                                onClick={() => setClicked(s.id === active ? null : s.id)}
                                onMouseEnter={() => setHovered(s.id)}
                                onFocus={() => setHovered(s.id)}
                                onBlur={() => setHovered(null)}
                            >
                                {s.label}
                                {marked === s.id && (
                                    <motion.span
                                        layoutId="nav-marker"
                                        className="nav__marker"
                                        style={{ borderRadius: 99 }}
                                        transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
                                        aria-hidden
                                    />
                                )}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
