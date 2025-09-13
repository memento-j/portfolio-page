export default function Footer() {
  return (
    <footer className="w-full bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Top border line */}
        <div className="border-t border-zinc-800 mb-6"></div>
        <div className="flex flex-row justify-between">
          {/* Copyright messaage */}
          <p className="text-sm text-zinc-400 mt-2 sm:mt-3">
            © {new Date().getFullYear()} Julian Sales. All rights reserved.
          </p>
          {/* Socials links */}
          <div className="flex flex-row gap-5">
            <a href="https://github.com/memento-j" target="_blank">
                <img className="bg-zinc-950 hover:bg-zinc-800 hover:scale-105 size-8 sm:size-10 rounded-xl p-0.5 mr-2 transition-colors duration-250" src="/icons/linkedin.svg"/>
            </a>
            <a href="https://github.com/memento-j/portfolio-page" target="_blank">
                <img className="bg-zinc-950 hover:bg-zinc-800 hover:scale-105 size-8 sm:size-10 rounded-xl p-1.5 mr-1 transition-colors duration-250" src="/icons/github-mark-white.svg"/>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
