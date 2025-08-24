import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ArrowDown } from "lucide-react";

export default function Hero() {
    return(
        <section className="relative flex flex-col items-center justify-center min-h-screen bg-black dark pb-32">
            {/* Grid background from https://ui.aceternity.com/components/grid-and-dot-backgrounds*/}
            <div
            className={cn(
            "absolute inset-0",
            "[background-size:35px_35px]",
            "dark:[background-image:linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)]",
            )}
        />
            {/* Radial gradient for the container to give a faded look */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_40%,black)] dark:bg-black"></div>
            <p className="relative text-center z-20 py-8 text-4xl font-bold text-[#F0EDEB] sm:text-5xl md:text-6xl lg:text-7xl sm:w-150 md:w-200 w-100">
                Hi, I'm Julian, A <span className="text-[#2c53c9]">Software Developer</span> Based In Northern Virginia.
            </p>
            <div className="flex flex-row items-center gap-15 z-10 pb-2">
                <Button className="text-[#F0EDEB] text-xl p-5.5 mt-5 bg-gray-950 border border-gray-500 hover:bg-gray-800 transition-color duration-250" variant="default">See My Projects<ArrowDown className="size-6 mt-0.5"/></Button>
                <a className="mt-5" href="https://github.com/memento-j" target="_blank">
                    <img className="bg-black hover:bg-gray-800 size-18 rounded-xl p-3 mr-1 transition-colors duration-250" src="/logos/github-mark-white.svg"/>
                </a>
            </div>
            

        </section>
    );
}