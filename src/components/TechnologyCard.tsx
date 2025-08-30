interface TechnologyCardProps {
    name: string
    description: string
}

export default function TechnologyCard({ name, description }: TechnologyCardProps) {
    return(
    <div className="flex items-center py-5 px-5 gap-5 bg-zinc-900 rounded-xl border border-transparent hover:border-zinc-500 hover:bg-zinc-700 hover:scale-103 transition-transform duration-250">
        <img className="rounded-xl size-15" src={`/icons/${name.toLowerCase()}-icon.svg`}/>
        <div>
            <p className="text-[#F0EDEB] mb-1 text-[18px] sm:text-xl">{name}</p>
            <p className="text-[#B5B3B0] mr-3 text-sm sm:text-[16px]">{description}</p>
        </div>
    </div>
    );
}