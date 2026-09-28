"use client";

import dynamic from "next/dynamic";
import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { MousePointerClick, Move3d } from "lucide-react";
import type { DragState, ShowcaseItem } from "./HeroScene";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false, loading: () => null });

/** If WebGL is unavailable, drop the scene quietly and keep the CSS backdrop. */
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/** Scrolls to a project card and flashes it so the visitor sees where they landed. */
function goToProject(slug: string) {
  const el = document.getElementById(`project-${slug}`);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  el.classList.remove("flash");
  void el.offsetWidth;
  el.classList.add("flash");
}

export function HeroCanvas({ items, portrait }: { items: ShowcaseItem[]; portrait: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const drag = useRef<DragState>({ velocity: 0, dragging: false, moved: false });
  const [active, setActive] = useState(true);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting && !reduce), {
      threshold: 0,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "";
  }, [hovered]);

  // Drag horizontally to spin the ring. Vertical swipes still scroll the page (touch-action: pan-y).
  const last = useRef(0);
  const start = useRef(0);
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    drag.current.dragging = true;
    drag.current.moved = false;
    last.current = start.current = e.clientX;
  }, []);
  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!drag.current.dragging) return;
    const dx = e.clientX - last.current;
    last.current = e.clientX;
    if (Math.abs(e.clientX - start.current) > 6) drag.current.moved = true;
    drag.current.velocity = dx * 0.006;
  }, []);
  const endDrag = useCallback(() => {
    drag.current.dragging = false;
  }, []);

  const hoveredTitle = items.find((i) => i.slug === hovered)?.title;

  return (
    <div
      ref={wrap}
      className="absolute inset-0 touch-pan-y select-none"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
      onPointerCancel={endDrag}
    >
      <SceneBoundary>
        <HeroScene
          active={active}
          dragRef={drag}
          items={items}
          portrait={portrait}
          hovered={hovered}
          onHover={setHovered}
          onSelect={goToProject}
        />
      </SceneBoundary>

      {/* Usage hint that turns into the hovered game's title */}
      <div className="pointer-events-none absolute left-1/2 top-[47svh] z-10 -translate-x-1/2 md:left-auto md:right-[8%] md:top-auto md:bottom-[7%] md:translate-x-0 lg:right-[13%]">
        <p
          className={`flex items-center gap-2 whitespace-nowrap rounded-full border px-3.5 py-1.5 font-mono text-[11px] backdrop-blur transition-colors ${
            hoveredTitle ? "border-accent/60 bg-bg/80 text-accent" : "border-line bg-bg/60 text-muted"
          }`}
        >
          {hoveredTitle ? (
            <>
              <MousePointerClick size={13} /> {hoveredTitle} · click to view
            </>
          ) : (
            <>
              <Move3d size={13} /> Drag to spin · click a game to view it
            </>
          )}
        </p>
      </div>
    </div>
  );
}
