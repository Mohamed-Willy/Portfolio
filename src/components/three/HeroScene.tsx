"use client";

import { Component, Suspense, useMemo, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Image as DreiImage, Sparkles, useTexture } from "@react-three/drei";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";

const TEAL = "#3ef0c4";
const VIOLET = "#8b7bff";
// Slightly over-bright (> 1) so only these pick up bloom.
const TEAL_HDR = new THREE.Color(TEAL).multiplyScalar(1.8);
const VIOLET_HDR = new THREE.Color(VIOLET).multiplyScalar(1.6);

export type ShowcaseItem = { slug: string; title: string; image: string };
export type DragState = { velocity: number; dragging: boolean; moved: boolean };

const CARD_W = 1.7;
const CARD_H = 0.96;
const RING_RADIUS = 3.1;

/** Keeps one failed texture from taking down the whole scene. */
class Isolate extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function roundedRect(w: number, h: number, r: number) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

/** Soft radial gradient used for the backlight and the pedestal glow. */
function useGlowTexture(inner: string, outer: string) {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const g = c.getContext("2d")!;
    const grad = g.createRadialGradient(128, 128, 0, 128, 128, 128);
    grad.addColorStop(0, inner);
    grad.addColorStop(0.45, outer);
    grad.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 256, 256);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [inner, outer]);
}

function Portrait({ src }: { src: string }) {
  const tex = useTexture(src);

  const img = tex.image as { width: number; height: number };
  const h = 4.3;
  const w = (h * img.width) / img.height;
  const back = useGlowTexture("rgba(62,240,196,0.55)", "rgba(139,123,255,0.22)");
  return (
    <group position={[0, 0.25, 0]}>
      <mesh position={[0, 0.3, -0.8]} scale={[w * 1.6, h * 1.35, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={back} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      {/* Swallows pointer events so cards passing behind the portrait can't be clicked through it */}
      <mesh onPointerOver={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()}>
        <planeGeometry args={[w, h]} />
        <meshBasicMaterial map={tex} transparent depthWrite={false} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Pedestal() {
  const glow = useGlowTexture("rgba(62,240,196,0.5)", "rgba(62,240,196,0.08)");
  const ringA = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ringA.current) ringA.current.scale.setScalar(1 + Math.sin(clock.getElapsedTime() * 1.6) * 0.03);
  });
  return (
    <group position={[0, -1.85, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} scale={6}>
        <planeGeometry />
        <meshBasicMaterial map={glow} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={ringA} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.1, 0.016, 16, 160]} />
        <meshBasicMaterial color={TEAL_HDR} toneMapped={false} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.75, 0.008, 16, 160]} />
        <meshBasicMaterial color={VIOLET_HDR} toneMapped={false} transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

type CardProps = {
  item: ShowcaseItem;
  angle: number;
  hovered: boolean;
  onHover: (slug: string | null) => void;
  onSelect: (slug: string) => void;
  dragRef: React.RefObject<DragState>;
};

function Card({ item, angle, hovered, onHover, onSelect, dragRef }: CardProps) {
  const group = useRef<THREE.Group>(null);
  const frame = useMemo(() => roundedRect(CARD_W + 0.06, CARD_H + 0.06, 0.1), []);

  // Billboard: every card turns to face the viewer as it orbits, so none show a blank back.
  useFrame(({ camera }) => {
    if (!group.current) return;
    const s = THREE.MathUtils.lerp(group.current.scale.x, hovered ? 1.14 : 1, 0.15);
    group.current.scale.setScalar(s);
    group.current.lookAt(camera.position);
  });

  return (
    <group
      ref={group}
      position={[Math.sin(angle) * RING_RADIUS, 0, Math.cos(angle) * RING_RADIUS]}
    >
      <mesh position={[0, 0, -0.004]}>
        <shapeGeometry args={[frame]} />
        <meshBasicMaterial color={hovered ? TEAL_HDR : "#2a3050"} toneMapped={false} />
      </mesh>
      <DreiImage
        url={item.image}
        scale={[CARD_W, CARD_H]}
        radius={0.08}
        transparent
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(item.slug);
        }}
        onPointerOut={() => onHover(null)}
        onClick={(e) => {
          e.stopPropagation();
          if (!dragRef.current.moved) onSelect(item.slug);
        }}
      />
    </group>
  );
}

function Ring({
  items,
  hovered,
  onHover,
  onSelect,
  dragRef,
}: Omit<CardProps, "item" | "angle" | "hovered"> & { items: ShowcaseItem[]; hovered: string | null }) {
  const ring = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (!ring.current) return;
    const d = dragRef.current;
    const auto = hovered || d.dragging ? 0 : 0.14 * dt;
    ring.current.rotation.y += auto + d.velocity;
    if (!d.dragging) d.velocity *= 0.93;
  });
  return (
    <group rotation={[0.1, 0, 0]} position={[0, -0.75, 0]}>
      <group ref={ring}>
        {items.map((item, i) => (
          <Card
            key={item.slug}
            item={item}
            angle={(i / items.length) * Math.PI * 2}
            hovered={hovered === item.slug}
            onHover={onHover}
            onSelect={onSelect}
            dragRef={dragRef}
          />
        ))}
      </group>
    </group>
  );
}

/** Places the scene: right side on desktop, top on mobile. Static; it does not follow the mouse. */
function Stage({ children }: { children: React.ReactNode }) {
  const { viewport } = useThree();
  const wide = viewport.aspect > 1.1;
  const x = wide ? viewport.width * 0.31 : 0;
  const y = wide ? -0.15 : viewport.height * 0.22;
  // On phones the ring is allowed to run past the screen edges so the portrait stays large.
  const scale = wide ? Math.min(0.85, viewport.width / 15) : Math.min(0.62, viewport.width / 5.4);
  return (
    <group position={[x, y, 0]} scale={scale}>
      {children}
    </group>
  );
}

export default function HeroScene({
  active,
  dragRef,
  items,
  portrait,
  hovered,
  onHover,
  onSelect,
}: {
  active: boolean;
  dragRef: React.RefObject<DragState>;
  items: ShowcaseItem[];
  portrait: string;
  hovered: string | null;
  onHover: (slug: string | null) => void;
  onSelect: (slug: string) => void;
}) {
  const [ready, setReady] = useState(false);
  return (
    <Canvas
      frameloop={active ? "always" : "demand"}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.5, 9.5], fov: 38 }}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      onCreated={() => setReady(true)}
      style={{ opacity: ready ? 1 : 0, transition: "opacity 1s ease" }}
    >
      <color attach="background" args={["#07080d"]} />
      <fog attach="fog" args={["#07080d", 8.5, 15]} />

      <Stage>
        {/* Separate boundaries: the portrait appears as soon as it loads, without waiting on every card */}
        <Isolate>
          <Suspense fallback={null}>
            <Portrait src={portrait} />
          </Suspense>
        </Isolate>
        <Isolate>
          <Suspense fallback={null}>
            <Ring items={items} hovered={hovered} onHover={onHover} onSelect={onSelect} dragRef={dragRef} />
          </Suspense>
        </Isolate>
        <Pedestal />
        <Sparkles count={50} scale={[9, 6, 6]} size={2} speed={0.3} color={TEAL} opacity={0.6} />
      </Stage>

      <EffectComposer multisampling={4}>
        <Bloom mipmapBlur luminanceThreshold={1} intensity={0.8} radius={0.6} />
        <Vignette eskil={false} offset={0.25} darkness={0.7} />
      </EffectComposer>
    </Canvas>
  );
}
