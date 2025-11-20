import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ArrowDown } from "lucide-react";
import FadeContent from "./FadeContent";
import { motion } from "framer-motion";
import { BorderBeam } from "./ui/border-beam";

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
            <motion.div
                initial={{ opacity: 0, y: -150 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", duration: 1.2 }}
            >
                <FadeContent blur={true} duration={500} delay={100} easing="ease-out" initialOpacity={0}>
                    <p className="relative text-center z-20 py-8 mt-14 mb-2 text-4xl font-bold text-[#F0EDEB] sm:text-5xl md:text-6xl lg:text-7xl w-75 sm:w-150 md:w-175 lg:w-250">
                        Hi, I'm Julian. <br/> A <span className="text-[#2c53c9]">Software Developer</span> based in Northern Virginia.
                    </p>
                </FadeContent>
            </motion.div>
            <p className="text-[#B5B3B0] fond-bold z-20 mb-8 w-75 text-lg sm:text-2xl sm:w-150 md:w-175 lg:w-250 text-center">
                I embrace challenges as opportunities for growth and discovery.
            </p>
            <div className="flex flex-row items-center justify-center z-10 pb-2 w-70 sm:w-100 md:w-150">
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.10, type: "spring" }}
                >
                    <Button className="relative text-[#F0EDEB] rounded-3xl p-5.5 px-10 mt-5 mr-2 bg-[#2c53c9] hover:bg-[#17389c] text-[16px] sm:text-xl sm:mr-10 hover:cursor-pointer hover:scale-107 transition-color duration-200" variant="default"
                    onClick={() => document.getElementById("projects")?.scrollIntoView({behavior:"smooth"})}
                    >
                        
                        See My Projects<ArrowDown className="size-4.5 mt-0.5"/>
                        <BorderBeam size={30} duration={4} borderWidth={2} className="from-white/40 via-white/60 to-transparent"/>
                    </Button>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.175, type: "spring" }}
                    className="mt-5"
                >
                    <a href="https://www.linkedin.com/in/julian-sales-880647202/" target="_blank">
                        <img className="bg-zinc-950 hover:scale-107 size-14.5 sm:size-16.5 rounded-xl p-0.5 mr-2 transition duration-200" src="/icons/linkedin.svg"/>
                    </a>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25, type: "spring" }}
                    className="mt-5"
                >
                    <a href="https://github.com/memento-j" target="_blank">
                        <img className="bg-zinc-950 hover:scale-107 size-12 sm:size-14 rounded-xl p-1.5 mr-1 transition duration-200" src="/icons/github-mark-white.svg"/>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}