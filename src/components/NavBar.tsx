import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function NavBar() {
    const [progress, setProgress] = useState(0);
    const [activeSection, setActiveSection] = useState("home");

    const sections = [
        { id: "home", label: "Home" },
        { id: "skills", label: "Skills" },
        { id: "projects", label: "Projects" },
    ];

    // Track how far down the page the user has scrolled, for the progress hairline
    useEffect(() => {
        const handleScroll = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Scrollspy — highlight nav tab for the section currently in view
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: "-40% 0px -55% 0px" }
        );

        sections.forEach((s) => {
            const el = document.getElementById(s.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed top-0 inset-x-0 z-50"
        >
            <nav className="border-b border-white/10 bg-zinc-950/50 backdrop-blur-md">
                <div className="mx-auto flex h-12 max-w-5xl items-center justify-center px-4 sm:h-14 sm:px-8">
                    <div className="flex items-center gap-4 font-mono uppercase tracking-[0.1em] sm:gap-7 sm:text-xs">
                        {sections.map((s) => {
                            const isActive = activeSection === s.id;
                            return (
                                <button
                                    key={s.id}
                                    onClick={() =>
                                        document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })
                                    }
                                    className="relative cursor-pointer py-2 hover:scale-105 transition-all duration-150"
                                >
                                    <span
                                        className={
                                            isActive
                                                ? "text-[#F0EDEB] text-[13px]"
                                                : "text-zinc-500 transition-all duration-100 hover:text-zinc-300"
                                        }
                                    >
                                        {s.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* scroll progress hairline */}
                <div className="h-[2px] w-full bg-white/5">
                    <div className="h-full bg-[#2c53c9]" style={{ width: `${progress}%` }} />
                </div>
            </nav>
        </motion.header>
    );
}
