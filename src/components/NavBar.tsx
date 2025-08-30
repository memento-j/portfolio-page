export default function NavBar() {
    return(
    <header className="fixed top-12 w-full z-50">
        <nav className="w-[300px] mx-auto bg-zinc-900 backdrop-blur-xs shadow-lg rounded-md py-3.5 flex items-center justify-center gap-5 border border-zinc-700">
            <a href="#home" className="text-[#F0EDEB] text-lg hover:text-[#B5B3B0] active:text-[#B5B3B0]">Home</a>
            <a href="#about" className="text-[#F0EDEB] text-lg hover:text-[#B5B3B0] active:text-[#B5B3B0]">Skills</a>
            <a href="#services" className="text-[#F0EDEB] text-lg hover:text-[#B5B3B0] active:text-[#B5B3B0]">Projects</a>
        </nav>
    </header>
    );
}