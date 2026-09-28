export const profile = {
  name: "Mohamed Waled",
  fullName: "Mohamed Waled Mohamed",
  role: "Senior & Lead Unity Developer",
  tagline:
    "I build gameplay systems, VR experiences and multiplayer backends, and I ship them: a co-op crime sim heading to Steam and a robotics simulator used by 30,000+ people.",
  location: "Cairo, Egypt",
  email: "mohamedwilly2001@gmail.com",
  resume: "/Mohamed_Waled_Resume.pdf",
  portrait: "/profile-hero.webp",
  links: {
    github: "https://github.com/Mohamed-Willy",
    linkedin: "https://www.linkedin.com/in/mohamed-waled-924012222/",
    itch: "https://mohamed-willy.itch.io/",
  },
  about: [
    "I'm a full-stack game developer with 5+ years in game development and backend engineering, including 2+ years specializing in VR. I'm leading Synarchy: Strings of Deceit toward its Steam release, and I built 01Skills, a robotics coding simulator with 30,000+ users. I work mostly in Unity and C#, using Photon for real-time multiplayer, and I build the server side myself with Node.js, .NET and MongoDB.",
    "I enjoy the whole lifecycle: shaping a concept into an investor-ready prototype, scaling it into a vertical slice, and setting up the CI/CD, branching strategy and team workflow that get it shipped. Lately that has meant leading teams, onboarding developers and working directly with founders on scope and milestones.",
  ],
};

export const roles = [
  "Senior & Lead Unity Developer",
  "PC & Steam Game Developer",
  "VR / XR Engineer",
  "Multiplayer & Backend Dev",
];

export const heroStats = [
  { value: "5+", label: "years shipping games" },
  { value: "30K+", label: "01Skills users" },
  { value: "20+", label: "VR experiences" },
];

export const stats = [
  { value: "30K+", label: "Users on 01Skills, the robotics simulator I built" },
  { value: "5+", label: "Years building games" },
  { value: "20+", label: "VR experiences shipped" },
  { value: "Top 50", label: "of 10,000+ teams at Digitopia" },
];

export type Job = {
  role: string;
  company: string;
  period: string;
  location: string;
  current?: boolean;
  /** One line shown right under the role. */
  summary?: string;
  points: string[];
  link?: { label: string; href: string };
};

export const experience: Job[] = [
  {
    role: "Game Developer",
    company: "Engineered Alchemy",
    period: "09/2026 – Present",
    location: "",
    current: true,
    summary: "Games studio whose team has worked with Disney, Nintendo, EA, King and Microsoft.",
    points: ["Developing Unity / C# games and gameplay systems for the studio's projects."],
    link: { label: "engineeredalchemy.com", href: "https://www.engineeredalchemy.com/" },
  },
  {
    role: "Lead Unity Developer (Part-time)",
    company: "Noxveil Studio",
    period: "02/2025 – Present",
    location: "Remote",
    current: true,
    points: [
      "Leading development of Synarchy: Strings of Deceit, an online co-op, open-world crime sim built in Unity HDRP with Photon Fusion, now close to its Steam release.",
      "Led the implementation of core gameplay systems, taking the project from early concept through an investor-ready prototype and into the Vertical Slice phase, positioning the title for an Early Access launch on Steam.",
      "Helped grow the studio by recommending and onboarding team members, managing individual tasks and keeping the development pipeline efficient.",
      "Oversee DevOps for the GitHub organization: version control, branching strategies and CI/CD workflows.",
      "Work directly with the CEO and founders on project planning, milestone scoping and studio-level decisions.",
    ],
  },
  {
    role: "Senior Unity Developer",
    company: "Thaka International",
    period: "07/2025 – 09/2026",
    location: "Cairo, Egypt",
    points: [
      "Built 01Skills, a robotics coding simulator that trains students for the World Robot Olympiad (WRO) with Block Coding and Python. It has grown to 30,000+ users.",
      "Shipped it for Windows and macOS end to end, including CI/CD integration and a custom game launcher.",
    ],
    link: { label: "01Skills", href: "https://01skills.com/" },
  },
  {
    role: "Mid-level Unity Developer",
    company: "Ekson Technology",
    period: "07/2024 – 07/2025",
    location: "Cairo, Egypt",
    points: [
      "Developed educational, gamified VR labs in Unity and built custom internal tools that sped up the team's workflow.",
      "Completed 20+ fully functional VR experiments and learning experiences.",
    ],
  },
  {
    role: "Junior Software Engineer",
    company: "CodeQuests",
    period: "07/2023 – 07/2024",
    location: "Cairo, Egypt",
    points: [
      "Worked across multiple game projects and managed releases, including 4+ Android games.",
      "Ran market analysis and optimized final builds for performance, structure and user experience.",
    ],
  },
  {
    role: "Junior Unity Developer",
    company: "AYHAMco",
    period: "10/2022 – 07/2023",
    location: "Remote",
    points: [
      "Built the Node.js backend for multiple online card games and managed deployment on DigitalOcean.",
      "Developed and maintained Bingo, Gin Rummy, Tarneeb, Tarneeb 400, Triple, Hand, Trix and Leekha.",
    ],
    link: {
      label: "Chance on Google Play",
      href: "https://play.google.com/store/apps/details?id=com.chanceapplication",
    },
  },
];

