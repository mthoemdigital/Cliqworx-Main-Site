"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

/**
 * Wraps the whole page in Lenis smooth scrolling and routes same-page anchor
 * clicks (href="#id" or "/#id") through lenis.scrollTo so section pacing
 * matches the design. Disabled entirely under prefers-reduced-motion.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    function onClick(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href) return;
      const hashIndex = href.indexOf("#");
      if (hashIndex === -1) return;
      const pathPart = href.slice(0, hashIndex);
      if (pathPart && pathPart !== "/" && pathPart !== window.location.pathname) return;
      if (pathPart === "/" && window.location.pathname !== "/") return;
      const id = href.slice(hashIndex + 1);
      const el = id ? document.getElementById(id) : null;
      if (!el) return;
      e.preventDefault();
      history.pushState(null, "", `#${id}`);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
      lenis.scrollTo(el, { offset: -72 });
    }
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
