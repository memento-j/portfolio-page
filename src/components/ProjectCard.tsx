import { Button } from "./ui/button";
import { ArrowUpRight, Github, Info } from "lucide-react";

interface ProjectCardProps {
    index: number
    name: string
    description: string
    link: string
    live: string
    technologies: string[]
    tagline?: string
    note?: string
    image?: string
}

export default function ProjectCard({
    index, name, description, technologies, link, live, tagline, note, image,
}: ProjectCardProps) {
    const previewHref = live || link;
    const img = image ?? `/projects/${name.toLowerCase()}.png`;
    const flip = index % 2 === 1; // alternate which side the screenshot sits on (lg+)

    return (
        <div className="group relative bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden mt-8 transition-all duration-300 hover:border-[#2c53c9]/40 hover:-translate-y-1 hover:shadow-[0_28px_60px_-32px_rgba(44,83,201,0.45)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
            <div className="grid lg:grid-cols-2 lg:items-stretch lg:min-h-[21rem]">

                {/* ── Media: bleeds to the card edge ── */}
                <a
                    href={previewHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${name}`}
                    className={`relative block overflow-hidden bg-zinc-950 aspect-[16/10] lg:aspect-auto ${flip ? "lg:order-2" : "lg:order-1"}`}
                >
                    <img
                        loading="lazy"
                        src={img}
                        alt={`${name} interface`}
                        className="absolute inset-0 h-full w-full object-cover object-top transition-transform "
                        onError={(e) => {
                            const el = e.currentTarget;
                            el.style.display = "none";
                            const ph = document.createElement("div");
                            ph.className = "absolute inset-0 grid place-items-center text-zinc-600 text-sm tracking-widest";
                            ph.textContent = "NO PREVIEW";
                            el.parentElement?.appendChild(ph);
                        }}
                    />
                    {/* seam: subtle inner edge toward the content side */}
                    <span
                        aria-hidden
                        className={`pointer-events-none absolute inset-y-0 w-px bg-zinc-800 hidden lg:block ${flip ? "left-0" : "right-0"}`}
                    />
                    {/* open affordance — appears on hover, no status dot */}
                    <span className="absolute top-4 right-4 grid place-items-center size-9 rounded-full bg-zinc-950/70 backdrop-blur-sm border border-zinc-700/60 text-[#F0EDEB] opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 motion-reduce:transition-none">
                        <ArrowUpRight className="size-4" />
                    </span>
                </a>

                {/* ── Content ── */}
                <div className={`flex flex-col justify-center p-7 sm:p-9 lg:p-10 ${flip ? "lg:order-1" : "lg:order-2"}`}>
                    {tagline && (
                        <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-[#2c53c9] mb-3">
                            {tagline}
                        </p>
                    )}

                    <h3 className="text-[#F0EDEB] text-2xl sm:text-3xl md:text-[2.4rem] font-bold leading-[1.05] tracking-tight">
                        {name}
                    </h3>

                    <p className="text-[#B5B3B0] text-sm sm:text-base mt-4 leading-relaxed">
                        {description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-6">
                        {technologies.map((technology, i) => (
                            <span
                                key={i}
                                className="font-mono text-[11px] text-zinc-400 border border-zinc-800 rounded-md px-2 py-1 transition-colors duration-200 hover:border-[#2c53c9]/50 hover:text-[#F0EDEB]"
                            >
                                {technology}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center gap-3 mt-8">
                        <a href={link} target="_blank" rel="noopener noreferrer" aria-label={`${name} source on GitHub`}>
                            <div className="bg-zinc-950 text-[#2c53c9] hover:text-[#F0EDEB] hover:scale-105 size-11 rounded-xl p-2.5 transition-all duration-200 flex items-center justify-center motion-reduce:transition-none motion-reduce:hover:scale-100">
                                <Github className="w-full h-full" strokeWidth={1.5} />
                            </div>
                        </a>

                        {live ? (
                            <a href={live} target="_blank" rel="noopener noreferrer">
                                <Button className="bg-[#2c53c9] text-[#F0EDEB] rounded-xl px-5 py-5.5 text-sm sm:text-base hover:bg-[#17389c] hover:scale-[1.04] hover:cursor-pointer transition-all duration-200 motion-reduce:transition-none motion-reduce:hover:scale-100">
                                    Live Demo
                                    <ArrowUpRight className="size-4" />
                                </Button>
                            </a>
                        ) : note ? (
                            <p className="flex items-start gap-2 text-xs text-zinc-500 leading-relaxed max-w-sm">
                                <Info className="size-3.5 mt-0.5 shrink-0 text-[#2c53c9]" strokeWidth={1.75} />
                                {note}
                            </p>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}