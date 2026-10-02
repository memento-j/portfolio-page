interface TechnologyCardProps {
    name: string
    description: string
}

export default function TechnologyCard({ name, description }: TechnologyCardProps) {
    return(
    <div className="flex items-center py-4 px-4 m-auto sm:p-5 gap-5 bg-zinc-900 rounded-xl border border-transparent hover:border-zinc-500 hover:bg-zinc-700 hover:scale-103 duration-250">
        <img loading="lazy" alt="" width={60} height={60} className="rounded-xl size-15" src={`/icons/${name.toLowerCase()}-icon.svg`}/>
        <div>
            <h3 className="text-[#F0EDEB] mb-1 text-[18px] lg:text-xl">{name}</h3>
            <p className="text-[#B5B3B0] mr-3 text-sm lg:text-[16px]">{description}</p>
        </div>
    </div>
    );
}