import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";

export default function ProjectsList() {
    const projects = 
    [
        {
            name: "AI Interview Practice Tool",
            description: "Developed an AI-driven interview preparation platform that enables users to practice mock interviews, receive intelligent feedback on their responses, and track their improvement over time.",
            link: "https://github.com/memento-j/interview-trainer",
            technoligies: ["Supabase", "CRUD", "Docker", "ExpressJS", "React", "JavaScript", "TypeScript", "shadcn/ui", "TailwindCSS"]
        },
        {
            name: "Music Playlist Transferrer",
            description: "A cross-platform music tool that lets users effortlessly migrate their playlists between streaming services, starting with YouTube and Spotify.",
            link: "https://github.com/memento-j/melodex",
            technoligies: ["OAuth 2.0", "ExpressJS", "React", "JavaScript", "TypeScript", "shadcn/ui", "TailwindCSS"]
        }
    ]

    return(
        <div className="bg-zinc-950 flex flex-col items-center justify-center pb-50 pt-40" id="projects">
            <div className="w-75 sm:w-150 md:w-180 lg:w-240 xl:w-300">
                    <motion.div
                        initial={{ opacity: 0, x: -120 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.10, type: "spring", duration: 1.2 }}
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        <p className="text-[#F0EDEB] sm:text-5xl text-3xl font-bold mb-16">Projects</p>
                    </motion.div>
                {projects.map((project, i) => (
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.10, type: "spring", duration: 1.2 }}
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        <ProjectCard key={i} name={project.name} description={project.description} link={project.link} technologies={project.technoligies}/>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}