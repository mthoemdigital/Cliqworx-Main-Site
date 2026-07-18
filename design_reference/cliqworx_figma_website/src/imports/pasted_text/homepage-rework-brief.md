# Cliqworx Homepage Rework Brief

## Tech stack (locked)
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Framer Motion
- GSAP
- Lenis (smooth scroll)
- React Three Fiber + Drei (hero render, any 3D/WebGL elements)
- Motion One (optional, for lightweight micro-interactions where Framer is overkill)
- Lottie (for any pre-authored vector animation, not hero)
- Lucide Icons

Notes on usage:
- Lenis wraps the whole page for scroll smoothing, needed for the section-rhythm
  pacing this brief calls for
- GSAP + ScrollTrigger for the scroll-tied reveals (stats counting up, section
  transitions, timeline/Work System steps animating in)
- Framer Motion for component-level interaction states and page transitions
- R3F/Drei is the answer to the hero illustration problem below — build the actual
  abstract 3D/glass/network render in R3F rather than approximating it with CSS or a
  static image. This is the highest-leverage brand-distinctiveness fix available with
  this stack.
- shadcn/ui as the component base, restyled through cliqworx-brand-guardian tokens,
  not shadcn defaults

## Assets
- Logo: place at public/logos/Group3900-b.svg, reference from nav component

## Fourth reference (jankelley.com — nav mega-menu mechanics and 3D hero treatment only)
- Mega-menu structure: multi-column dark dropdown panel, category header bold,
  sub-items listed underneath, appears on hover under the nav bar. Use this
  interaction pattern for the Strategy/Build/Growth dropdowns, not jankelley's
  actual content or column count
- 3D hero visual reference (inverted particle-mesh cone, pink/purple/blue gradient
  on dark background): this is the target aesthetic for a generative WebGL visual
  moment on the site, built in R3F/Drei — not a static image or CSS gradient.
  Consider this as an alternate/additional hero treatment or major section divider,
  giving the brand-distinctiveness fix (flagged earlier) a more premium, specific
  execution than a flat card or dashboard mockup

## Third reference (screenshot only — IA is outdated, do not follow its structure)
This reference uses an old nav (Home/Services/Industries/Case Studies/About/Insights)
and the hero headline "Transform. Build. Grow. Repeat." — both conflict with the
locked IA and the instruction to remove decorative Transform/Build/Grow language.
Ignore its nav, hero copy, and closing CTA copy entirely. Pull only these elements:
- Layered translucent slab illustration (Strategy/Technology/Growth slabs stacked
  with depth, each wired via a connector line to a labeled tag) — use as the visual
  reference for the R3F hero render. This is a stronger literal execution of the
  "layers" motif than either other build and should inform the geometry/composition,
  not just the original's monitor render
- Real photography in the case studies section (physical product/environment shots)
  as texture alongside or instead of pure dashboard-mockup stat cards, to avoid the
  proof section feeling entirely abstract
- FAQ accordion section before the final CTA — neither other build has this, add it

## Context
Two competing builds were compared: the current cliqworx.co.za and a Lovable prototype
(cliq-growth-studio.lovable.app). Decision: rebuild the homepage taking ~80% structure
from the Lovable version and ~20% signature visual elements from the original.
This is not a redesign from scratch — it is a targeted merge. Follow the split below exactly.

## Take from Lovable (structure, IA, copy pattern)
- Site is two pages only: Homepage (single scroll, all sections) + Contact page.
  No separate pages per capability or industry.
