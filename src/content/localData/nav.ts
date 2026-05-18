import type { NavLink, NavSection } from "@/components/react/SiteHeader"

/* Page-level links (top bar) */
export const navLinks: NavLink[] = [
  { label: "Collection", href: "/collection" },
  { label: "About", href: "/about" },
  { label: "Delivery", href: "/delivery" },
  { label: "Contact", href: "/contact" },
]

/*
  Strip → Furniture | Lighting | Outdoor | Home Décor | Sale
            ↓ hover
          Mega-menu columns = groups (Living Room, Bedroom…)
            ↓ click heading
          /collection/[group.slug]
            ↓ click item
          /collection/[group.slug]/[item.slug]
*/
export const navSections: NavSection[] = [
  {
    name: "New In",
    slug: "new-arrivals",
    groups: [
      {
        heading: "Latest Collections",
        slug: "new-arrivals",
        items: [
          { name: "Oasis Collection", slug: "oasis-collection" },
          { name: "Terra Collection", slug: "terra-collection" },
          { name: "Astra Collection", slug: "astra-collection" },
          { name: "Dawn Collection", slug: "dawn-collection" },
        ],
      },
      {
        heading: "Shop by Room",
        slug: "collection",
        items: [
          { name: "Living Room", slug: "living-room-furniture" },
          { name: "Bedroom", slug: "bedroom-furniture" },
          { name: "Dining", slug: "dining-room-furniture" },
          { name: "Study", slug: "study-furniture" },
        ],
      },
    ],
    featured: [
      {
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop",
        caption: "Shop New Arrivals",
        href: "/collection/new-arrivals",
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
          { name: "TV Units", slug: "tv-units" },
          { name: "Recliners", slug: "recliners" },
          { name: "Accent Chairs", slug: "accent-chairs" },
        ],
      },
      {
        heading: "Bedroom",
        slug: "bedroom-furniture",
        items: [
          { name: "Beds", slug: "beds" },
          { name: "Wardrobes", slug: "wardrobes" },
          { name: "Dressers", slug: "dressers" },
          { name: "Nightstands", slug: "nightstands" },
          { name: "Storage Beds", slug: "storage-beds" },
        ],
      },
      {
        heading: "Dining",
        slug: "dining-room-furniture",
        items: [
          { name: "Dining Tables", slug: "dining-tables" },
          { name: "Dining Chairs", slug: "dining-chairs" },
          { name: "Dining Sets", slug: "dining-sets" },
          { name: "Sideboards", slug: "sideboards" },
          { name: "Bar Stools", slug: "bar-stools" },
        ],
      },
      {
        heading: "Study",
        slug: "study-furniture",
        items: [
          { name: "Desks", slug: "desks" },
          { name: "Bookcases", slug: "bookcases" },
          { name: "Ergonomic Chairs", slug: "ergonomic-chairs" },
          { name: "Filing Cabinets", slug: "filing-cabinets" },
        ],
      },
      {
        heading: "Storage",
        slug: "storage-furniture",
        items: [
          { name: "Shoe Racks", slug: "shoe-racks" },
          { name: "Cabinets", slug: "cabinets" },
          { name: "Shelving Units", slug: "shelving-units" },
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
    name: "Lighting",
    slug: "lighting",
    groups: [
      {
        heading: "Ceiling & Pendant",
        slug: "lighting",
        items: [
          { name: "Pendant Lights", slug: "pendant-lights" },
          { name: "Flush Mount", slug: "flush-mount" },
          { name: "Chandeliers", slug: "chandeliers" },
        ],
      },
      {
        heading: "Lamps",
        slug: "lighting",
        items: [
          { name: "Floor Lamps", slug: "floor-lamps" },
          { name: "Table Lamps", slug: "table-lamps" },
          { name: "Desk Lamps", slug: "desk-lamps" },
        ],
      },
      {
        heading: "Outdoor Lighting",
        slug: "lighting",
        items: [
          { name: "Wall Sconces", slug: "wall-sconces" },
          { name: "String Lights", slug: "string-lights" },
        ],
      },
    ],
    featured: [
      {
        image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?q=80&w=800&auto=format&fit=crop",
        caption: "Shop Lighting",
        href: "/collection/lighting",
      },
    ],
  },
  {
    name: "Outdoor",
    slug: "outdoor-furniture",
    groups: [
      {
        heading: "Seating",
        slug: "outdoor-furniture",
        items: [
          { name: "Balcony Sets", slug: "balcony-sets" },
          { name: "Lounge Chairs", slug: "lounge-chairs" },
          { name: "Swings", slug: "swings" },
        ],
      },
      {
        heading: "Dining",
        slug: "outdoor-furniture",
        items: [
          { name: "Outdoor Dining Sets", slug: "outdoor-dining-sets" },
          { name: "Outdoor Tables", slug: "outdoor-tables" },
          { name: "Outdoor Chairs", slug: "outdoor-chairs" },
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
        heading: "Soft Furnishings",
        slug: "soft-furnishings",
        items: [
          { name: "Rugs", slug: "rugs" },
          { name: "Cushions", slug: "cushions" },
          { name: "Throws", slug: "throws" },
          { name: "Curtains", slug: "curtains" },
        ],
      },
      {
        heading: "Accents",
        slug: "accents",
        items: [
          { name: "Vases", slug: "vases" },
          { name: "Wall Art", slug: "wall-art" },
          { name: "Mirrors", slug: "mirrors" },
          { name: "Sculptures", slug: "sculptures" },
        ],
      },
    ],
    featured: [],
  },
  {
    name: "Sale",
    slug: "sale",
    groups: [
      {
        heading: "Clearance",
        slug: "sale",
        items: [
          { name: "Deals of the Day", slug: "deals-of-the-day" },
          { name: "Clearance Sale", slug: "clearance-sale" },
          { name: "Best Buys", slug: "best-buys" },
        ],
      },
    ],
    featured: [],
  },
]
