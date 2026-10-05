import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowDown, Github, Linkedin } from "lucide-react";
import { footer, hero, links } from "../lib/content";

// three.js loads after the page's own content, so the title never waits on it
const Clouds = lazy(() => import("./three/Clouds"));

const ease = [0.16, 1, 0.3, 1] as const;
const roleChars = [...hero.role];
const TYPE_MS = 42;         // per character of the role
// the title's words, with each word's first letter index so the letters rise in one continuous stagger
const words = hero.greeting.split(" ").map((word, w, all) => ({
    word,
    start: all.slice(0, w).reduce((n, prev) => n + prev.length, 0),
}));

// The hero: a night sky with stars, the moon and drifting moonlit clouds,
// with the name above them.
export default function Hero() {
    const ref = useRef<HTMLElement>(null);
    const actionsRef = useRef<HTMLDivElement>(null);
    const reduce = useReducedMotion();

    // Where the buttons end, as a fraction of the hero's height; the clouds sit just below it
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

    // Scroll: the camera glides through the clouds (inside the scene) and the title lifts away.
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const contentY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -160]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.75], reduce ? [1, 1] : [1, 0]);

    // Entrance: the name fades and rises in, then the role types itself out and the rest rises in.
    // Reduced motion shows the finished hero at once.
    const [formed, setFormed] = useState(!!reduce);
    useEffect(() => {
        if (reduce) return;
        const timer = window.setTimeout(() => setFormed(true), 1200);
        return () => window.clearTimeout(timer);
    }, [reduce]);
    const [typed, setTyped] = useState(reduce ? roleChars.length : 0);
    const [caret, setCaret] = useState(false);
    useEffect(() => {
        if (!formed || reduce) return;
        const timers: number[] = [];
        timers.push(window.setTimeout(() => setCaret(true), 250));
        roleChars.forEach((_, i) => timers.push(window.setTimeout(() => setTyped(i + 1), 450 + i * TYPE_MS)));
        // the caret blinks a few times once the line is typed, then goes
        timers.push(window.setTimeout(() => setCaret(false), 450 + roleChars.length * TYPE_MS + 1800));
        return () => timers.forEach(window.clearTimeout);
    }, [formed, reduce]);

    // Depth: the lines sit at different distances, so the mouse shifts the nearer ones further
    const px = useMotionValue(0);
    const py = useMotionValue(0);
    const sx = useSpring(px, { stiffness: 60, damping: 18 });
    const sy = useSpring(py, { stiffness: 60, damping: 18 });
    useEffect(() => {
        if (reduce) return;
        const onMove = (e: PointerEvent) => {
            if (e.pointerType !== "mouse") return;
            px.set(e.clientX / window.innerWidth - 0.5);
            py.set(e.clientY / window.innerHeight - 0.5);
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
    }, [reduce, px, py]);
    const nameX = useTransform(sx, (v) => v * 22);
    const nameY = useTransform(sy, (v) => v * 12);
    const roleX = useTransform(sx, (v) => v * 12);
    const roleY = useTransform(sy, (v) => v * 7);
    const restX = useTransform(sx, (v) => v * 5);
    const restY = useTransform(sy, (v) => v * 3);

    // Scroll to the projects, then hand keyboard focus to their heading so screen readers announce it
    function toProjects() {
        window.setTimeout(() => document.getElementById("projects-heading")?.focus({ preventScroll: true }), 0);
    }

    // Each part rises into place once the name has formed
    const enter = (delay: number) =>
        reduce
            ? {}
            : {
                  initial: { opacity: 0, y: 16 },
                  animate: formed ? { opacity: 1, y: 0 } : undefined,
                  transition: { duration: 1, ease, delay },
              };

    return (
        <section id="home" ref={ref} className="hero">
            <div className="sky" aria-hidden>
                <Suspense fallback={null}>
                    <Clouds className="scene-layer" progress={scrollYProgress} horizon={horizon} />
                </Suspense>
            </div>
            <div className="hero__scrim" aria-hidden />

            <motion.div className="hero__content" style={{ y: contentY, opacity: contentOpacity }}>
                <h1 className="title">
                    {/* the animated lines are visual only; screen readers get the whole heading at once */}
                    <span className="sr-only">{hero.greeting} {hero.rolePrefix}{hero.role}{hero.roleSuffix}</span>
                    <motion.span className="title__name" style={{ x: nameX, y: nameY }} aria-hidden>
                        {/* each letter glides up from behind its word's bottom edge, one after another */}
                        <span className="title__glyphs">
                            {words.map(({ word, start }, w) => (
                                <span key={w}>
                                    {w > 0 && " "}
                                    <span className="title__word">
                                        {[...word].map((ch, i) => (
                                            <motion.span
                                                key={i}
                                                className="title__rise"
                                                initial={reduce ? false : { y: "115%", opacity: 0 }}
                                                animate={{ y: "0%", opacity: 1 }}
                                                transition={{ duration: 1.3, ease, delay: 0.25 + (start + i) * 0.045 }}
                                            >
                                                <span className="title__char">{ch}</span>
                                            </motion.span>
                                        ))}
                                    </span>
                                </span>
                            ))}
                        </span>
                    </motion.span>
                    <motion.span className="title__role" style={{ x: roleX, y: roleY }} aria-hidden>
                        <motion.span className="title__role-in" {...enter(0)}>
                            {hero.rolePrefix}
                            <em>
                                {/* the caret rides on the last typed letter, so it ends right after the phrase */}
                                {roleChars.map((ch, i) => (
                                    <span
                                        key={i}
                                        className={[
                                            i < typed ? "" : "is-untyped",
                                            caret && (i === typed - 1 || (typed === 0 && i === 0)) ? (typed === 0 ? "has-caret-before" : "has-caret") : "",
                                        ].join(" ").trim() || undefined}
                                    >
                                        {ch}
                                    </span>
                                ))}
                            </em>
                            {hero.roleSuffix}
                        </motion.span>
                    </motion.span>
                </h1>

                <motion.div style={{ x: restX, y: restY }}>
                    <motion.div {...enter(0.55)}>
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
            </motion.div>
        </section>
    );
}
