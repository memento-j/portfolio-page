import TechnologyCard from "./TechnologyCard";
import { motion } from "framer-motion";

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
            name: "Python",
            description: "Versatile scripting language"
        },
        {
            name: "Java",
            description: "General-purpose language"
        },
        {
            name: "MongoDB",
            description: "NoSQL database"
        },
        {
            name: "PostgreSQL",
            description: "SQL database"
        },
        {
            name: "TailwindCSS",
            description: "CSS framework"
        },
        {
            name: "React",
            description: "JavaScript UI library"
        },
        {
            name: "Git",
            description: "Version Control System"
        },
        {
            name: "NodeJS",
            description: "JavaScript runtime enviornment"
        },
        {
            name: "Docker",
            description: "Containerization platform"
        },
        {
            name: "Amazon Web Services",
            description: "Cloud services provider"
        }
    ]

    return(
        <div className="bg-zinc-950 flex flex-col items-center justify-center pb-20 pt-40" id="skills">
            <div className="w-75 sm:w-150 md:w-180 lg:w-240 xl:w-300">
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 , type: "spring", duration: 1.2 }}
                    viewport={{ once: true, amount: 0.1 }}

                >
                    <p className="text-[#F0EDEB] font-bold mb-5 text-3xl sm:text-5xl">Technologies</p> 
                    <p className="text-[#B5B3B0] mb-15 text-xl sm:text-2xl">Here are some of the technologies I am profficient with.</p>
                </motion.div>  
                {/* List  of technologies */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {technologies.map((technology, i) => (
                        <motion.div
                            initial={{ opacity: 0, y: -40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 * i, type: "spring", duration: 1.2 }}
                            viewport={{ once: true, amount: 0.1 }}
                        >
                            <TechnologyCard key={i} name={technology.name} description={technology.description}/>
                        </motion.div>
                    ))}
                </div>   
            </div>  
        </div>

    );
}