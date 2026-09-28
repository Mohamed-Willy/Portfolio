"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { Job } from "@/data/portfolio";

export function ExperienceTabs({ fullTime, freelance }: { fullTime: Job[]; freelance: Job[] }) {
  const [tab, setTab] = useState<"full" | "freelance">("full");
  const jobs = tab === "full" ? fullTime : freelance;
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <div>
      <div role="tablist" className="mb-10 inline-flex rounded-lg border border-line bg-surface p-1 font-mono text-xs">
        {(
          [
            ["full", "Full-time"],
            ["freelance", "Freelance"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            role="tab"
            aria-selected={tab === key}
            onClick={() => setTab(key)}
            className={`rounded-md px-4 py-2 transition-colors ${
              tab === key ? "bg-accent text-bg" : "text-muted hover:text-fg"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div ref={listRef} className="relative">
      <motion.div
        aria-hidden
        className="absolute -left-px top-0 z-10 h-full w-[2px] origin-top bg-gradient-to-b from-accent via-accent-2 to-accent shadow-[0_0_14px_var(--accent)]"
        style={{ scaleY: fill }}
      />
      <AnimatePresence mode="wait">
        <motion.ol
          key={tab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="relative border-l border-line"
        >
          {jobs.map((job) => (
            <li key={job.company + job.role} className="relative pb-10 pl-7 last:pb-0 sm:pl-10">
              <span
                className={`absolute -left-[6px] top-2 z-20 h-[11px] w-[11px] rounded-full border-2 border-bg ${
                  job.current ? "bg-accent shadow-[0_0_12px_var(--accent)]" : "bg-accent-2"
                }`}
              />
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <h3 className="text-lg font-semibold text-fg">
                  {job.role} <span className="text-accent">@ {job.company}</span>
                </h3>
                <p className="shrink-0 font-mono text-xs text-muted">{job.period}</p>
              </div>
              {job.summary && <p className="mt-1 text-sm text-muted">{job.summary}</p>}
              {job.location && (
                <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
                  <MapPin size={12} /> {job.location}
                </p>
              )}
              {job.points.length > 0 && (
                <ul className="mt-4 space-y-2.5">
                  {job.points.map((p) => (
                    <li key={p} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                      <span className="mt-2.5 h-1 w-1 shrink-0 bg-accent-2" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              )}
              {job.link && (
                <a
                  href={job.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1 font-mono text-xs text-accent hover:underline"
                >
                  {job.link.label} <ArrowUpRight size={13} />
                </a>
              )}
            </li>
          ))}
        </motion.ol>
      </AnimatePresence>
      </div>
    </div>
  );
}
