import AnimatedContent from "./AnimatedContent";
import ProjectCard from "./ProjectCard";

export default function ProjectsList() {
    const projects = 
    [
        {
            name: "Playlist Transferrer",
            description: "Web application that allows users to transfer their playlists between different music services (Youtube and Spotify only for now)",
            technoligies: ["OAuth 2.0", "ExpressJS", "Express Session", "React", "JavaScript", "TypeScript", "shadcn/ui", "TailwindCSS"]
        },
                {
            name: "Playlist Transferrer",
            description: "Web application that allows users to transfer their playlists between different music services (Youtube and Spotify only for now)",
            technoligies: ["OAuth", "Express Session", "ExpressJS", "React", "JavaScript", "TypeScript", "shadcn/ui", "TailwindCSS"]
        },
    ]

    return(
        <div className="bg-zinc-950 flex flex-col items-center justify-center pb-50">
            <div className="sm:w-150 md:w-180 lg:w-240 xl:w-300 w-100">
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
                    <p className="text-[#F0EDEB] text-5xl font-bold mb-12">Projects</p>
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
                    <div id="projects">
                        {projects.map((project, i) => (
                            <ProjectCard key={i} name={project.name} description={project.description} technologies={project.technoligies}/>
                        ))}
                    </div>
                </AnimatedContent>  
            </div>
        </div>
    );
}