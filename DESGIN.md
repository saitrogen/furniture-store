# Furniture Store Template Design Guide

This project uses a **Warm Craft** design system built on shadcn-style semantic tokens and Tailwind CSS v4 theme variables.

The goal is simple:
- Keep the logic reusable.
- Keep the UI visually flexible.
- Make theme changes easy by changing tokens, not components.

---

## 1. Design philosophy

This template should feel:
- Warm.
- Calm.
- Premium.
- Tactile.
- Trustworthy.

It should not feel:
- Loud.
- Flashy.
- Overdesigned.
- Too trendy.
- Too “tech product”.

For a furniture store, the visuals should suggest materials, craftsmanship, and space.

---

## 2. Brand system structure

Use three layers:

### Core layer
This is the layout, sections, routing, and business logic.

Examples:
- Header.
- Hero.
- Collection grid.
- Product cards.
- Inquiry form.
- Footer.

This layer should stay mostly unchanged across clients.

### Theme layer
This is the token layer in `global.css`.

Examples:
- `--background`
- `--foreground`
- `--primary`
- `--card`
- `--muted`
- `--border`
- `--radius`

Change these when you want a different visual identity.

### Surface layer
This is the actual Tailwind classes used in pages and components.

Examples:
- `bg-background`
- `text-foreground`
- `bg-card`
- `text-muted-foreground`
- `border-border`
- `bg-primary`
- `text-primary-foreground`

This layer should always use semantic classes, never raw hex colors.

---

## 3. Your theme meaning

### Light theme
The light theme is the default “Warm Craft” presentation.

It should feel like:
- Soft daylight.
- Neutral walls.
- Oak, walnut, linen, stone.
- A boutique showroom.

### Dark theme
The dark theme should feel:
- Rich.
- Moody.
- Refined.
- Not harsh black.

Use it for:
- Premium furniture brands.
- Evening showroom mood.
- Luxury collections.
- Editorial-style browsing.

---

## 4. Token usage rules

Your `global.css` already defines the system correctly.

Use these tokens like this:

### Page background
Use:
- `bg-background`

Use for:
- `<body>`
- full-page wrappers
- main site canvas

Do not use raw background colors unless you are making a special section.

### Main text
Use:
- `text-foreground`

Use for:
- body text
- headings when no special treatment is needed
- general page copy

### Secondary text
Use:
- `text-muted-foreground`

Use for:
- captions
- helper text
- metadata
- small descriptions
- labels
- section overlines

### Card and surface blocks
Use:
- `bg-card`
- `border-border`

Use for:
- product cards
- info cards
- form panels
- testimonial cards
- pricing cards

### Primary actions
Use:
- `bg-primary`
- `text-primary-foreground`

Use for:
- main CTA buttons
- featured badges
- key highlights
- active states

### Secondary actions
Use:
- `bg-secondary`
- `text-secondary-foreground`

Use for:
- less important buttons
- supporting chips
- alternate highlights

### Accent surface
Use:
- `bg-accent`
- `text-accent-foreground`

Use for:
- hover highlights
- soft callouts
- small decorative blocks

### Inputs
Use:
- `bg-background`
- `border-input`
- `focus:border-ring`

Use for:
- form fields
- search bars
- newsletter forms
- contact forms

---

## 5. Typography rules

You already set:
- `font-sans` for body text.
- `font-heading` / `font-display` for headings.

### Use `font-display` for:
- H1
- H2
- H3
- hero statements
- section titles
- product names when you want a refined feel

### Use `font-sans` for:
- body copy
- buttons
- labels
- navigation
- form text
- utility content

### Headline style
Headings should feel elegant and balanced.

Recommended styles:
- `font-display`
- `tracking-[-0.03em]`
- `leading-tight`
- `text-wrap: balance`

Use large sizes for the hero, smaller sizes for cards and section titles.

### Body style
Body copy should be easy to read.

Recommended styles:
- `font-sans`
- `leading-7`
- `text-muted-foreground` for secondary text
- `max-w-prose` or `max-w-2xl` for long copy

---

## 6. Where to use which classes

### H1
Use:
- `font-display text-5xl md:text-7xl leading-tight tracking-[-0.03em]`

Good for:
- homepage hero
- design test page title
- major landing page statements

### H2
Use:
- `font-display text-3xl md:text-5xl leading-tight`

Good for:
- section headings
- collection titles
- product group headings

### H3
Use:
- `font-display text-2xl md:text-3xl`

Good for:
- product names
- feature cards
- content blocks

### Paragraphs
Use:
- `text-base md:text-lg leading-7 text-muted-foreground`

Good for:
- descriptions
- supporting copy
- intro text

