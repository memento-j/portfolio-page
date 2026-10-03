import { useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { sections } from "./lib/content";
import useActiveSection from "./lib/useActiveSection";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Footer from "./components/Footer";

export default function HomePage() {
    const active = useActiveSection(sections.map((s) => s.id));

    // The nav sits clear over the hero and gains a ground once you scroll
    const [solid, setSolid] = useState(false);
    const { scrollY } = useScroll();
    useMotionValueEvent(scrollY, "change", (v) => setSolid(v > 60));

    return (
        <>
            <header>
                <nav className={`nav${solid ? " nav--solid" : ""}`} aria-label="Sections">
                    <ul>
                        {sections.map((s) => (
                            <li key={s.id}>
                                <a href={`#${s.id}`} aria-current={active === s.id ? "location" : undefined}>
                                    {s.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </header>

            <main>
                <Hero />
                <Projects />
            </main>

            <Footer />
        </>
    );
}