export const freelance: Job[] = [
  {
    role: "Unity Developer",
    company: "Adaptive Learning Research Project",
    period: "04/2026 – 05/2026",
    location: "Remote",
    points: [
      "Built an adaptive learning application commissioned by a university researcher for her academic thesis.",
      "Deployed experimentally and tested on students at Menoufia University, Egypt, validating the system with real learners.",
    ],
  },
  {
    role: "Lead Unity Developer",
    company: "El Motaheda Education",
    period: "01/2026 – 03/2026",
    location: "Cairo, Egypt",
    points: [
      "Delivered an interactive eBook for an Oman-focused educational platform: 30 fully functional 2D Unity projects for young learners.",
      "Led the project end to end: hiring, task delegation and workflow management.",
      "Set up the team's development pipelines and standards to keep output consistent.",
    ],
  },
  {
    role: "Unity Developer",
    company: "BlueSoftec Studio",
    period: "02/2025 – 04/2025",
    location: "Remote",
    points: [
      "Developed a cross-platform cowboy-themed game for iOS, Android and web.",
      "Implemented gameplay systems with consistent performance across every platform.",
    ],
  },
];

export type Project = {
  slug: string;
  title: string;
  blurb: string;
  image?: string;
  tags: string[];
  href?: string;
  badge?: string;
  period?: string;
  /** Illustrated cover used when there's no screenshot. */
  visual?: "cards";
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "synarchy",
    title: "Synarchy: Strings of Deceit",
    blurb:
      "An online co-op, open-world crime sim for PC, close to release on Steam. As lead developer at Noxveil Studio I drive the core gameplay systems and the team behind them: Photon Fusion multiplayer, police AI with a heat/wanted system, and minigames like lockpicking, hacking and forgery.",
    image: "/projects/synarchy.png",
    tags: ["PC", "Steam", "Unity HDRP", "Photon Fusion", "Co-op"],
    badge: "Coming soon · Steam",
    featured: true,
    period: "2025 – Present",
  },
  {
    slug: "01skills",
    title: "01Skills",
    blurb:
      "A robotics coding simulator: players pilot robots across planets and solve missions with Block Coding or Python, training for the World Robot Olympiad. I shipped it for Windows and macOS with CI/CD and a custom game launcher, and it has grown past 30,000 users.",
    image: "/projects/01skills.png",
    tags: ["Windows / macOS", "Simulation", "Python", "Block Coding", "CI/CD"],
    href: "https://01skills.com/",
    badge: "30K+ users",
    featured: true,
    period: "2025 – 2026",
  },
  {
    slug: "the-desire",
    title: "The Desire",
    blurb:
      "XR puzzle game with an interactive NPC leader, AI-integrated gameplay and immersive puzzle rooms. Designed in ShapeXR and built for the NASA Space Apps Challenge 2024.",
    image: "/projects/the-desire-2.jpg",
    tags: ["VR", "Unity XR", "AI", "ShapeXR"],
    href: "https://mohamed-willy.itch.io/the-desire",
    badge: "NASA Space Apps",
    featured: true,
    period: "2024",
  },
  {
    slug: "chance",
    title: "Chance",
    blurb:
      "A series of real-time online multiplayer card games (Bingo, Gin Rummy, Tarneeb and more). Unity client, Node.js socket backend, deployed on DigitalOcean.",
    tags: ["Multiplayer", "Node.js", "Sockets", "DigitalOcean"],
    href: "https://play.google.com/store/apps/details?id=com.chanceapplication",
    badge: "Live on Play Store",
    visual: "cards",
    featured: true,
    period: "2024",
  },
  {
    slug: "space-scraper",
    title: "Space Scraper",
    blurb: "VR game built on Unity's new XR Interaction Toolkit package.",
    image: "/projects/space-scraper.jpg",
    tags: ["VR", "Unity XR"],
    href: "https://mohamed-willy.itch.io/space-scraper",
  },
  {
    slug: "smartinuos",
    title: "Smartinuos",
    blurb:
      "3D escape-room puzzle game with a full story. I programmed every mechanic, puzzle and interactive element.",
    image: "/projects/smartinuos.png",
    tags: ["3D", "Puzzle", "C#"],
    href: "https://mohamed-willy.itch.io/smartinuos",
    period: "2022",
  },
  {
    slug: "ebtsama-marfouda",
    title: "Ebtsama Marfouda",
    blurb: "Your job is simple: ruin every ID photo. If it turns out good, you're FIRED!",
    image: "/projects/ebtsama.png",
    tags: ["2D", "Comedy", "Unity"],
    href: "https://mohamed-willy.itch.io/ebtsama-marfouda",
  },
  {
    slug: "skeletons",
    title: "Skeletons",
    blurb:
      "2D top-down multiplayer survival adventure with room-based matchmaking: share an ID and play co-op.",
    image: "/projects/skeletons.png",
    tags: ["Multiplayer", "2D", "Co-op"],
    href: "https://mohamed-willy.itch.io/skeletons",
    period: "2023",
  },
  {
    slug: "ain-titan",
    title: "AIN TITAN",
    blurb:
      "Educational isometric game set on Saturn's moon Titan in 3023: rebuild the colony and restore its oxygen by combining chemical resources. Playable in the browser.",
    image: "/projects/ain-titan-cover.jpg",
    tags: ["Isometric", "Education", "Chemistry", "WebGL"],
    href: "https://mohamed-willy.itch.io/ain-titan",
  },
  {
    slug: "depth-of-freedom",
    title: "Depth of Freedom",
    blurb: "Adventure game about the impact of humanity on animals.",
    image: "/projects/depth-of-freedom.jpg",
    tags: ["Adventure", "Narrative"],
    href: "https://mohamed-willy.itch.io/depth-of-freedom",
  },
];

