export default function ProjectCard() {
    return(
        <div className="pt-3 px-8  bg-gray-900 rounded-xl w-300 h-200">
            <p className="text-[#F0EDEB] text-4xl my-5 font-[500]">Playlist Transferrer</p>
            <div className="flex flex-col">
                <p className="text-[#F0EDEB]">small description</p>
                <p className="text-[#F0EDEB]">image of page</p>
                <div className="flex justify-between">
                    <p className="text-[#F0EDEB]">techhnologies used button</p>
                    <a href="https://github.com/memento-j/melodex" target="_blank">
                        <img className="size-18" src="/icons/github-mark-white.svg"/>
                    </a>
                </div>
            </div>
        </div>
    );
}