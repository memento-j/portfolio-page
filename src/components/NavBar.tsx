import { useState, useEffect } from "react";

export default function NavBar() {
    const [showNav, setShowNav] = useState(true);
    const [scrollY, setScrollY] = useState(0);
    const [activeSection, setActiveSection] = useState("home");

    const sections = [
        { id: "home", label: "Home" },
        { id: "skills", label: "Skills" },
        { id: "projects", label: "Projects" },
    ];

    // Show/hide nav on scroll direction
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > scrollY && window.scrollY > 100) {
                setShowNav(false);
            } else {
                setShowNav(true);
            }
            setScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [scrollY]);

    // Scrollspy — highlight nav link for the section currently in view
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
        <header
            className={`fixed top-6 w-full z-50 transition-transform duration-300
                ${showNav ? "translate-y-0" : "-translate-y-32"}`}
        >
            <nav className="mx-auto w-fit bg-zinc-900/70 backdrop-blur-md shadow-lg rounded-full px-2 py-1.5 flex items-center gap-1 border border-[#2c53c9]/20">
                {sections.map((s) => {
                    const isActive = activeSection === s.id;
                    return (
                        <button
                            key={s.id}
                            onClick={() =>
                                document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })
                            }
                            className={`relative px-4 py-1.5 text-sm sm:text-base rounded-full transition-colors duration-200 cursor-pointer
                                ${isActive
                                    ? "text-[#F0EDEB]"
                                    : "text-zinc-400 hover:text-[#F0EDEB]"
                                }`}
                        >
                            {isActive && (
                                <span
                                    className="absolute inset-0 rounded-full bg-[#2c53c9]/20 border border-[#2c53c9]/40"
                                    aria-hidden
                                />
                            )}
                            <span className="relative">{s.label}</span>
                        </button>
                    );
                })}
            </nav>
        </header>
    );
}