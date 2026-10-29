import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { sections } from "../lib/content";
import useActiveSection from "../lib/useActiveSection";

// The fixed nav, top centre: the two links sit at either end of a long horizon line, echoing the
// hero's sky. A short cyan segment on the line slides toward the current section, or toward the link
// being hovered or focused. Once you scroll, the line draws in short and a dark fade rises behind the
// links so they stay readable over the page.
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

    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();
    // the line stays long for the first couple of scrolls, then draws in
    useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > window.innerHeight * 0.15));

    // the line and links glide to their new lengths and places (layout animation, transform only)
    const glide = reduce ? { duration: 0 } : { type: "spring" as const, stiffness: 220, damping: 30 };

    return (
        <header>
            <nav className={`nav${scrolled ? " nav--scrolled" : ""}`} aria-label="Sections">
                <ul onMouseLeave={() => setHovered(null)}>
                    {sections.map((s, i) => (
                        <li key={s.id}>
                            {i > 0 && (
                                <motion.span layout aria-hidden className="nav__horizon" transition={glide}>
                                    <span className="nav__sun" data-side={marked === sections[0].id ? "start" : "end"} />
                                </motion.span>
                            )}
                            <motion.a
                                layout
                                transition={glide}
                                href={`#${s.id}`}
                                aria-current={(clicked ?? active) === s.id ? "location" : undefined}
                                onClick={() => setClicked(s.id === active ? null : s.id)}
                                onMouseEnter={() => setHovered(s.id)}
                                onFocus={() => setHovered(s.id)}
                                onBlur={() => setHovered(null)}
                            >
                                {s.label}
                            </motion.a>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
