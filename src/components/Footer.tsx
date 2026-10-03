import { lazy, Suspense, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Github, Linkedin } from "lucide-react";
import { footer, links } from "../lib/content";

const Dawn = lazy(() => import("./three/Dawn"));

// The footer: the hero's ridges at first light, a sign-off, and the two links that matter
export default function Footer() {
    const ref = useRef<HTMLElement>(null);
    const reduce = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
    // the dawn sky fades in over the night sky as the footer arrives
    const dawnOpacity = useTransform(scrollYProgress, (p) => (reduce ? 1 : p * p * (3 - 2 * p)));

    return (
        <footer ref={ref} className="end">
            <div className="end__sky" aria-hidden>
                <motion.div className="end__dawn" style={{ opacity: dawnOpacity }} />
                <Suspense fallback={null}>
                    <Dawn className="scene-fade" progress={scrollYProgress} />
                </Suspense>
            </div>

            <div className="end__content">
                <p className="end__signoff">{footer.signoff}</p>
                <div className="end__links">
                    <a className="pill" href={links.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin aria-hidden size={18} strokeWidth={1.9} />
                        {footer.linkedin}
                    </a>
                    <a className="pill" href={links.github} target="_blank" rel="noopener noreferrer">
                        <Github aria-hidden size={18} strokeWidth={1.9} />
                        {footer.github}
                    </a>
                </div>
            </div>

            <p className="end__copy">
                {footer.copyright(new Date().getFullYear())}
                {" · "}
                <a href={links.siteSource} target="_blank" rel="noopener noreferrer">{footer.siteSource}</a>
            </p>
        </footer>
    );
}
