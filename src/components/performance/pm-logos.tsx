/* Recognizable coloured brand marks for the "platforms we optimise" strip.
   Simplified SVG glyphs in each platform's real colours (nominative use). */

import type { ReactNode } from "react";

export type Platform = { name: string; mark: ReactNode };

const box = (children: ReactNode) => (
  <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
    {children}
  </svg>
);

export const platforms: Platform[] = [
  {
    name: "Google Ads",
    mark: box(
      <>
        <rect x="3" y="3.2" width="5.4" height="17.6" rx="2.7" transform="rotate(-30 5.7 12)" fill="#FBBC04" />
        <rect x="15.6" y="3.2" width="5.4" height="17.6" rx="2.7" transform="rotate(30 18.3 12)" fill="#4285F4" />
        <circle cx="6" cy="18" r="2.9" fill="#34A853" />
      </>
    ),
  },
  {
    name: "Meta",
    mark: box(
      <path
        d="M2 14.5c0-4 2-7.5 4.6-7.5 1.9 0 3.2 1.7 4.4 4 1.2-2.3 2.5-4 4.4-4C22 7 24 10.5 24 14.5c0 2.4-1.2 4-3 4-1.7 0-2.8-1.3-4-3.6C15.8 12.4 14.6 11 12 11s-3.8 1.4-5 3.9C5.8 17.2 4.7 18.5 3 18.5c-1.8 0-3-1.6-3-4z"
        fill="#0866FF"
        transform="scale(0.85) translate(2 1)"
      />
    ),
  },
  {
    name: "TikTok",
    mark: box(
      <>
        <path d="M12.8 2h2.6c.2 1.9 1.3 3.4 3.2 3.7v2.6c-1.2 0-2.3-.3-3.2-.9v5.9c0 3-2.1 5.2-4.9 5.2S5.6 16.3 5.6 13.4c0-2.7 2-4.9 4.7-5v2.7c-1.2.1-2.1 1-2.1 2.3 0 1.3 1 2.3 2.2 2.3 1.3 0 2.3-1 2.3-2.5V2z" fill="#25F4EE" transform="translate(-.8 .4)" />
        <path d="M12.8 2h2.6c.2 1.9 1.3 3.4 3.2 3.7v2.6c-1.2 0-2.3-.3-3.2-.9v5.9c0 3-2.1 5.2-4.9 5.2S5.6 16.3 5.6 13.4c0-2.7 2-4.9 4.7-5v2.7c-1.2.1-2.1 1-2.1 2.3 0 1.3 1 2.3 2.2 2.3 1.3 0 2.3-1 2.3-2.5V2z" fill="#FE2C55" transform="translate(.8 -.2)" />
        <path d="M12.8 2h2.6c.2 1.9 1.3 3.4 3.2 3.7v2.6c-1.2 0-2.3-.3-3.2-.9v5.9c0 3-2.1 5.2-4.9 5.2S5.6 16.3 5.6 13.4c0-2.7 2-4.9 4.7-5v2.7c-1.2.1-2.1 1-2.1 2.3 0 1.3 1 2.3 2.2 2.3 1.3 0 2.3-1 2.3-2.5V2z" fill="#0A0A0F" />
      </>
    ),
  },
  {
    name: "LinkedIn Ads",
    mark: box(
      <>
        <rect x="1.5" y="1.5" width="21" height="21" rx="4" fill="#0A66C2" />
        <path d="M6 9.5h2.6V18H6zM7.3 5.4a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10.4 9.5H13v1.2c.4-.7 1.3-1.4 2.7-1.4 2.3 0 3.3 1.4 3.3 3.9V18h-2.6v-4.3c0-1.1-.4-1.8-1.4-1.8-1 0-1.5.7-1.5 1.8V18h-2.6z" fill="#fff" />
      </>
    ),
  },
  {
    name: "Google Analytics 4",
    mark: box(
      <>
        <rect x="16.5" y="3" width="4.5" height="18" rx="2.25" fill="#F9AB00" />
        <rect x="9.75" y="9" width="4.5" height="12" rx="2.25" fill="#E37400" />
        <circle cx="5.25" cy="18.2" r="2.6" fill="#E37400" />
      </>
    ),
  },
  {
    name: "Microsoft Clarity",
    mark: box(
      <>
        <circle cx="12" cy="12" r="9.5" fill="none" stroke="#1B98E0" strokeWidth="2.4" />
        <circle cx="12" cy="12" r="3.4" fill="#0B5FA5" />
      </>
    ),
  },
  {
    name: "Search Console",
    mark: box(
      <>
        <circle cx="10" cy="10" r="6.2" fill="none" stroke="#4285F4" strokeWidth="2.6" />
        <line x1="14.6" y1="14.6" x2="21" y2="21" stroke="#EA4335" strokeWidth="2.8" strokeLinecap="round" />
        <path d="M7 10.3l2 2 3.8-4" fill="none" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    name: "Hotjar",
    mark: box(
      <path
        d="M8 2c0 4 4 4.5 4 8.5 0 1.6-.9 2.7-2 3 .4-1.2.1-2.6-1-3.6C6.5 15 6 17 6 18.6 6 21.6 8.7 24 12 24s6-2.4 6-5.7c0-5.3-4.2-6.9-4.2-11C13.8 4.4 11.5 2.6 8 2z"
        fill="#FF3C00"
      />
    ),
  },
  {
    name: "Tag Manager",
    mark: box(
      <>
        <path d="M12 1.8l10.2 10.2L12 22.2 1.8 12z" fill="#8AB4F8" />
        <path d="M12 1.8l4.2 4.2L6 16.2 1.8 12z" fill="#4285F4" />
        <circle cx="12" cy="12" r="2.2" fill="#fff" />
      </>
    ),
  },
  {
    name: "Looker Studio",
    mark: box(
      <>
        <path d="M3 15a6 6 0 016-6h1v6a6 6 0 01-6 6H3z" fill="#34A853" />
        <path d="M10 9a6 6 0 016-6h1v6a6 6 0 01-6 6h-1z" fill="#FBBC04" />
        <circle cx="18.5" cy="17" r="3" fill="#4285F4" />
      </>
    ),
  },
];
