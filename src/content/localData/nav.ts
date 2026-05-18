import type { NavLink, NavSection } from "@/components/react/SiteHeader"

/*
  Department slugs are derived from product.json via slugify(department):
  Living Room Furniture → living-room-furniture
  Bedroom Furniture     → bedroom-furniture
  Kitchen & Dining Furniture → kitchen-and-dining-furniture
  Office Furniture      → office-furniture
  Storage Furniture     → storage-furniture
  Outdoor Furniture     → outdoor-furniture
  Home Lighting         → home-lighting
  Rugs                  → rugs
  Decor Accessories     → decor-accessories
*/

export const navLinks: NavLink[] = [
  { label: "Collection", href: "/collection" },
  { label: "About", href: "/about" },
  { label: "Delivery", href: "/delivery" },
  { label: "Contact", href: "/contact" },
]

export const navSections: NavSection[] = [
  {
    name: "New In",
    slug: "new-arrivals",
    groups: [
      {
        heading: "Latest Collections",
        slug: "living-room-furniture",
        items: [
          { name: "Sofas", slug: "sofas" },
          { name: "Accent Chairs", slug: "accent-chairs" },
        ],
      },
      {
        heading: "Shop by Room",
        slug: "collection",
        items: [
          { name: "Living Room", slug: "living-room-furniture" },
          { name: "Bedroom", slug: "bedroom-furniture" },
          { name: "Kitchen & Dining", slug: "kitchen-and-dining-furniture" },
          { name: "Office", slug: "office-furniture" },
        ],
      },
    ],
    featured: [
      {
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop",
        caption: "Shop New Arrivals",
        href: "/collection",
      },
    ],
  },
  {
    name: "Furniture",
    slug: "furniture",
    groups: [
      {
        heading: "Living Room",
        slug: "living-room-furniture",
        items: [
          { name: "Sofas", slug: "sofas" },
          { name: "Sectionals", slug: "sectionals" },
          { name: "Coffee Tables", slug: "coffee-tables" },
          { name: "TV Stands", slug: "tv-stands" },
          { name: "Accent Chairs", slug: "accent-chairs" },
        ],
      },
      {
        heading: "Bedroom",
        slug: "bedroom-furniture",
        items: [
          { name: "Beds", slug: "beds" },
          { name: "Dressers", slug: "dressers" },
          { name: "Nightstands", slug: "nightstands" },
        ],
      },
      {
        heading: "Kitchen & Dining",
        slug: "kitchen-and-dining-furniture",
        items: [
          { name: "Dining Tables", slug: "dining-tables" },
          { name: "Dining Chairs", slug: "dining-chairs" },
        ],
      },
      {
        heading: "Office",
        slug: "office-furniture",
        items: [
          { name: "Desks", slug: "desks" },
          { name: "Office Chairs", slug: "office-chairs" },
        ],
      },
      {
        heading: "Storage",
        slug: "storage-furniture",
        items: [
          { name: "Bookcases", slug: "bookcases" },
          { name: "Sideboards", slug: "sideboards" },
        ],
      },
    ],
    featured: [
      {
        image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=800&auto=format&fit=crop",
        caption: "Shop Furniture",
        href: "/collection",
      },
    ],
  },
  {
    name: "Lighting",
    slug: "home-lighting",
    groups: [
      {
        heading: "All Lighting",
        slug: "home-lighting",
        items: [
          { name: "Floor Lamps", slug: "floor-lamps" },
          { name: "Pendant Lights", slug: "pendant-lights" },
        ],
      },
    ],
    featured: [
      {
        image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop",
        caption: "Shop Lighting",
        href: "/collection/home-lighting",
      },
    ],
  },
  {
    name: "Outdoor",
    slug: "outdoor-furniture",
    groups: [
      {
        heading: "Outdoor Living",
        slug: "outdoor-furniture",
        items: [
          { name: "Outdoor Dining Sets", slug: "outdoor-dining-sets" },
          { name: "Outdoor Sofa Sets", slug: "outdoor-sofa-sets" },
        ],
      },
    ],
    featured: [],
  },
  {
    name: "Home Décor",
    slug: "decor",
    groups: [
      {
        heading: "Rugs",
        slug: "rugs",
        items: [
          { name: "Area Rugs", slug: "area-rugs" },
        ],
      },
      {
        heading: "Accents",
        slug: "decor-accessories",
        items: [
          { name: "Vases", slug: "vases" },
        ],
      },
    ],
    featured: [],
  },
  {
    name: "Sale",
    slug: "sale",
    groups: [],
    featured: [],
  },
]
