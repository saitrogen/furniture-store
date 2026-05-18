# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # start dev server (localhost:4321)
pnpm build        # production build — run this to verify before finishing any task
pnpm preview      # preview the production build
```

There are no lint or test scripts. `pnpm build` is the verification step — a clean build with zero errors is the definition of "done".

## Project overview

HOMEIX is a static Astro e-commerce site for a furniture brand. No cart, no auth, no backend — enquiries go via WhatsApp. It uses React only for interactive islands (carousel, header, category grid).

**Stack:** Astro 6 · React 19 · Tailwind CSS v4 · TypeScript strict mode · pnpm

**Active branch:** `new-2` — this is a full UI rewrite; the old UI components in `/src/components/react/ShadcnNavbar.tsx`, `/src/components/Welcome.astro` etc. are legacy and unused.

## Architecture

### Data flow (critical to understand)

All page data comes from **two sources** that must never be mixed:

1. **`src/content/localData/`** — curated, hand-edited files for every UI section. Each file owns one section's data and exports typed interfaces that the matching component imports. This is the source of truth for the new UI.

   | File | Owns |
   |------|------|
   | `nav.ts` | Header navigation (`navLinks`, `navSections`) |
   | `hero.ts` | Hero banner slides + trust badges |
   | `shopCategories.ts` | Category grid tiles |
   | `carousels.ts` | Carousel configs (title, subtitle, product IDs) |
   | `bento.ts` | Bento grid tiles |

2. **`src/content/data/new/product.json`** — 20 products (P001–P020) with id, name, slug, department, type, price, image, rating. Read via `src/lib/catalog.ts` helpers. The carousel data files reference product IDs; `index.astro` resolves them at build time.

**Rule:** UI components are completely dumb — they accept props only, never import data directly. Data is resolved in pages (`.astro` files) and passed as props.

### Component conventions

- **Interactive components → React** (`src/components/react/`), mounted with `client:load`
- **Static/layout components → Astro** (`src/components/`)
- Types for a component are defined **in the component file itself**, then imported by its `localData/` file with `import type`
- Comments use `/* Short form */` — never `/* ─── Long decorated form ─── */`

### Navigation hierarchy (3 levels)

```
NavSection[]          ← strip items: Furniture | Lighting | Outdoor | Home Décor | Sale
  .groups: NavGroup[] ← mega-menu columns: Living Room | Bedroom | Dining…
    .items: NavType[] ← product type links: Sofas | Beds | Dining Tables…
```

The strip renders `navSections` directly (not flattened departments). Group headings link to `/collection/[group.slug]`; type items link to `/collection/[group.slug]/[type.slug]`.

### Styling rules

- **Always use semantic tokens** — never raw Tailwind colors like `bg-white` or `text-black`. Token reference is in `DESGIN.md`.
- Key tokens: `bg-background`, `text-foreground`, `bg-muted`, `text-muted-foreground`, `border-border`, `bg-primary`, `text-primary-foreground`, `bg-card`, `bg-secondary`, `bg-accent`
- Font tokens: `font-sans` (Geist), `font-heading` / `font-display` (Cormorant Garamond)
- Active theme class on `<html>`: `lumen` (warm cream palette defined in `global.css`)
- Tailwind v4 canonical class names — the linter will suggest e.g. `aspect-4/3` over `aspect-[4/3]`, `bg-linear-to-t` over `bg-gradient-to-t`

### Routing

All routes are static, file-based:
- `/` → `src/pages/index.astro`
- `/collection/[department]` → `src/pages/collection/[department].astro`
- `/collection/[department]/[type]` → `src/pages/collection/[department]/[type].astro`
- `/products/[slug]` → `src/pages/products/[slug].astro`
- `/catalog.json` and `/search-index.json` are generated API endpoints

### Layout

`src/layouts/BaseLayout.astro` wraps every page. It mounts `SiteHeader` (React, `client:load`) with `navLinks` and `navSections` from `localData/nav.ts`, and renders `Footer.astro`. Material Symbols Outlined is loaded globally via Google Fonts here — use `<span class="material-symbols-outlined">icon_name</span>` anywhere.
