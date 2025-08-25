interface TechnologyCardProps {
    name: string
    description: string
}

export default function TechnologyCard({ name, description }: TechnologyCardProps) {
    return(
    <div className="flex items-center py-5 px-5 gap-5 bg-zinc-900 rounded-xl border border-transparent hover:border-zinc-500 hover:bg-zinc-700 transition-colors duration-250">
        <img className="rounded-xl size-15" src={`/icons/${name.toLowerCase()}-icon.svg`}/>
        <div>
            <p className="text-[#F0EDEB] text-xl mb-1">{name}</p>
            <p className="text-[#B5B3B0] mr-3">{description}</p>
        </div>
    </div>
    );
}