- Nav (final): Logo (left) — Strategy [dropdown] — Build [dropdown] — Growth [dropdown]
  — CTA button (right, "Book a Consultation")
  - "Build" is the nav label replacing "Technology" from the prior locked IA —
    confirmed by the user, content underneath is unchanged (Web Applications,
    Website Design & Build, AI-Powered Solutions, Automation, CRM & Systems
    Integrations, SEO & CRO)
  - Top-level nav words (Strategy, Build, Growth) are real clickable links that
    scroll-anchor to their homepage section
  - Dropdown panels appear on hover, mega-menu style (reference: jankelley.com
    screenshots provided) — panel content is NOT clickable, informational only,
    since there are no dedicated sub-pages
  - Strategy dropdown sub-items: Digital Strategy, Digital Transformation,
    Fractional Product Management, AI Readiness & Strategy, Customer Experience,
    Process Optimisation, plus Industries as a sub-item (Education, Financial
    Services/Financial Inclusion, Transport & Logistics, Healthtech, E-commerce, SMEs)
  - Build dropdown sub-items: Web Applications, Website Design & Build, AI-Powered
    Solutions, Automation, CRM & Systems Integrations, SEO & CRO
  - Growth dropdown sub-items: Performance Marketing, Lead Generation, Marketing
    Automation, Landing Pages, Analytics & Reporting, AI-Assisted Optimisation
  - Case Studies is a homepage scroll-anchor section, not a nav dropdown or
    separate page — link it from the CTA/footer, does not need its own top-level
    nav slot given the three-pillar nav above
- This nav supersedes the earlier "Strategy/Technology/Growth/Case Studies/About"
  five-item nav referenced from the Lovable build. Do not implement both.
- Section flow: Hero (with stats) -> Problems/Capabilities per tab -> Operating model
  (Diagnose/Design/Build/Scale) -> Proof -> Technology stack -> CTA
- The Work System renaming: Diagnose -> Design -> Build -> Scale, replacing any
  "Transform / Build / Grow" labeling used as decoration
- Hero stats block: +41% conversion, -48% CPA, 3.2x lead growth, 24h response time,
  placed above the fold, before the "trusted by" logo row
- Case study treatment: challenge / approach / outcome narrative structure with hard
  numbers, not small proof cards
- CTA copy pattern: benefit-forward ("Thirty minutes. One honest read on where to go
  next.") not generic ("Book a Call")
- Lead form: keep the qualifying radio buttons (Strategy/Technology/Growth/Not sure yet)
  inline on page rather than routing straight to Calendly

## Take from original cliqworx.co.za (signature visual elements)
- Hero: the layered/monitor render treatment — do not let hero go pure typography
- "What does your business need next?" self-segmentation grid (6 intent cards) —
  insert directly after hero stats, before the tab-by-tab capability sections.
  This lets visitors self-route by problem before methodology is explained.
- Alternating light/dark section rhythm — break up Lovable's all-dark scroll with at
  least one light section to avoid monotone fatigue over a long page

## Critical constraint: brand distinctiveness
Lovable's structure currently reads as generic dark-mode SaaS (Linear/Vercel/Raycast
territory) — if the logo were removed, it would not read as Cliqworx. This is the
single biggest risk in taking 80% of that build. Do not just port structure —
enforce cliqworx-brand-guardian token-level identity on top of it:
- Purple, radii, hover direction, eyebrow tracking per brand-guardian (overrides
  cliqworx-design where they conflict)
- Motion/animation should feel Cliqworx-specific, not templated
- Hero illustration should not be a generic dashboard render — go abstract 3D
  layers, AI nodes, glass geometry, or network render tied to brand color system,
  built in R3F/Drei so it's real geometry and lighting, not a static asset

## Build instruction for Claude Code
1. Load cliqworx-brand-guardian and cliqworx-design skills first, brand-guardian is canonical
2. Scaffold the Next.js 15 App Router project on the locked stack above, Lenis wrapper first
3. Scaffold the IA and section flow from the Lovable structure above
4. Build the R3F hero render and the self-segmentation grid per the "take from
   original" list — these are the two elements most responsible for brand distinctiveness
5. Wire GSAP ScrollTrigger reveals for stats, timeline, and section transitions
6. Pass every section through brand-guardian token check before considered done —
   specifically check it doesn't read as generic SaaS template
7. Primary CTA stays "Book a Consultation" throughout
8. No em dashes in any copy