/** Games shown on the 3D ring in the hero. Each uses a 640×360 thumbnail at public/ring/<slug>.webp. */
export const showcase = projects
  .filter((p) => Boolean(p.image))
  .slice(0, 9)
  .map(({ slug, title }) => ({ slug, title, image: `/ring/${slug}.webp` }));

export const skills = [
  {
    group: "Engine & Languages",
    items: ["Unity", "C#", "C++", "Python", "JavaScript"],
  },
  {
    group: "XR",
    items: ["VR / XR Development", "Unity XR Toolkit", "VRIF", "ShapeXR"],
  },
  {
    group: "Multiplayer & Backend",
    items: ["Photon", "Node.js", "WebSockets", ".NET", "MongoDB"],
  },
  {
    group: "DevOps",
    items: ["CI/CD", "Git & GitHub", "GitHub Orgs", "AWS", "DigitalOcean"],
  },
  {
    group: "Leadership",
    items: ["Team Leadership", "Project Management", "Hiring & Onboarding", "Milestone Scoping"],
  },
];

export type EducationItem = {
  title: string;
  place: string;
  period: string;
  status: "Graduated" | "Currently learning";
};

export const education: EducationItem[] = [
  {
    title: "B.Sc. Computer Science",
    place: "Faculty of Computer & Information Sciences, Ain Shams University · Cairo",
    period: "2019 – 2023",
    status: "Graduated",
  },
  {
    title: "Professional Scrum Master (PSM)",
    place: "Scrum.org certification",
    period: "2026",
    status: "Currently learning",
  },
];
