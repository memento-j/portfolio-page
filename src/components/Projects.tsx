import { useState } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowUpRight, Info } from "lucide-react";
import { footer, projects, projectsSection, projectImage, type Project } from "../lib/content";

const sizes: Record<string, [number, number]> = {
    "AI Interview Practice Tool": [1600, 784],
    "Music Playlist Transferrer": [1600, 788],
};

// Each project arrives once, as it scrolls into view, gliding in from the side its screenshot hangs on
// (so they alternate left and right down the page): the screenshot first, its label just after. The
// slide rides a soft spring that settles with a slight give; the fade is a plain ease so it never flickers.
const ease = [0.16, 1, 0.3, 1] as const;
const arrive: Variants = { hidden: {}, shown: { transition: { staggerChildren: 0.12 } } };
const glide = (from: string): Variants => ({
    hidden: { opacity: 0, x: from },
    shown: {
        opacity: 1,
        x: 0,
        transition: {
            x: { type: "spring", visualDuration: 0.75, bounce: 0.22 },
            opacity: { duration: 0.6, ease },
        },
    },
});

// One project, hung like a work in a gallery: the screenshot is the piece, and a small wall label
// beside it carries the name, what it is, what it's built with, the description and the links. The
// screenshot repeats the main link for mouse users only; keyboard and screen reader users reach each
// destination once, from the label's links.
function ProjectItem({ project, flip }: { project: Project; flip: boolean }) {
    const reduce = useReducedMotion();
    const [broken, setBroken] = useState(false);
    const [width, height] = sizes[project.name] ?? [1600, 784];
    const href = project.live || project.link;

    return (
        <motion.article
            className={`project${flip ? " project--flip" : ""}`}
            variants={arrive}
            initial={reduce ? false : "hidden"}
            whileInView="shown"
            viewport={{ once: true, amount: 0.3 }}
        >
            {href && (
                <motion.a variants={glide(flip ? "12vw" : "-12vw")} className="project__plate" href={href} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true" style={{ aspectRatio: `${width} / ${height}` }}>
                    {broken ? (
                        <span className="project__fallback">{project.name}</span>
                    ) : (
                        <img
                            src={projectImage(project.name, 1600)}
                            srcSet={`${projectImage(project.name, 800)} 800w, ${projectImage(project.name, 1600)} 1600w`}
                            sizes="(min-width: 960px) 820px, 100vw"
                            alt=""
                            width={width}
                            height={height}
                            loading="lazy"
                            onError={() => setBroken(true)}
                        />
                    )}
                </motion.a>
            )}

            <motion.div variants={glide(flip ? "6vw" : "-6vw")} className="project__label">
                <h3 className="project__name">{project.name}</h3>
                <p className="project__tagline">{project.tagline}</p>
                <p className="project__stack">{project.technologies.join(", ")}</p>
                <p className="project__desc">{project.description}</p>
                <div className="project__links">
                    {project.live && (
                        // the label names the site itself, the way a wall label names a work's location
                        <a className="project__link" href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} ${projectsSection.liveLabel}`}>
                            {project.live.replace(/^https?:\/\//, "")}
                            <ArrowUpRight aria-hidden size={16} strokeWidth={2.25} />
                        </a>
                    )}
                    {project.link && (
                        <a className="project__link" href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} source on ${footer.github}`}>
                            {footer.github}
                            <ArrowUpRight aria-hidden size={16} strokeWidth={2.25} />
                        </a>
                    )}
                </div>
                {!project.live && project.note && (
                    <p className="project__note">
                        <Info aria-hidden size={15} strokeWidth={2} />
                        {project.note}
                    </p>
                )}
            </motion.div>
        </motion.article>
    );
}

export default function Projects() {
    return (
        <section id="projects" className="projects">
            <div className="projects__head">
                {/* "See My Projects" moves keyboard focus here, so screen readers announce where they landed */}
                <h2 id="projects-heading" tabIndex={-1}>{projectsSection.title}</h2>
                <p>{projectsSection.subtitle}</p>
            </div>
            <div className="project-list">
                {projects.map((project, i) => (
                    <ProjectItem key={project.name} project={project} flip={i % 2 === 1} />
                ))}
            </div>
        </section>
    );
}
