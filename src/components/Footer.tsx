import { Github, Linkedin } from "lucide-react";
 
export default function Footer() {
  return (
    <footer className="w-full bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="relative mb-6">
            <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-[#2c53c9] to-transparent blur-[2px] opacity-80" />
            <div className="h-px bg-gradient-to-r from-transparent via-[#2c53c9]/60 to-transparent" />
        </div>
        <div className="flex flex-row justify-between items-center">
 
          {/* Copyright */}
          <p className="text-sm text-zinc-400">
            © {new Date().getFullYear()} Julian Sales. All rights reserved.
          </p>
 
          {/* Social links */}
          <div className="flex flex-row gap-2">
            <a
              href="https://www.linkedin.com/in/julian-sales-880647202/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="bg-zinc-950 hover:bg-zinc-800 hover:scale-107 size-10 rounded-xl p-2 transition duration-200 flex items-center justify-center">
                <Linkedin className="text-[#2c53c9] w-full h-full" strokeWidth={1.5} />
              </div>
            </a>
            <a
              href="https://github.com/memento-j/portfolio-page"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="bg-zinc-950 hover:bg-zinc-800 hover:scale-107 size-10 rounded-xl p-2 transition duration-200 flex items-center justify-center">
                <Github className="text-[#2c53c9] w-full h-full" strokeWidth={1.5} />
              </div>
            </a>
          </div>
 
        </div>
      </div>
    </footer>
  );
}
 