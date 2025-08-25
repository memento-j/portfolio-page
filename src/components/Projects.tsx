import AnimatedContent from "./AnimatedContent";
import ProjectCard from "./ProjectCard";

export default function ProjectsList() {
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
                        <ProjectCard/>
                    </div>
                </AnimatedContent>  
            </div>
        </div>
    );
}