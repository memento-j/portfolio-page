import { cn } from "@/lib/utils";

export default function Hero() {
    return(
        <section className="relative flex flex-col items-center justify-center min-h-screen bg-black dark pb-32">
            {/* Grid background from https://ui.aceternity.com/components/grid-and-dot-backgrounds*/}
            <div
            className={cn(
            "absolute inset-0",
            "[background-size:35px_35px]",
            "dark:[background-image:linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)]",
            )}
        />
            {/* Radial gradient for the container to give a faded look */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_40%,black)] dark:bg-black"></div>
            <p className="relative text-center z-20 py-8 text-4xl font-bold text-[#F0EDEB] sm:text-5xl md:text-6xl lg:text-7xl sm:w-150 md:w-200 w-100">
                Hi, I'm Julian, a <span className="text-[#2c53c9]">Software Developer</span> based in northern Virginia.
            </p>
            <p className="text-white z-1">insetrrt github link with icon and button to go down to projects </p>
        </section>
    );
}