// All site copy and project data. Components read from here; nothing is hard-coded in them.

export interface Project {
    name: string
    tagline: string
    live: string
    note?: string
    description: string
    link: string
    technologies: string[]
}

export const hero = {
    greeting: "Hi, I'm Julian.",
    rolePrefix: "A ",
    role: "Full-Stack Software Developer",
    roleSuffix: " based in Northern Virginia.",
    subheading: "I enjoy building solutions to real problems I encounter and see around me",
    cta: "See My Projects",
};

export const sections = [
    { id: "home", label: "Home" },
    { id: "projects", label: "Projects" },
];

export const links = {
    linkedin: "https://www.linkedin.com/in/julian-sales-880647202/",
    github: "https://github.com/memento-j",
    siteSource: "https://github.com/memento-j/portfolio-page",
};

export const projectsSection = {
    title: "Projects",
    subtitle: "Some of my completed projects",
    liveLabel: "Live Demo",
};

export const projects: Project[] = [
    {
        name: "AI Interview Practice Tool",
        tagline: "full-stack web app",
        live: "https://practimateai.com",
        description: "Developed an AI-driven interview preparation platform that enables users to practice mock interviews, receive intelligent feedback on their responses, and track their improvement over time.",
        link: "",   // the repository is private now; the live demo is the only link
        technologies: ["Supabase", "CRUD", "Docker", "ExpressJS", "React", "TypeScript", "shadcn/ui", "TailwindCSS", "AWS Deployment"],
    },
    {
        name: "Music Playlist Transferrer",
        tagline: "full-stack web app",
        live: "",
        note: "Runs locally — the YouTube API caps playlist additions at 200/day, so a public deploy isn't practical.",
        description: "A cross-platform music tool that lets users effortlessly migrate their playlists between streaming services, starting with YouTube and Spotify.",
        link: "https://github.com/memento-j/melodex",
        technologies: ["OAuth 2.0", "ExpressJS", "React", "JavaScript", "TypeScript", "shadcn/ui", "TailwindCSS"],
    },
];

export const footer = {
    copyright: (year: number) => `© ${year} Julian Sales. All rights reserved.`,
    signoff: "Thanks for stopping by.",
    linkedin: "LinkedIn",
    github: "GitHub",
    siteSource: "This site's source",
};

// file names use hyphens: a space would break srcset, which splits candidates on whitespace
export const projectImage = (name: string, width: 800 | 1600) => `/projects/${name.toLowerCase().replace(/\s+/g, "-")}-${width}.webp`;
