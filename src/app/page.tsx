import Image from "next/image";
import {
  ArrowUpRight,
  Award,
  BookOpen,
  Download,
  GraduationCap,
  Mail,
  Spade,
} from "lucide-react";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { Tilt } from "@/components/Tilt";
import { CursorGlow, RotatingText } from "@/components/Effects";
import { ExperienceTabs } from "@/components/ExperienceTabs";
import { HeroCanvas } from "@/components/three/HeroCanvas";
import { GitHubIcon, ItchIcon, LinkedInIcon } from "@/components/BrandIcons";
import {
  education,
  experience,
  freelance,
  heroStats,
  profile,
  projects,
  roles,
  showcase,
  skills,
  stats,
  type Project,
} from "@/data/portfolio";

const socials = [
  { href: profile.links.github, label: "GitHub", Icon: GitHubIcon },
  { href: profile.links.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  { href: profile.links.itch, label: "itch.io", Icon: ItchIcon },
];

const current = experience.filter((j) => j.current);

function SectionHeading({ index, title, kicker }: { index: string; title: string; kicker: string }) {
  return (
    <Reveal className="relative mb-14">
      <span
        aria-hidden
        className="text-outline pointer-events-none absolute -top-6 right-0 select-none font-mono text-[6rem] font-bold leading-none opacity-70 sm:-top-10 sm:text-[10rem]"
      >
        {index}
      </span>
      <p className="relative font-mono text-xs uppercase tracking-[0.25em] text-accent">
        {index} <span className="text-muted">{"// "}{kicker}</span>
      </p>
      <h2 className="relative mt-3 text-3xl font-bold tracking-tight text-fg sm:text-5xl">{title}</h2>
    </Reveal>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <CursorGlow />
      <div aria-hidden className="noise pointer-events-none fixed inset-0 z-40" />
      <main id="top" className="overflow-x-clip">
        <Hero />
        <About />
        <Marquee />
        <section id="experience" className="mx-auto max-w-6xl px-4 py-28 sm:px-6">
          <SectionHeading index="02" title="Experience" kicker="quest log" />
          <Reveal>
            <ExperienceTabs fullTime={experience} freelance={freelance} />
          </Reveal>
        </section>
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 font-mono text-xs text-muted sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} {profile.fullName}</p>
          <p>Built with Next.js & Three.js · Deployed on Vercel</p>
        </div>
      </footer>
    </>
  );
}

/* ---------------------------------- Hero ---------------------------------- */

