# Theme Semantic Tokens

DO NOT use hardcoded Tailwind colors like:

- `bg-white`
- `text-black`
- `bg-stone-100`
- `border-zinc-200`

Always prefer semantic theme tokens.

The project uses theme-bound CSS variables mapped into Tailwind utilities.

Example:

```html
<div class="bg-background text-foreground border-border">
````

instead of:

```html
<div class="bg-white text-black border-gray-200">
```

---

# Available Semantic Color Tokens

## Base Surface Tokens

| Token                | Usage                    |
| -------------------- | ------------------------ |
| `background`         | Main page/app background |
| `foreground`         | Main text color          |
| `card`               | Card/container surface   |
| `card-foreground`    | Text inside cards        |
| `popover`            | Dropdown/modal surface   |
| `popover-foreground` | Text inside popovers     |

Example:

```html
<section class="bg-background text-foreground">
```

---

## Primary UI Tokens

| Token                  | Usage                     |
| ---------------------- | ------------------------- |
| `primary`              | Main action/button color  |
| `primary-foreground`   | Text/icons on primary     |
| `secondary`            | Secondary surfaces        |
| `secondary-foreground` | Text on secondary         |
| `accent`               | Accent/highlight surfaces |
| `accent-foreground`    | Text on accent            |

Example:

```html
<button class="bg-primary text-primary-foreground">
```

---

## Muted Tokens

| Token              | Usage             |
| ------------------ | ----------------- |
| `muted`            | Subtle background |
| `muted-foreground` | Low emphasis text |

Example:

```html
<p class="text-muted-foreground">
```

---

## Utility Tokens

| Token         | Usage                       |
| ------------- | --------------------------- |
| `border`      | Borders                     |
| `input`       | Inputs/forms                |
| `ring`        | Focus rings                 |
| `destructive` | Danger/delete/error actions |

Example:

```html
<input class="border-border bg-input ring-ring">
```

---

# Sidebar Tokens

Available sidebar-specific semantic tokens:

* `sidebar`
* `sidebar-foreground`
* `sidebar-primary`
* `sidebar-primary-foreground`
* `sidebar-accent`
* `sidebar-accent-foreground`
* `sidebar-border`
* `sidebar-ring`

Example:

```html
<aside class="bg-sidebar text-sidebar-foreground">
```

---

# Chart Tokens

Available chart colors:

* `chart-1`
* `chart-2`
* `chart-3`
* `chart-4`
* `chart-5`

Example:

```html
<div class="bg-chart-1">
```

---

# Radius Tokens

These are semantic radius values:

* `rounded-sm`
* `rounded-md`
* `rounded-lg`
* `rounded-xl`
* `rounded-2xl`
* `rounded-3xl`
* `rounded-4xl`

Avoid arbitrary radius values unless necessary.

---

# Font Tokens

| Token          | Usage                     |
| -------------- | ------------------------- |
| `font-sans`    | Main UI/body font         |
| `font-heading` | Heading font              |
| `font-display` | Decorative/editorial font |

Example:

```html
<h1 class="font-heading">
```

---

# Theme Support

These semantic tokens automatically adapt to:

* default light theme
* `.dark`
* `.homeix`
* `.lumen`

Components should remain theme-agnostic.

Never hardcode colors unless explicitly required for a unique design case.

---

# Preferred Pattern

Good:

```html
<div class="bg-card text-card-foreground border-border">
```

Bad:

```html
<div class="bg-white text-black border-gray-200">
```

---

# Rule of Thumb

Think in UI roles, not literal colors.

Ask:

* "Is this a card?"
* "Is this primary action text?"
* "Is this muted helper text?"

instead of:

* "Should this be gray?"
* "Should this be white?"

