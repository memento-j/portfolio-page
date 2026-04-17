import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ArrowDown, Github, Linkedin } from "lucide-react";
import FadeContent from "./FadeContent";
import { motion } from "framer-motion";
import { BorderBeam } from "./ui/border-beam";
import { useEffect, useRef } from "react";

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const spotlightRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const spotlight = spotlightRef.current;
        if (!section || !spotlight) return;

        let rafId: number;
        let targetX = 0;
        let targetY = 0;
        let currentX = 0;
        let currentY = 0;
        let hasMoved = false;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = section.getBoundingClientRect();
            targetX = e.clientX - rect.left;
            targetY = e.clientY - rect.top;
            if (!hasMoved) {
                currentX = targetX;
                currentY = targetY;
                hasMoved = true;
                spotlight.style.opacity = "1";
            }
        };

        const handleMouseLeave = () => {
            spotlight.style.opacity = "0";
        };

        const handleMouseEnter = () => {
            if (hasMoved) spotlight.style.opacity = "1";
        };

        // Smooth lerp so the spotlight trails the cursor gently
        const animate = () => {
            currentX += (targetX - currentX) * 0.12;
            currentY += (targetY - currentY) * 0.12;
            spotlight.style.transform = `translate(${currentX - 300}px, ${currentY - 300}px)`;
            rafId = requestAnimationFrame(animate);
        };

        section.addEventListener("mousemove", handleMouseMove);
        section.addEventListener("mouseleave", handleMouseLeave);
        section.addEventListener("mouseenter", handleMouseEnter);
        rafId = requestAnimationFrame(animate);

        return () => {
            section.removeEventListener("mousemove", handleMouseMove);
            section.removeEventListener("mouseleave", handleMouseLeave);
            section.removeEventListener("mouseenter", handleMouseEnter);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return(
        <section
            ref={sectionRef}
            className="relative flex flex-col items-center justify-center min-h-screen bg-zinc-950 dark pb-32 overflow-hidden"
            id="home"
        >
            {/* Grid background */}
            <div
                aria-hidden
                className={cn(
                    "absolute inset-0",
                    "[background-size:32px_32px]",
                    "dark:[background-image:linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)]",
                )}
            />

            {/* Cursor-following spotlight — lives above the grid, below the vignette */}
            <div
                ref={spotlightRef}
                aria-hidden
                className="pointer-events-none absolute top-0 left-0 w-[600px] h-[600px] opacity-0 transition-opacity duration-500"
                style={{
                    background: "radial-gradient(circle, rgba(44,83,201,0.18) 0%, rgba(44,83,201,0.08) 30%, transparent 65%)",
                    willChange: "transform",
                }}
            />

            {/* Radial vignette — fades grid edges */}
            <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_40%,#09090b)] bg-zinc-950" />

            {/* ——— Content ——— */}

            {/* Terminal-path tag */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative z-20 mt-20 mb-4 flex items-center gap-2 font-mono text-xs sm:text-sm text-zinc-500 tracking-tight"
            >
                <span className="text-[#2c53c9]">~/</span>
                <span>portfolio</span>
                <span className="text-zinc-700">—</span>
                <span className="text-zinc-400">julian.dev</span>
                <span className="inline-block w-[7px] h-3.5 bg-[#2c53c9] hero-cursor ml-0.5" />
            </motion.div>

            <style>{`
                @keyframes hero-cursor-blink {
                    0%, 49%   { opacity: 1; }
                    50%, 100% { opacity: 0; }
                }
                .hero-cursor {
                    animation: hero-cursor-blink 1.1s step-end infinite;
                }
            `}</style>

            <motion.div
                initial={{ opacity: 0, y: -150 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", duration: 1.2 }}
            >
                <FadeContent blur={true} duration={500} delay={100} easing="ease-out" initialOpacity={0}>
                    <p className="relative text-center z-20 py-6 mb-2 text-4xl font-bold text-[#F0EDEB] sm:text-5xl md:text-6xl lg:text-7xl w-75 sm:w-150 md:w-175 lg:w-250">
                        Hi, I'm Julian. <br/> A <span className="text-[#2c53c9]">Software Developer</span> based in Northern Virginia.
                    </p>
                </FadeContent>
            </motion.div>

            {/* Technical subheading */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative z-20 mb-8 w-75 sm:w-150 md:w-175 lg:w-250 text-center"
            >
                <p className="text-[#B5B3B0] text-lg sm:text-xl">
                    <span className="font-mono text-[#2c53c9]/80 mr-2">{`>`}</span>
                    Building solutions to real problems I encounter and see around me
                </p>
            </motion.div>

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
                    <a href="https://www.linkedin.com/in/julian-sales-880647202/" target="_blank" rel="noreferrer">
                        <Linkedin 
                            className="bg-zinc-950 text-[#2c53c9] hover:text-[#F0EDEB] hover:scale-105 size-12 sm:size-14 rounded-xl p-2.5 mr-2 transition-all duration-200" 
                            strokeWidth={1.5} 
                        />
                    </a>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25, type: "spring" }}
                    className="mt-5"
                >
                    <a href="https://github.com/memento-j" target="_blank" rel="noreferrer">
                        <Github 
                            className="bg-zinc-950 text-[#2c53c9] hover:text-[#F0EDEB] hover:scale-105 size-12 sm:size-14 rounded-xl p-2.5 mr-1 transition-all duration-200" 
                            strokeWidth={1.5} 
                        />
                    </a>
                </motion.div>   
            </div>
        </section>
    );
}