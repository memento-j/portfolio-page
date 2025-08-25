import { Button } from "./ui/button";

interface ProjectCardProps {
    name: string
    description: string
    technologies: string[]
}

export default function ProjectCard({name, description, technologies}: ProjectCardProps) {
    return(
        <div className="pt-3 px-8 bg-zinc-900 rounded-xl sm:w-150 md:w-180 lg:w-240 xl:w-300 w-100 h-200 mt-5">
            <p className="text-[#F0EDEB] text-4xl my-5 font-[500]">{name}</p>
            <div className="flex flex-col">
                <p className="text-[#B5B3B0] text-2xl">{description}</p>
                <p className="text-[#F0EDEB] mt-5">*insert images of project*</p>
                <div className="flex justify-between mt-5">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
                        {technologies.map((technology, i) => (
                            <Button key={i} className="bg-[#2c53c9] border border-zinc-500 hover:bg-[#587eee] text-[#F0EDEB] font-normal" variant="default">
                                {technology}
                            </Button>
                        )) }
                    </div>
                    <a href="https://github.com/memento-j/melodex" target="_blank">
                        <img className="hover:bg-zinc-800 size-18 rounded-xl p-3 mr-1 transition-colors duration-250 " src="/icons/github-mark-white.svg"/>
                    </a>
                </div>
            </div>
        </div>
    );
}