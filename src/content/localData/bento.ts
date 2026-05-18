export type BentoTheme = "dark" | "primary" | "muted"

export interface BentoCta {
  label: string
  href: string
}

export interface BentoTile {
  id: string
  image?: string
  icon?: string        /* Material Symbol name — decorative, for non-image tiles */
  heading: string
  subheading?: string
  cta?: BentoCta
  theme: BentoTheme
  gridClass: string
}

/*
  4-tile layout
  Desktop (grid-cols-3):         Mobile (grid-cols-2):
  [ hero  2×2 ] [ brand  1×1 ]  [ hero  1×2 ] [ brand  ]
  [ hero  2×2 ] [ bedroom 1×1]  [ hero  1×2 ] [ bedroom]
  [ dining  col-span-3        ]  [ dining  col-span-2   ]
*/
export const bentoTiles: BentoTile[] = [
  {
    id: "hero",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1400&auto=format&fit=crop",
    heading: "Designed for how you live",
    subheading: "Every piece crafted with intention. Built to last a lifetime.",
    cta: { label: "Explore Collection", href: "/collection" },
    theme: "dark",
    gridClass: "col-span-1 row-span-2 md:col-span-2 md:row-span-2",
  },
  {
    id: "brand",
    icon: "villa",
    heading: "Factory direct from Nilambur, Kerala",
    subheading: "Skip the showroom markup. Workshop quality at honest prices.",
    theme: "primary",
    gridClass: "col-span-1",
  },
  {
    id: "bedroom",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800&auto=format&fit=crop",
    heading: "Bedroom",
    cta: { label: "Shop Now", href: "/collection/bedroom-furniture" },
    theme: "dark",
    gridClass: "col-span-1",
  },
  {
    id: "dining",
    image:
      "https://images.unsplash.com/photo-1617104551722-3b2d51366400?q=80&w=1400&auto=format&fit=crop",
    heading: "Dining",
    cta: { label: "Shop Now", href: "/collection/dining-room-furniture" },
    theme: "dark",
    gridClass: "col-span-2 md:col-span-3",
  },
]
