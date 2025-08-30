import { useState, useEffect } from "react";

export default function NavBar() {
    const [showNav, setShowNav] = useState(true);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            // scrolling down (scrollY is distance from top of page, so larger numner means further down)
            if (window.scrollY > scrollY && window.scrollY > 100) {
                    setShowNav(false);
            } 
            // scrolling up
            else {
                setShowNav(true);
            }
            setScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        //cleanup function for the event listener
        return () => window.removeEventListener("scroll", handleScroll);
    }, [scrollY]);

    return(      
        <header       
            className={ `fixed top-12 w-full z-50 transition-transform duration-250 
                ${ showNav ? "translate-y-0" : "-translate-y-32" }` }
        >
            <nav className="max-w-[250px] sm:max-w-xs mx-auto bg-zinc-900/75 shadow-lg rounded-md py-3.5 flex items-center justify-center gap-5 border border-zinc-700">
                <p className="text-[#F0EDEB] text-lg hover:text-[#B5B3B0] active:text-[#B5B3B0] hover:cursor-pointer" 
                    onClick={() => document.getElementById("home")?.scrollIntoView({behavior:"smooth"})}
                >
                    Home
                </p>
                <p className="text-[#F0EDEB] text-lg hover:text-[#B5B3B0] active:text-[#B5B3B0] hover:cursor-pointer" 
                    onClick={() => document.getElementById("skills")?.scrollIntoView({behavior:"smooth"})}
                >
                    Skills
                </p>
                <p className="text-[#F0EDEB] text-lg hover:text-[#B5B3B0] active:text-[#B5B3B0] hover:cursor-pointer" 
                    onClick={() => document.getElementById("projects")?.scrollIntoView({behavior:"smooth"})}
                >
                    Projects
                </p>
            </nav>
        </header>
    );
}