import AnimatedContent from "./AnimatedContent";
import TechnologyCard from "./TechnologyCard";

export default function TechnologiesList() {
    const technologies = 
    [
        { 
            name: "JavaScript",
            description: "Web programming language"
        }, 
        {
            name: "TypeScript",
            description: "JavaScript with type safety"
        },
        {
            name: "NodeJS",
            description: "JavaScript runtime enviornment"
        },
        {
            name: "React",
            description: "JavaScript UI library"
        },
        {
            name: "MongoDB",
            description: "NoSQL database"
        },
        {
            name: "Python",
            description: "Versatile scripting language"
        },
        {
            name: "Amazon Web Services",
            description: "Cloud services provider"
        },
        {
            name: "Git",
            description: "Version Control System"
        },
        {
            name: "TailwindCSS",
            description: "CSS framework"
        }
    ]

    return(
        <div className="bg-zinc-950 flex flex-col items-center justify-center py-25">
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
                    <p className="text-[#F0EDEB] font-bold mb-5 text-3xl sm:text-5xl">Technologies</p> 
                    <p className="text-[#B5B3B0] mb-15 text-xl sm:text-2xl">Here are some of the technologies I am profficient with.</p>
                </AnimatedContent>  
                {/* List  of technologies */}
                <AnimatedContent
                    distance={100}
                    direction="vertical"
                    ease="power3.out"
                    duration={1.2}
                    initialOpacity={0}
                    animateOpacity
                    scale={1.0}
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {technologies.map((technology, i) => (
                        <TechnologyCard key={i} name={technology.name} description={technology.description}/>
                    ))}
                    </div>
                </AnimatedContent>   
            </div>  
        </div>

    );
}