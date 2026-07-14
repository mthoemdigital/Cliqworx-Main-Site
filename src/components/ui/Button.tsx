import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Chevron } from "./Chevron";

type Variant = "primary" | "ghost-dark" | "ghost-light" | "on-gradient";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-display font-semibold rounded-md transition-all duration-200 ease-brand focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-cliq-purple text-cliq-white shadow-cliq-accent hover:bg-cliq-violet hover:-translate-y-0.5",
  "ghost-dark":
    "border border-white/25 text-cliq-white hover:border-white/60 hover:-translate-y-0.5",
  "ghost-light":
    "border border-cliq-black/20 text-cliq-black hover:border-cliq-black hover:-translate-y-0.5",
  "on-gradient":
    "bg-cliq-white text-cliq-purple hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(17,17,17,0.24)]",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-3 text-sm",
  lg: "px-6 py-3.5 text-base",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  showChevron?: boolean;
};

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
  onClick?: never;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { children, variant = "primary", size = "md", className = "", showChevron } = props;
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  const arrow = showChevron ? <Chevron className="size-3.5" strokeWidth={2.5} /> : null;

  if ("href" in props && props.href) {
    const { href, external } = props;
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {children}
          {arrow}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
        {arrow}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  const domProps = { ...buttonProps } as Record<string, unknown>;
  delete domProps.variant;
  delete domProps.size;
  delete domProps.className;
  delete domProps.showChevron;
  delete domProps.children;
  delete domProps.type;

  return (
    <button type={buttonProps.type ?? "button"} className={classes} {...domProps}>
      {children}
      {arrow}
    </button>
  );
}
