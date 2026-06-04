"use client";

// LIEVITA — kinetic primitives shared across screens
// Marquee · Cursor · CtaRound · Btn · Reveal · IntroLoader · NavLink · Pill

import {
  createElement,
  Fragment,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { useNavigate } from "@/lib/store";

// ─── Custom cursor ──────────────────────────────────────────────────
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [drag, setDrag] = useState(false);
  const [hover, setHover] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let raf = 0;
    let x = 0;
    let y = 0;
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!ref.current) return;
        ref.current.style.transform = `translate(${x - 15}px, ${y - 15}px)`;
        const t = e.target as Element | null;
        setDrag(!!t?.closest?.("[data-cursor-drag]"));
        setHover(!!t?.closest?.("a, button, [role=button], input, textarea, [data-cursor-hover]"));
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <div ref={ref} className={`lv-cursor ${drag ? "is-drag" : ""} ${hover && !drag ? "is-hover" : ""}`}>{drag ? "DRAG" : ""}</div>;
}

// ─── Intro curtain (first paint only) ───────────────────────────────
export function IntroLoader() {
  const [out, setOut] = useState(false);
  useEffect(() => {
    const seen = sessionStorage.getItem("lv_intro_seen");
    if (seen) {
      setOut(true);
      return;
    }
    const t = setTimeout(() => {
      setOut(true);
      sessionStorage.setItem("lv_intro_seen", "1");
    }, 900);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className={`lv-curtain ${out ? "is-out" : ""}`} aria-hidden>
      <div className="mark">LIEVITA</div>
    </div>
  );
}

// ─── Marquee ────────────────────────────────────────────────────────
export function Marquee({
  words = ["FORNO A LEGNA", "LIEVITO MADRE", "100% CALABRESE", "TROPEA"],
  color = "yellow",
  direction = "left",
  tilt = "down",
  thin = false,
}: {
  words?: string[];
  color?: "yellow" | "green" | "blue" | "white";
  direction?: "left" | "right";
  tilt?: "down" | "up";
  thin?: boolean;
}) {
  const items = (
    <span>
      {words.map((w, i) => (
        <Fragment key={i}>
          {w}
          <span className="dot" />
        </Fragment>
      ))}
    </span>
  );
  return (
    <div className={`lv-marquee lv-marquee--${color} ${thin ? "lv-thin-marquee" : ""}`}>
      <div className={`lv-marquee-band ${thin ? "" : tilt === "up" ? "lv-marquee-band--tilt-up" : "lv-marquee-band--tilt-down"}`}>
        <div className={`lv-marquee-track lv-marquee-track--${direction}`}>
          {items}
          {items}
          {items}
          {items}
        </div>
      </div>
    </div>
  );
}

// ─── Round CTA ──────────────────────────────────────────────────────
export function CtaRound({
  children,
  variant = "yellow",
  onClick,
  className = "",
  style,
}: {
  children: ReactNode;
  variant?: "yellow" | "dark" | "blue" | "white";
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
}) {
  const v =
    variant === "dark"
      ? "lv-cta-round--dark"
      : variant === "blue"
      ? "lv-cta-round--blue"
      : variant === "white"
      ? "lv-cta-round--white"
      : "";
  return (
    <button onClick={onClick} className={`lv-cta-round ${v} ${className}`} style={style}>
      <span>{children}</span>
    </button>
  );
}

// ─── Sharp button ───────────────────────────────────────────────────
export function Btn({
  children,
  variant = "yellow",
  size = "md",
  onClick,
  type,
  disabled,
  href,
  className = "",
  ...rest
}: {
  children: ReactNode;
  variant?: "yellow" | "dark" | "blue" | "white" | "ghost" | "ghost-dark";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  href?: string;
  className?: string;
  [key: string]: unknown;
}) {
  const cls = `lv-btn ${variant !== "yellow" ? "lv-btn--" + variant : ""} ${
    size === "lg" ? "lv-btn--lg" : size === "sm" ? "lv-btn--sm" : ""
  } ${className}`;
  if (href)
    return (
      <a href={href} className={cls} {...rest}>
        {children}
      </a>
    );
  return (
    <button onClick={onClick} type={type} disabled={disabled} className={cls} {...rest}>
      {children}
    </button>
  );
}

// ─── NavLink ────────────────────────────────────────────────────────
export function NavLink({
  to,
  children,
  active,
  onClick,
}: {
  to?: string;
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  const nav = useNavigate();
  return (
    <button
      onClick={() => {
        onClick?.();
        if (to) nav(to);
      }}
      className={`lv-link ${active ? "is-active" : ""}`}
    >
      {children}
    </button>
  );
}

// ─── Reveal on scroll ───────────────────────────────────────────────
export function Reveal({
  children,
  className = "",
  stagger = false,
  as = "div",
  once = true,
  threshold = 0.15,
}: {
  children: ReactNode;
  className?: string;
  stagger?: boolean;
  as?: keyof JSX.IntrinsicElements;
  once?: boolean;
  threshold?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            if (once) io.unobserve(el);
          } else if (!once) {
            setShown(false);
          }
        });
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once, threshold]);
  return createElement(
    as,
    {
      ref,
      className: `${stagger ? "lv-reveal-stagger" : "lv-reveal"} ${shown ? "is-in" : ""} ${className}`,
    },
    children
  );
}

// ─── Status pill ────────────────────────────────────────────────────
export function StatusPill({
  state = "open",
  children,
}: {
  state?: "open" | "closed" | "neutral";
  children: ReactNode;
}) {
  return (
    <span className={`lv-pill lv-pill--${state}`}>
      <span className="dot" />
      {children}
    </span>
  );
}

// ─── Doodle squiggle (decorative SVG) ───────────────────────────────
export function Squiggle({
  className = "",
  color = "var(--bk-teal)",
  style,
}: {
  className?: string;
  color?: string;
  style?: CSSProperties;
}) {
  return (
    <svg viewBox="0 0 200 60" className={className} style={style} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round">
      <path d="M5 30 Q 25 5, 45 30 T 85 30 T 125 30 T 165 30 T 195 30" />
    </svg>
  );
}

export function ArrowDoodle({
  className = "",
  color = "var(--bk-teal)",
  style,
}: {
  className?: string;
  color?: string;
  style?: CSSProperties;
}) {
  return (
    <svg viewBox="0 0 160 100" className={className} style={style} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 30 Q 60 5, 100 35 Q 125 55, 70 65 Q 30 70, 40 90" />
      <path d="M30 80 L40 90 L52 86" />
    </svg>
  );
}

export function StarDoodle({
  className = "",
  color = "var(--bk-yellow)",
  style,
}: {
  className?: string;
  color?: string;
  style?: CSSProperties;
}) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} fill={color} stroke={color} strokeWidth="1">
      <path d="M50 5 L60 38 L95 42 L66 60 L78 95 L50 75 L22 95 L34 60 L5 42 L40 38 Z" />
    </svg>
  );
}
