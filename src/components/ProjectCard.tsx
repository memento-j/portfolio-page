import { Button } from "./ui/button";
import { ArrowRight, Github } from "lucide-react";
import { BorderBeam } from "./ui/border-beam";

interface ProjectCardProps {
    name: string
    description: string
    link: string
    live: string
    technologies: string[]
    tagline?: string  // e.g. "full-stack · ai platform"
}

export default function ProjectCard({ name, description, technologies, link, live, tagline }: ProjectCardProps) {
    return (
        <div className="sm:px-9 px-5 pt-6 pb-8 bg-zinc-900 rounded-xl w-75 sm:w-150 md:w-180 lg:w-240 xl:w-300 border border-zinc-800 hover:border-[#2c53c9]/40  mt-8 transition duration-300">

            {/* Header row — title + actions */}
            <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex flex-col">
                    {/* Tagline — small mono category */}
                    {tagline && (
                        <span className="font-mono text-xs sm:text-sm text-[#2c53c9] tracking-wide uppercase mb-2">
                            {tagline}
                        </span>
                    )}
                    <p className="text-[#F0EDEB] text-2xl sm:text-3xl font-semibold leading-tight">{name}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0 mt-1">
                    {/* GitHub icon */}
                    <a href={link} target="_blank" rel="noopener noreferrer">
                        <div className="bg-zinc-950 hover:scale-107 size-10 sm:size-11 rounded-xl p-2 transition duration-200 flex items-center justify-center hover:bg-zinc-800">
                            <Github className="text-[#2c53c9] w-full h-full" strokeWidth={1.5} />
                        </div>
                    </a>

                    {/* Live Demo button */}
                    {live && (
                        <a href={live} target="_blank" rel="noopener noreferrer">
                            <Button className="relative bg-[#2c53c9] text-[#F0EDEB] hover:bg-[#17389c] hover:cursor-pointer hover:scale-107 transition-color duration-200 text-sm sm:text-base">
                                Live Demo
                                <ArrowRight className="size-4" />
                                <BorderBeam size={25} duration={4} borderWidth={2} className="from-white/40 via-white/60 to-transparent" />
                            </Button>
                        </a>
                    )}
                </div>
            </div>

            {/* Description */}
            <p className="text-[#B5B3B0] text-base sm:text-lg mb-5 leading-relaxed">{description}</p>

            {/* Media — wrapped in browser-chrome frame */}
            <div className="overflow-hidden rounded-xl border border-zinc-700 shadow-2xl mb-6 bg-zinc-950">
                {/* Browser chrome bar */}
                <div className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900 border-b border-zinc-800">
                    <div className="flex-1 mx-3 px-3 py-1 bg-zinc-950 rounded-md border border-zinc-800">
                        <span className="font-mono text-[11px] sm:text-xs text-zinc-500 truncate block">
                            {live ? live.replace(/^https?:\/\//, "") : `${name.toLowerCase().replace(/\s+/g, "")}.demo`}
                        </span>
                    </div>
                    <div className="flex gap-1.5 shrink-0">
                        <span className="size-2.5 rounded-full bg-red-500" />
                        <span className="size-2.5 rounded-full bg-yellow-400" />
                        <span className="size-2.5 rounded-full bg-green-500" />
                    </div>
                </div>
                {/* Screenshot / video */}
                <div className="overflow-hidden">
                    <img
                        loading="lazy"
                        className="w-full transition-transform duration-400 hover:scale-105"
                        src={`/projects/${name.toLowerCase()}.png`}
                    />
                </div>
            </div>

            {/* Tech tags — refined, less button-like */}
            <div className="flex flex-wrap gap-x-5 gap-y-2">
                {technologies.map((technology, i) => (
                    <span
                        key={i}
                        className="flex items-center gap-2 text-zinc-400 text-xs sm:text-sm font-mono"
                    >
                        <span className="size-1.5 rounded-full bg-[#2c53c9]" />
                        {technology}
                    </span>
                ))}
            </div>
        </div>
    );
}