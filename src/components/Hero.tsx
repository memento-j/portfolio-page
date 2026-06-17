import { Button } from "./ui/button";
import { ArrowDown, Github, Linkedin } from "lucide-react";
import FadeContent from "./FadeContent";
import { motion } from "framer-motion";
import { useRef } from "react";
import Beams from "./Beams";

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);

    return(
        <section
            ref={sectionRef}
            className="relative flex flex-col items-center justify-center min-h-screen bg-zinc-950 dark pb-32 overflow-hidden"
            id="home"
        >
            <div className="absolute inset-0 z-0">
                <Beams
                    beamWidth={3}
                    beamHeight={25}
                    beamNumber={50}
                    lightColor="#848a93"
                    speed={2}
                    noiseIntensity={1}
                    scale={0.2}
                    rotation={30}
                />
            </div>

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
                    <p className="relative text-center z-20 py-6 mb-2 text-4xl font-bold text-[#F0EDEB] sm:text-5xl md:text-6xl lg:text-7xl w-75 sm:w-150 md:w-175 xl:w-300">
                        Hi, I'm Julian. <br/> A <span className="text-[#2c53c9]">Full-Stack Software Developer</span> based in Northern Virginia.
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
                    I enjoy building solutions to real problems I encounter and see around me
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