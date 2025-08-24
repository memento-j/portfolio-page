import AnimatedContent from "./AnimatedContent";
import TechnologyCard from "./TechnologyCard";

export default function TechnologiesList() {


    return(
        <div className="bg-black flex flex-col items-center justify-center pb-50 pt-25">
            <div className="sm:w-150 md:w-180 lg:w-240 xl:w-300 w-100">
                <AnimatedContent
                    distance={150}
                    direction="horizontal"
                    ease="power3.out"
                    duration={1.2}
                    initialOpacity={0}
                    animateOpacity
                    scale={1.0}
                    reverse={true}
                    >
                        <p className="text-[#F0EDEB] text-5xl font-bold mb-5">Current technologies</p> 
                        <p className="text-[#B5B3B0] text-2xl mb-15">Here are some of the technologies I am profficient with</p>
                </AnimatedContent>  
                <AnimatedContent
                    distance={70}
                    direction="vertical"
                    ease="power3.out"
                    duration={1.2}
                    initialOpacity={0}
                    animateOpacity
                    scale={1.0}
                    >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({length:6} ,(_, i) => (
                        <TechnologyCard key={i}/>
                    ))}
                    </div>
                </AnimatedContent>   
            </div>  
        </div>

    );
}