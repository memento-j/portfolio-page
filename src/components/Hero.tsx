import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ArrowDown } from "lucide-react";

export default function Hero() {
    return(
        <section className="relative flex flex-col items-center justify-center min-h-screen bg-zinc-950 dark pb-32" id="home">
            {/* Grid background from https://ui.aceternity.com/components/grid-and-dot-backgrounds*/}
            <div
            className={cn(
            "absolute inset-0",
            "[background-size:32px_32px]",
            "dark:[background-image:linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)]",
            )}
        />
            {/* Radial gradient for the container to give a faded look */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_40%,#09090b)] bg-zinc-950"></div>
            <p className="relative text-center z-20 py-8 text-4xl font-bold text-[#F0EDEB] sm:text-5xl md:text-6xl lg:text-7xl w-75 sm:w-150 md:w-175 lg:w-250">
                Hi, I'm Julian. <br/> A <span className="text-[#2c53c9]">Software Developer</span> based in Northern Virginia.
            </p>
            <div className="flex flex-row items-center justify-center gap-5 z-10 pb-2 w-70 sm:w-100">
                <Button className="text-[#F0EDEB] text-xl p-5.5 mt-5 bg-zinc-950 border border-gray-500 hover:bg-zinc-900 hover:scale-103 transition-color duration-200" variant="default"
                onClick={() => document.getElementById("projects")?.scrollIntoView({behavior:"smooth"})}
                >
                    See My Projects<ArrowDown className="size-6 mt-0.5"/>
                </Button>
                <a className="mt-5" href="https://github.com/memento-j" target="_blank">
                    <img className="bg-zinc-950 hover:bg-zinc-800 [@media(min-width:320px)]:size-15 sm:size-18 rounded-xl p-3 mr-1 transition-colors duration-250" src="/icons/github-mark-white.svg"/>
                </a>
            </div>
        </section>
    );
}