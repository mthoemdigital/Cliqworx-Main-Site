import type { Variants } from "framer-motion";

/** Shared easing curve — matches --ease-brand token exactly. */
export const easeBrand = [0.4, 0, 0.2, 1] as const;

/** Standard reveal-on-scroll: fade + rise. Use for section headers, cards. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeBrand },
  },
};

/** Slightly faster fade for smaller UI elements (chips, icons). */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: easeBrand } },
};

/** Stagger container — wrap a list of fadeUp children with this. */
export const staggerContainer = (stagger = 0.09, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** Chevron slide-in — the brand's signature directional motion. */
export const chevronSlide: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: easeBrand },
  },
};

export const viewportOnce = { once: true, margin: "-80px" } as const;
