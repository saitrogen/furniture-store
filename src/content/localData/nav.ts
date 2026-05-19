import type { NavLink, NavSection } from "@/components/react/SiteHeader"

/*
  Valid department slugs (derived from products.ts via slugify):
  living-room-furniture, bedroom-furniture, kitchen-and-dining-furniture,
  office-furniture, storage-furniture, outdoor-furniture, childrens-furniture

  Sections without a matching department use href: to override the strip link.
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
    href: "/collection",
    groups: [
      {
        heading: "Latest Additions",
        slug: "living-room-furniture",
        items: [
          { name: "Sofas", slug: "sofas" },
          { name: "Accent Chairs", slug: "accent-chairs" },
          { name: "Coffee Tables", slug: "coffee-tables" },
        ],
      },
      {
        heading: "Bedroom",
        slug: "bedroom-furniture",
        items: [
          { name: "Beds", slug: "beds" },
          { name: "Wardrobes", slug: "wardrobes" },
          { name: "Dressers", slug: "dressers" },
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
    href: "/collection",
    groups: [
      {
        heading: "Living Room",
        slug: "living-room-furniture",
        items: [
          { name: "Sofas", slug: "sofas" },
          { name: "Accent Chairs", slug: "accent-chairs" },
          { name: "Coffee Tables", slug: "coffee-tables" },
          { name: "TV Stands", slug: "tv-stands" },
          { name: "Side Tables", slug: "side-tables" },
        ],
      },
      {
        heading: "Bedroom",
        slug: "bedroom-furniture",
        items: [
          { name: "Beds", slug: "beds" },
          { name: "Wardrobes", slug: "wardrobes" },
          { name: "Dressers", slug: "dressers" },
        ],
      },
      {
        heading: "Kitchen & Dining",
        slug: "kitchen-and-dining-furniture",
        items: [
          { name: "Dining Tables", slug: "dining-tables" },
          { name: "Dining Chairs", slug: "dining-chairs" },
          { name: "Dining Sets", slug: "dining-sets" },
          { name: "Bar Furniture", slug: "bar-furniture" },
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
          { name: "Cabinets", slug: "cabinets" },
          { name: "Sideboards", slug: "sideboards" },
          { name: "Room Dividers", slug: "room-dividers" },
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
    name: "Outdoor",
    slug: "outdoor-furniture",
    groups: [
      {
        heading: "Outdoor Living",
        slug: "outdoor-furniture",
        items: [
          { name: "Outdoor Furniture", slug: "outdoor-furniture" },
        ],
      },
    ],
    featured: [
      {
        image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=800&auto=format&fit=crop",
        caption: "Shop Outdoor",
        href: "/collection/outdoor-furniture",
      },
    ],
  },
  {
    name: "Children's",
    slug: "childrens-furniture",
    groups: [
      {
        heading: "Kids & Nursery",
        slug: "childrens-furniture",
        items: [
          { name: "Children's Furniture", slug: "childrens-furniture" },
          { name: "Nursery Furniture", slug: "nursery-furniture" },
        ],
      },
    ],
    featured: [],
  },
  {
    name: "Sale",
    slug: "sale",
    href: "/collection",
    groups: [],
    featured: [],
  },
]
