import { Button } from "./ui/button";

interface ProjectCardProps {
    name: string
    description: string
    link: string
    technologies: string[]
}

export default function ProjectCard({name, description, technologies, link}: ProjectCardProps) {
    return(
        <div className="pt-3 sm:px-9 px-3 bg-zinc-900 rounded-xl w-75 sm:w-150 md:w-180 lg:w-240 xl:w-300 h-auto mt-8">
            <p className="text-[#F0EDEB] text-2xl sm:text-4xl mt-5 mb-8 font-[500]">{name}</p>
            <p className="text-[#B5B3B0] sm:text-2xl mb-3 pb-5">{description}</p>
            <div className="flex flex-col">
                <div className="overflow-hidden rounded-xl">
                    <img className="transition-transform duration-400 hover:scale-105" src={`/projects/${name.toLowerCase()}.png`} />
                </div>
                <div className="flex justify-between mt-5">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 pb-8">
                        {technologies.map((technology, i) => (
                            <Button key={i} className="bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 text-[#F0EDEB] font-normal text-[12px] sm:text-[16px] w-22 sm:w-28 md:w-35" variant="default">
                                {technology}
                            </Button>
                        )) }
                    </div>
                    <a href={link} target="_blank">
                        <img className="hover:bg-zinc-800 size-14 sm:size-18 rounded-xl p-3 mr-1 sm:mt-10 md:mt-4 transition-colors duration-250" src="/icons/github-mark-white.svg"/>
                    </a>
                </div>
            </div>
        </div>
    );
}