function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <HeroCanvas items={showcase} portrait={profile.portrait} />
      {/* Legibility scrims: bottom-up on mobile, left-to-right on desktop */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg from-40% via-bg/70 via-55% to-transparent to-70% md:hidden" />
      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[55%] bg-gradient-to-r from-bg from-45% to-transparent md:block" />
      <div className="pointer-events-none absolute inset-0 bg-grid" />

      {/* The container ignores the pointer so the 3D ring stays draggable; the text block opts back in. */}
      <div className="pointer-events-none relative mx-auto flex w-full max-w-6xl flex-1 items-end px-4 pb-16 pt-[54svh] sm:px-6 md:items-center md:pb-16 md:pt-24">
        <div className="pointer-events-auto max-w-xl">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-bg/60 px-3 py-1 font-mono text-xs text-fg backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Game Developer @ Engineered Alchemy
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 text-6xl font-bold leading-[0.95] tracking-tight text-fg sm:text-7xl lg:text-8xl">
              Mohamed
              <br />
              <span className="text-shimmer">Waled</span>
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-5 font-mono text-lg sm:text-2xl">
              <span className="text-muted">&gt; </span>
              <RotatingText items={roles} />
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{profile.tagline}</p>
          </Reveal>
          <Reveal delay={0.26}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="btn-shine inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-bg shadow-[0_0_30px_-5px_var(--accent)] transition-transform hover:-translate-y-0.5"
              >
                View my work <ArrowUpRight size={16} />
              </a>
              <a
                href={profile.resume}
                download
                className="btn-shine inline-flex items-center gap-2 rounded-md border border-line bg-bg/60 px-5 py-3 text-sm font-semibold text-fg backdrop-blur transition-colors hover:border-accent/60"
              >
                <Download size={16} /> Download CV
              </a>
              <div className="ml-1 flex items-center gap-4 text-muted">
                {socials.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="transition-all hover:-translate-y-0.5 hover:text-accent"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.32}>
            <dl className="mt-10 grid max-w-md grid-cols-3 divide-x divide-line rounded-xl border border-line bg-bg/50 backdrop-blur">
              {heroStats.map((s) => (
                <div key={s.label} className="px-4 py-3">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="text-xl font-bold text-fg sm:text-2xl">{s.value}</dd>
                  <dd className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">{s.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- About --------------------------------- */

function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-28 sm:px-6">
      <SectionHeading index="01" title="About me" kicker="player profile" />
      <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <Reveal className="space-y-5 text-lg leading-relaxed text-muted">
            {profile.about.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.06}>
                <Tilt className="rounded-xl">
                  <div className="hud h-full rounded-xl border border-line bg-gradient-to-br from-surface to-surface-2 p-5">
                    <p className="bg-gradient-to-r from-fg to-accent bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
                      {s.value}
                    </p>
                    <p className="mt-2 text-sm leading-snug text-muted">{s.label}</p>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.1}>
          <Tilt max={6} className="rounded-2xl">
            <div className="relative rounded-2xl border border-line bg-surface p-6 sm:p-7">
              <span className="shine" />
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">Currently</p>
              <ul className="mt-6 space-y-6">
                {current.map((job) => (
                  <li key={job.company} className="flex gap-4">
                    <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-accent shadow-[0_0_12px_var(--accent)]" />
                    <div>
                      <p className="font-semibold text-fg">{job.role}</p>
                      <p className="text-sm text-accent">{job.company}</p>
                      {job.company === "Noxveil Studio" && (
                        <p className="mt-1 text-sm text-muted">Leading Synarchy: Strings of Deceit toward Steam</p>
                      )}
                    </div>
                  </li>
                ))}
                <li className="flex gap-4">
                  <span className="mt-1.5 h-2.5 w-2.5 shrink-0 animate-pulse rounded-full bg-accent-2 shadow-[0_0_12px_var(--accent-2)]" />
                  <div>
                    <p className="font-semibold text-fg">Learning: Professional Scrum Master</p>
                    <p className="text-sm text-accent-2">PSM certification</p>
                  </div>
                </li>
              </ul>
              <div className="mt-8 flex items-center justify-between border-t border-line pt-5 font-mono text-xs text-muted">
                <span>{profile.location}</span>
                <a href={`mailto:${profile.email}`} className="text-accent hover:underline">
                  Open to new roles →
                </a>
              </div>
            </div>
          </Tilt>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------- Marquee -------------------------------- */

const MARQUEE_1 = ["Unity", "C#", "Steam", "VR / XR", "Photon", "Multiplayer", "PC Games", "Gameplay Systems"];
const MARQUEE_2 = ["Node.js", ".NET", "MongoDB", "CI/CD", "AWS", "DigitalOcean", "Team Lead", "Python"];

function MarqueeRow({ items, reverse }: { items: string[]; reverse?: boolean }) {
  return (
    <div className={`marquee ${reverse ? "marquee-reverse" : ""}`}>
      {[...items, ...items].map((t, i) => (
        <span key={i} className="flex items-center gap-8 px-4">
          <span className={i % 2 ? "text-outline [-webkit-text-stroke-color:var(--muted)]" : "text-fg"}>{t}</span>
          <span className="text-accent">✦</span>
        </span>
      ))}
    </div>
  );
}

function Marquee() {
  return (
    <div aria-hidden className="relative py-10">
      <div className="-mx-4 -rotate-2 border-y border-line bg-surface/80 py-4 text-3xl font-bold uppercase tracking-tight sm:text-5xl">
        <MarqueeRow items={MARQUEE_1} />
      </div>
      <div className="-mx-4 mt-3 rotate-1 border-y border-line bg-bg py-3 font-mono text-lg uppercase text-muted sm:text-2xl">
        <MarqueeRow items={MARQUEE_2} reverse />
      </div>
    </div>
  );
}

/* -------------------------------- Projects -------------------------------- */

function Cover({ project }: { project: Project }) {
  if (project.image) {
    return (
      <Image
        src={project.image}
        alt={`${project.title} screenshot`}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 560px"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
    );
  }

  return (
    <div className="glow relative flex h-full items-center justify-center overflow-hidden">
      <div aria-hidden className="grid-floor" />
      <div
        aria-hidden
        className="absolute inset-x-0 top-[48%] h-px bg-accent text-accent opacity-60 shadow-[0_0_24px_4px_currentColor] blur-[0.5px]"
      />
      <div className="relative flex -space-x-6">
        {["♠", "♥", "♦", "♣"].map((s, i) => (
          <span
            key={s}
            style={{ ["--r" as string]: `${(i - 1.5) * 12}deg`, animationDelay: `${i * 0.2}s` }}
            className={`flex h-24 w-16 animate-[bob_3s_ease-in-out_infinite] items-center justify-center rounded-lg border border-line bg-surface text-3xl shadow-xl sm:h-28 sm:w-20 ${
              i % 3 === 0 ? "text-fg" : "text-accent"
            }`}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const Wrapper = project.href ? "a" : "div";
  return (
    <Tilt max={7} className="rounded-xl">
      <Wrapper
        {...(project.href ? { href: project.href, target: "_blank", rel: "noopener noreferrer" } : {})}
        className="hud group relative flex h-full flex-col rounded-xl border border-line bg-surface transition-[border-color,box-shadow] duration-300 hover:border-accent/40 hover:shadow-[0_20px_60px_-20px_rgb(62_240_196/0.35)]"
      >
        {project.featured && <span className="shine" />}
        <div
          className={`relative overflow-hidden rounded-t-xl bg-surface-2 ${
            project.featured ? "aspect-[16/9]" : "aspect-video"
          }`}
        >
          <Cover project={project} />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />
          {project.badge && (
            <span className="absolute left-3 top-3 rounded-md border border-accent/30 bg-bg/80 px-2 py-1 font-mono text-[11px] text-accent backdrop-blur">
              {project.badge}
            </span>
          )}
          {project.period && (
            <span className="absolute right-3 top-3 rounded-md bg-bg/70 px-2 py-1 font-mono text-[11px] text-muted backdrop-blur">
              {project.period}
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className={`font-semibold text-fg ${project.featured ? "text-xl" : "text-lg"}`}>{project.title}</h3>
            {project.href && (
              <ArrowUpRight
                size={18}
                className="mt-1 shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
              />
            )}
          </div>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.blurb}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span key={t} className="rounded border border-line bg-bg/40 px-2 py-0.5 font-mono text-[11px] text-muted">
                {t}
              </span>
            ))}
          </div>
        </div>
      </Wrapper>
    </Tilt>
  );
}

function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-28 sm:px-6">
      <SectionHeading index="03" title="Selected projects" kicker="achievements unlocked" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 3) * 0.06} className={p.featured ? "lg:col-span-3" : "lg:col-span-2"}>
            <div id={`project-${p.slug}`} className="h-full scroll-mt-24 rounded-xl">
              <ProjectCard project={p} />
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-10 text-center">
        <a
          href={profile.links.itch}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-shine inline-flex items-center gap-2 rounded-md border border-line bg-surface px-5 py-3 font-mono text-sm text-accent transition-colors hover:border-accent/60"
        >
          <ItchIcon size={16} /> Play my games on itch.io <ArrowUpRight size={14} />
        </a>
      </Reveal>
    </section>
  );
}

/* --------------------------------- Skills --------------------------------- */

function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-28 sm:px-6">
      <SectionHeading index="04" title="Skills & toolkit" kicker="loadout" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((g, i) => (
          <Reveal
            key={g.group}
            delay={(i % 3) * 0.06}
            className={i === skills.length - 1 ? "sm:col-span-2" : ""}
          >
            <Tilt className="rounded-xl">
              <div className="hud h-full rounded-xl border border-line bg-surface p-6">
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{g.group}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <span
                      key={s}
                      className="rounded-md border border-transparent bg-surface-2 px-3 py-1.5 text-sm text-fg transition-colors hover:border-accent/40 hover:text-accent"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------- Education ------------------------------- */

function Education() {
  return (
    <section id="education" className="mx-auto max-w-6xl px-4 py-28 sm:px-6">
      <SectionHeading index="05" title="Education" kicker="training arc" />
      <div className="grid gap-6 md:grid-cols-2">
        {education.map((e, i) => {
          const learning = e.status === "Currently learning";
          const Icon = learning ? BookOpen : GraduationCap;
          return (
            <Reveal key={e.title} delay={i * 0.08}>
              <Tilt max={6} className="rounded-2xl">
                <div className="hud relative h-full rounded-2xl border border-line bg-gradient-to-br from-surface to-surface-2 p-7">
                  {learning && <span className="shine" />}
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-xl border ${
                        learning ? "border-accent-2/40 text-accent-2" : "border-accent/40 text-accent"
                      } bg-bg/60`}
                    >
                      <Icon size={22} />
                    </span>
                    <span
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px] ${
                        learning ? "border-accent-2/40 text-accent-2" : "border-accent/40 text-accent"
                      }`}
                    >
                      {learning ? (
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-2" />
                      ) : (
                        <Award size={12} />
                      )}
                      {e.status}
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-fg sm:text-2xl">{e.title}</h3>
                  <p className="mt-2 text-muted">{e.place}</p>
                  <p className="mt-4 font-mono text-xs text-muted">{e.period}</p>
                  {learning && (
                    <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-bg">
                      <div className="h-full w-3/5 animate-pulse rounded-full bg-gradient-to-r from-accent-2 to-accent" />
                    </div>
                  )}
                </div>
              </Tilt>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* --------------------------------- Contact -------------------------------- */

function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-4 py-28 sm:px-6">
      <Reveal>
        <div className="relative rounded-2xl border border-line bg-surface">
          <span className="shine" />
          <div className="relative overflow-hidden rounded-2xl px-6 py-20 text-center sm:px-12">
            <div className="pointer-events-none absolute inset-0 glow" />
            <div aria-hidden className="grid-floor opacity-60" />
            <div className="relative">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">06 // press start</p>
              <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-bold tracking-tight text-fg sm:text-6xl">
                Let&apos;s build something people <span className="text-shimmer">want to play.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-muted">
                I&apos;m open to lead and senior Unity roles, PC and VR projects, and freelance collaborations. Email
                is the quickest way to reach me.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="btn-shine inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-bg shadow-[0_0_30px_-5px_var(--accent)] transition-transform hover:-translate-y-0.5"
                >
                  <Mail size={16} /> {profile.email}
                </a>
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shine inline-flex items-center gap-2 rounded-md border border-line bg-bg px-5 py-3 text-sm font-semibold text-fg hover:border-accent/60"
                >
                  <LinkedInIcon size={16} /> LinkedIn
                </a>
              </div>
              <p className="mt-8 inline-flex items-center gap-2 font-mono text-xs text-muted">
                <Spade size={12} className="text-accent-2" /> Based in Cairo · Open to remote work
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
