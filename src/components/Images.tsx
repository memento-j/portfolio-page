// import { motion, useReducedMotion } from "framer-motion";

// interface Vibe {
//     id: number;
//     src: string;
//     alt: string;        // describe the image (accessibility + shows if it fails to load)
//     caption?: string;   // optional little line under the image
// }

// const images: Vibe[] = [
//     { id: 1, src: "/dont-give-up.png", alt: "Don't give up" },
//     { id: 2, src: "/dont-stop.jpg", alt: "Don't stop" },
//     { id: 3, src: "/wizard-mouse.png", alt: "Wizard mouse" },
// ];

// export default function Images() {
//     const reduce = useReducedMotion();

//     return (
//         <section id="vibes" className="bg-zinc-950 py-24 px-6">
//             <div className="max-w-5xl mx-auto">
//                 {/* heading */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 24 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true, amount: 0.4 }}
//                     transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
//                     className="mb-10"
//                 >
//                     <p className="text-xs font-mono tracking-[0.25em] uppercase text-[#2c53c9] mb-3">
//                         ✦ vibes &amp; fuel
//                     </p>
//                     <h2 className="text-3xl sm:text-4xl font-bold text-[#F0EDEB] tracking-tight">
//                         things that keep me going
//                     </h2>
//                     <p className="mt-3 text-[#B5B3B0] text-sm sm:text-base">
//                         because great software is built on good energy.
//                     </p>
//                 </motion.div>

//                 {/* equal frames, each image centered inside — alignment is consistent
//                     no matter what size the source files are, and nothing is cropped */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {images.map((img, i) => (
//                         <motion.figure
//                             key={img.id}
//                             initial={{ opacity: 0, y: reduce ? 0 : 28 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             viewport={{ once: true, amount: 0.2 }}
//                             transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
//                             className="group flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 transition-all duration-300 hover:border-[#2c53c9]/40 hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgba(44,83,201,0.5)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
//                         >
//                             {/* identical aspect box; change aspect-[4/5] to aspect-square or aspect-[4/3] to taste */}
//                             <div className="relative aspect-[4/5] grid place-items-center p-4">
//                                 <img
//                                     src={img.src}
//                                     alt={img.alt}
//                                     loading="lazy"
//                                     className="max-h-full max-w-full w-auto h-auto object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
//                                     onError={(e) => {
//                                         const el = e.currentTarget;
//                                         el.style.display = "none";
//                                         const ph = document.createElement("div");
//                                         ph.className = "text-sm text-zinc-600 text-center px-4";
//                                         ph.textContent = img.alt || "image unavailable";
//                                         el.parentElement?.appendChild(ph);
//                                     }}
//                                 />
//                             </div>

//                             {img.caption && (
//                                 <figcaption className="px-4 py-3 text-xs text-zinc-400 border-t border-zinc-800">
//                                     {img.caption}
//                                 </figcaption>
//                             )}
//                         </motion.figure>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }