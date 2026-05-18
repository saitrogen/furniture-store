import type { HeroSlide, TrustBadge } from "@/components/react/HeroBanner"

export const heroSlides: HeroSlide[] = [
  {
    eyebrow: "New Collection 2025",
    headingAccent: "Crafted",
    heading: "for Modern Living",
    subheading:
      "Explore sofas, dining sets and storage pieces built for real homes — direct from our workshop.",
    cta: { label: "Shop Collection", href: "/collection" },
    ctaSecondary: { label: "View Rooms", href: "/collection" },
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1600&auto=format&fit=crop",
  },
  {
    eyebrow: "Bedroom Essentials",
    headingAccent: "Serenity",
    heading: "in Every Corner",
    subheading:
      "Handcrafted beds, wardrobes and dressers for the ultimate bedroom retreat.",
    cta: { label: "Shop Bedroom", href: "/collection/bedroom-furniture" },
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop",
  },
  {
    eyebrow: "Dining in Style",
    headingAccent: "Gather",
    heading: "Around Good Design",
    subheading:
      "From intimate 4-seaters to grand dining sets — find your perfect table for every occasion.",
    cta: { label: "Shop Dining", href: "/collection/dining-room-furniture" },
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1600&auto=format&fit=crop",
  },
  {
    eyebrow: "Work From Home",
    headingAccent: "Workspace",
    heading: "Reimagined",
    subheading:
      "Ergonomic desks, chairs and smart storage crafted for focused, productive days.",
    cta: { label: "Shop Study", href: "/collection/study-furniture" },
    image:
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?q=80&w=1600&auto=format&fit=crop",
  },
]

export const heroBadges: TrustBadge[] = [
  { icon: "truck", text: "Free Delivery & Installation" },
  { icon: "shield", text: "5-Year Craftsmanship Warranty" },
  { icon: "rotate-ccw", text: "Hassle-Free Returns" },
]
