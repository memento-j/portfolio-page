import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";

export default function ProjectsList() {
    const projects = [
        {
            name: "AI Interview Practice Tool",
            tagline: "full-stack web app",
            live: "https://practimateai.com",
            description: "Developed an AI-driven interview preparation platform that enables users to practice mock interviews, receive intelligent feedback on their responses, and track their improvement over time.",
            link: "https://github.com/memento-j/interview-trainer",
            technologies: ["Supabase", "CRUD", "Docker", "ExpressJS", "React", "JavaScript", "TypeScript", "shadcn/ui", "TailwindCSS"]
        },
        {
            name: "Music Playlist Transferrer",
            tagline: "full-stack web app",
            live: "",
            note: "Runs locally — the YouTube API caps playlist additions at 200/day, so a public deploy isn't practical.",
            description: "A cross-platform music tool that lets users effortlessly migrate their playlists between streaming services, starting with YouTube and Spotify.",
            link: "https://github.com/memento-j/melodex",
            technologies: ["OAuth 2.0", "ExpressJS", "React", "JavaScript", "TypeScript", "shadcn/ui", "TailwindCSS"]
        }
    ];

    return (
        <section
            id="projects"
            className="relative overflow-hidden bg-zinc-950 flex flex-col items-center justify-center pt-40 pb-50"
        >
            {/* atmosphere: faint blue dot-grid, masked so it fades into the page (not a glow) */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                    backgroundImage:
                        "radial-gradient(circle, rgba(44,83,201,0.11) 1px, transparent 1.5px)",
                    backgroundSize: "26px 26px",
                    WebkitMaskImage:
                        "radial-gradient(ellipse 75% 55% at 50% 32%, #000 35%, transparent 100%)",
                    maskImage:
                        "radial-gradient(ellipse 75% 55% at 50% 32%, #000 35%, transparent 100%)",
                }}
            />

            <div className="relative z-10 w-75 sm:w-150 md:w-180 lg:w-240 xl:w-300">
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true, amount: 0.4 }}
                    className="flex items-end justify-between gap-4 pb-5"
                >
                    <div>
                        <p className="text-[#F0EDEB] sm:text-5xl text-3xl font-bold">Projects</p>
                        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 my-3">Some of my completed projects</p>
                    </div>
                </motion.div>

                {projects.map((project, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 44 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true, amount: 0.15 }}
                    >
                        <ProjectCard
                            index={i}
                            name={project.name}
                            tagline={project.tagline}
                            live={project.live}
                            note={project.note}
                            description={project.description}
                            link={project.link}
                            technologies={project.technologies}
                        />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}