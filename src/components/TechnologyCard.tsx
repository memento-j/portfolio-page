interface TechnologyCardProps {
    name: string
}

export default function TechnologyCard({ name }: TechnologyCardProps) {
    return(
    <div className="flex items-center py-5 px-5 gap-5 bg-gray-800 rounded-xl border border-transparent hover:border-gray-500 hover:bg-gray-700 transition-colors duration-300">
        <img className="rounded-xl size-15" src={`/icons/${name.toLowerCase()}-icon.svg`}/>
        <div>
            <p className="text-[#F0EDEB] text-xl mb-1">{name}</p>
            <p className="text-[#B5B3B0] mr-3">describe in a few words</p>
        </div>
    </div>
    );
}