export interface ShopCategory {
  name: string
  href: string
  image: string
  badge?: string
}

/* Slugs match actual product.json departments via slugify() */
export const shopCategories: ShopCategory[] = [
  {
    name: "Sofas",
    href: "/collection/living-room-furniture/sofas",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Coffee Tables",
    href: "/collection/living-room-furniture/coffee-tables",
    image: "https://images.unsplash.com/photo-1538688423619-a81d3f23454b?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Beds",
    href: "/collection/bedroom-furniture/beds",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Dressers",
    href: "/collection/bedroom-furniture/dressers",
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Dining Tables",
    href: "/collection/kitchen-and-dining-furniture/dining-tables",
    image: "https://images.unsplash.com/photo-1617104551722-3b2d51366400?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Dining Chairs",
    href: "/collection/kitchen-and-dining-furniture/dining-chairs",
    image: "https://images.unsplash.com/photo-1582582621959-48d27397dc69?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Accent Chairs",
    href: "/collection/living-room-furniture/accent-chairs",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "TV Stands",
    href: "/collection/living-room-furniture/tv-stands",
    image: "https://images.unsplash.com/photo-1556909114-44e3e70034e2?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Desks",
    href: "/collection/office-furniture/desks",
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Bookcases",
    href: "/collection/storage-furniture/bookcases",
    image: "https://images.unsplash.com/photo-1481277542470-605612bd2d61?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Sideboards",
    href: "/collection/storage-furniture/sideboards",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Pendant Lights",
    href: "/collection/home-lighting/pendant-lights",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop",
  },
]
