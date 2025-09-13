import AnimatedContent from "./AnimatedContent";
import ProjectCard from "./ProjectCard";

export default function ProjectsList() {
    const projects = 
    [
        {
            name: "Music Playlist Transferrer",
            description: "Cross-platform music tool that lets users migrate their playlists effortlessly between streaming services (starting with YouTube and Spotify).",
            technoligies: ["OAuth 2.0", "ExpressJS", "React", "JavaScript", "TypeScript", "shadcn/ui", "TailwindCSS"]
        },
                {
            name: "AI Interview Practice Tool",
            description: "An AI-powered web app that helps users practice, refine, and build confidence for job interviews.",
            technoligies: ["Supabase", "CRUD", "AssemblyAI", "OpenAI", "ExpressJS", "React", "JavaScript", "TypeScript", "shadcn/ui", "TailwindCSS"]
        },
    ]

    return(
        <div className="bg-zinc-950 flex flex-col items-center justify-center pb-50 pt-40" id="projects">
            <div className="w-75 sm:w-150 md:w-180 lg:w-240 xl:w-300">
                <AnimatedContent
                    distance={150}
                    direction="horizontal"
                    ease="power3.out"
                    duration={1.2}
                    initialOpacity={0}
                    animateOpacity
                    scale={1.0}
                    reverse={true}
                >
                    <p className="text-[#F0EDEB] sm:text-5xl text-3xl font-bold mb-16">Projects</p>
                </AnimatedContent>
                <AnimatedContent
                    distance={100}
                    direction="vertical"
                    ease="power3.out"
                    duration={1.2}
                    initialOpacity={0}
                    animateOpacity
                    scale={1.0}
                >
                    <div>
                        {projects.map((project, i) => (
                            <ProjectCard key={i} name={project.name} description={project.description} technologies={project.technoligies}/>
                        ))}
                    </div>
                </AnimatedContent>  
            </div>
        </div>
    );
}