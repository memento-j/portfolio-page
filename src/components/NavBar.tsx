export default function NavBar() {
    return(
    <header className="fixed top-12 w-full z-50">
        <nav className="max-w-[250px] sm:max-w-xs mx-auto bg-zinc-900/80 shadow-lg rounded-md py-3.5 flex items-center justify-center gap-5 border border-zinc-700">
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