### Small labels
Use:
- `text-sm uppercase tracking-[0.2em] text-muted-foreground`

Good for:
- section tags
- overlines
- category labels

### Buttons
Use:
- Main button: `bg-primary text-primary-foreground`
- Secondary button: `border border-border bg-transparent text-foreground`

Shape:
- `rounded-full` for softer premium feel
- `rounded-xl` for forms and utility buttons

---

## 7. Layout rules

### Overall width
Use:
- `mx-auto max-w-6xl px-6 md:px-10`

This keeps the site centered and editorial.

### Section spacing
Use:
- `py-16`
- `py-20`
- `py-24`

Do not crowd sections together.

### Grid rules
Use:
- `grid gap-6`
- `md:grid-cols-2`
- `xl:grid-cols-4`

Furniture content works well in cards and collections.

### Card spacing
Use:
- `p-5`
- `p-6`
- `rounded-2xl`
- `rounded-3xl`

Cards should feel calm and soft, not sharp.

---

## 8. Photography direction

Use photography that shows:
- Materials.
- Grain.
- Texture.
- Joinery.
- Real interiors.
- Daylight.
- Calm backgrounds.

Avoid:
- Generic stock photos.
- Busy rooms.
- Over-saturated filters.
- Loud staging.
- Hard shadows unless intentional.

If you use product placeholders, make them feel like material boards or soft gradients, not random colored boxes.

---

## 9. Motion rules

Motion should be subtle.

Use:
- short fades
- soft hover changes
- gentle border or shadow transitions

Avoid:
- bouncing animations
- dramatic motion
- flashy parallax
- too much delay

Recommended classes:
- `transition`
- `duration-200`
- `hover:opacity-90`
- `hover:bg-card`
- `hover:shadow-sm`

---

## 10. Dark mode rules

Dark mode is controlled by the `.dark` class.

When dark mode is active:
- Keep contrast readable.
- Keep surfaces slightly lighter than the page background.
- Keep primary color warm, not neon.
- Use softer borders and muted secondary text.

Use dark mode for:
- luxury themes
- evening browsing
- premium showroom moods

Do not make dark mode pure black unless the brand specifically wants that.

---

## 11. Component guidance

### Header
Use:
- `bg-background`
- `border-b border-border`
- `text-foreground`

Keep it simple and elegant.

### Hero
Use:
- `font-display`
- large headline
- muted supporting copy
- one primary CTA
- one secondary CTA

### Product cards
Use:
- `bg-card`
- `border border-border`
- `rounded-3xl`
- `shadow-sm`
- `overflow-hidden`

Inside the card:
- image area on top
- product name
- short descriptor
- price or category

### Forms
Use:
- `bg-card`
- `border border-border`
- `rounded-2xl`
- `border-input` on inputs
- `focus:border-ring`

Forms should feel soft and trustworthy.

### Footer
Use:
- `bg-background`
- `text-muted-foreground`
- `border-t border-border`

Keep footer content simple and informational.

---

## 12. Classes to prefer

Prefer these semantic classes:
- `bg-background`
- `text-foreground`
- `bg-card`
- `text-muted-foreground`
- `bg-primary`
- `text-primary-foreground`
- `border-border`
- `border-input`
- `focus:border-ring`
- `bg-secondary`
- `bg-accent`

These are safer because they work across themes.

---

## 13. Classes to avoid

Avoid hardcoding raw palette classes like:
- `bg-stone-200`
- `text-zinc-900`
- `border-gray-300`

Avoid using too many one-off values unless you are testing.

Avoid:
- random gradients everywhere
- too many shadows
- too many border radii
- bright accent overload

The template should look curated, not busy.

---

## 14. What to do when creating a new section

Before building any section, ask:

1. Is this a main surface or a support surface?
2. Is this text primary or muted?
3. Is this action primary or secondary?
4. Should the surface use `card`, `background`, or `accent`?
5. Does the spacing feel generous enough?

If the answer is unclear, default to:
- `bg-card`
- `text-muted-foreground`
- `border-border`
- `rounded-2xl`
- `shadow-sm`

That keeps the design consistent.

---

## 15. Starter page order

Build in this order:
1. Header
2. Hero
3. Collection grid
4. Product cards
5. Feature blocks
6. Inquiry form
7. Footer

This gives the fastest path to a complete furniture storefront.

---

## 16. Summary of the system

This template is built to be:
- easy to theme,
- easy to reuse,
- easy to sell,
- easy to maintain.

The rule is simple:
- Use tokens in `global.css` for design decisions.
- Use semantic Tailwind classes in components.
- Only swap token values when changing brand style.

That is how the template stays flexible without becoming messy.