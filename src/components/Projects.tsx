import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Github, Info } from "lucide-react";
import { footer, projects, projectsSection, projectImage, type Project } from "../lib/content";

const sizes: Record<string, [number, number]> = {
    "AI Interview Practice Tool": [1600, 784],
    "Music Playlist Transferrer": [1600, 788],
};

// One project. The words lead: name, tagline, description, stack and actions sit first, and the
// screenshot supports them beside it at its real proportions. The screenshot fades and rises in, and
// its frame repeats the main link for mouse users only; keyboard and screen reader users reach each
// destination once, from the labelled buttons.
function ProjectItem({ project, flip }: { project: Project; flip: boolean }) {
    const ref = useRef<HTMLElement>(null);
    const reduce = useReducedMotion();
    const [broken, setBroken] = useState(false);
    const [width, height] = sizes[project.name] ?? [1600, 784];
    const href = project.live || project.link;

    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 45%"] });
    const imageOpacity = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0, 1]);
    const imageY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [24, 0]);

    return (
        <article ref={ref} className={`project${flip ? " project--flip" : ""}`}>
            <div className="project__text">
                <h3 className="project__name">{project.name}</h3>
                <p className="project__tagline">{project.tagline}</p>
                <p className="project__desc">{project.description}</p>
                <ul className="project__stack">
                    {project.technologies.map((tech) => (
                        <li key={tech}>{tech}</li>
                    ))}
                </ul>
                <div className="project__actions">
                    {project.live && (
                        <a className="btn btn--live" href={project.live} target="_blank" rel="noopener noreferrer">
                            {projectsSection.liveLabel}
                            <ArrowUpRight aria-hidden size={18} strokeWidth={2.25} />
                        </a>
                    )}
                    {project.link && (
                        // GitHub is the main action when there is no live demo
                        <a
                            className={project.live ? "pill" : "btn btn--live"}
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${project.name} source on ${footer.github}`}
                        >
                            <Github aria-hidden size={18} strokeWidth={1.9} />
                            {footer.github}
                        </a>
                    )}
                </div>
                {!project.live && project.note && (
                    <p className="project__note">
                        <Info aria-hidden size={16} strokeWidth={2} />
                        {project.note}
                    </p>
                )}
            </div>

            {href && (
                <a className="project__frame" href={href} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true" style={{ aspectRatio: `${width} / ${height}` }}>
                    <motion.div className="project__reveal" style={{ opacity: imageOpacity, y: imageY }}>
                        {broken ? (
                            <span className="project__fallback">{project.name}</span>
                        ) : (
                            <motion.img
                                src={projectImage(project.name, 1600)}
                                srcSet={`${projectImage(project.name, 800)} 800w, ${projectImage(project.name, 1600)} 1600w`}
                                sizes="(min-width: 960px) 680px, 100vw"
                                alt=""
                                width={width}
                                height={height}
                                loading="lazy"
                                                                onError={() => setBroken(true)}
                            />
                        )}
                    </motion.div>
                </a>
            )}
        </article>
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
