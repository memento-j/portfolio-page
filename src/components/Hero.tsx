import { lazy, Suspense, useEffect, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown, Github, Linkedin } from "lucide-react";
import { footer, hero, links } from "../lib/content";

// three.js loads after the page's own content, so the title never waits on it
const Ridges = lazy(() => import("./three/Ridges"));

const ease = [0.16, 1, 0.3, 1] as const;

// The hero: the Blue Ridge at night, layered ridgelines under a moon,
// with the name landing in the sky above them.
export default function Hero() {
    const ref = useRef<HTMLElement>(null);
    const actionsRef = useRef<HTMLDivElement>(null);
    const reduce = useReducedMotion();

    // Where the buttons end, as a fraction of the hero's height; the ridges are aimed to sit just below it
    const horizon = useMotionValue(0.7);
    useEffect(() => {
        const hero = ref.current;
        const actions = actionsRef.current;
        if (!hero || !actions) return;
        const measure = () => {
            // layout positions (offsetTop) ignore the scroll lift and entrance animation offsets
            const content = actions.offsetParent as HTMLElement | null;
            const bottom = actions.offsetTop + actions.offsetHeight + (content?.offsetTop ?? 0);
            if (hero.offsetHeight) horizon.set(Math.min(0.9, Math.max(0.4, bottom / hero.offsetHeight)));
        };
        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(hero);
        return () => observer.disconnect();
    }, [horizon]);

    // Scroll: the camera glides through the ridges (inside the scene) and the title lifts away.
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const contentY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -160]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.75], reduce ? [1, 1] : [1, 0]);

    // Scroll to the projects, then hand keyboard focus to their heading so screen readers announce it
    function toProjects() {
        window.setTimeout(() => document.getElementById("projects-heading")?.focus({ preventScroll: true }), 0);
    }

    // Each line fades and rises into place; nothing changes width, so the title never jumps
    const enter = (delay: number) =>
        reduce
            ? {}
            : {
                  initial: { opacity: 0, y: 18 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 1.1, ease, delay },
              };

    return (
        <section id="home" ref={ref} className="hero">
            <div className="sky" aria-hidden>
                <Suspense fallback={null}>
                    <Ridges className="scene-layer" progress={scrollYProgress} horizon={horizon} />
                </Suspense>
            </div>
            <div className="hero__scrim" aria-hidden />

            <motion.div className="hero__content" style={{ y: contentY, opacity: contentOpacity }}>
                <h1 className="title">
                    <motion.span className="title__name" {...enter(0.2)}>
                        {hero.greeting}
                    </motion.span>
                    <motion.span className="title__role" {...enter(0.45)}>
                        {hero.rolePrefix}<em>{hero.role}</em>{hero.roleSuffix}
                    </motion.span>
                </h1>

                <motion.div {...enter(0.7)}>
                    <p className="hero__sub">{hero.subheading}</p>
                    <div className="hero__actions" ref={actionsRef}>
                        <a className="btn" href="#projects" onClick={toProjects}>
                            {hero.cta}
                            <ArrowDown aria-hidden size={18} strokeWidth={2.25} />
                        </a>
                        <a className="pill" href={links.linkedin} target="_blank" rel="noopener noreferrer">
                            <Linkedin aria-hidden size={18} strokeWidth={1.9} />
                            {footer.linkedin}
                        </a>
                        <a className="pill" href={links.github} target="_blank" rel="noopener noreferrer">
                            <Github aria-hidden size={18} strokeWidth={1.9} />
                            {footer.github}
                        </a>
                    </div>
                </motion.div>
            </motion.div>

        </section>
    );
}
