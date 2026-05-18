import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { cn } from "@/lib/utils"

/* Prop types */
export interface CarouselProduct {
  name: string
  slug: string
  image: string
  price: number
  rating: number
  type: string
}

export interface ProductCarouselProps {
  title: string
  subtitle?: string
  viewAllHref?: string
  products: CarouselProduct[]
}

function formatPrice(n: number) {
  return "₹" + n.toLocaleString("en-IN")
}

function Card({ product }: { product: CarouselProduct }) {
  return (
    <a
      href={`/products/${product.slug}`}
      /* 24vw on mobile ≈ 93px at 390px → ~3.5 cards visible */
      className="group w-[24vw] shrink-0 snap-start sm:w-50 lg:w-60"
    >
      {/* Image */}
      <div className="overflow-hidden rounded-xl bg-secondary">
        {/* Square on mobile (better at small size), 4:3 on desktop */}
        <div className="aspect-square overflow-hidden sm:aspect-4/3">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Info */}
      <div className="mt-2 px-0.5">
        {/* Type — hidden on mobile to save vertical space */}
        <p className="hidden sm:block mb-0.5 text-[0.65rem] uppercase tracking-wider text-muted-foreground">
          {product.type}
        </p>

        <p className="line-clamp-2 text-[11px] font-medium leading-snug text-foreground sm:text-sm">
          {product.name}
        </p>

        <div className="mt-1 flex items-center justify-between gap-1">
          {/* Rating — hidden on mobile */}
          <span className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="size-3 fill-primary text-primary" />
            {product.rating.toFixed(1)}
          </span>
          <p className="text-[11px] font-semibold text-foreground sm:text-sm">
            {formatPrice(product.price)}
          </p>
        </div>
      </div>
    </a>
  )
}

export default function ProductCarousel({
  title,
  subtitle,
  viewAllHref,
  products,
}: ProductCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const updateArrows = () => {
    const el = trackRef.current
    if (!el) return
    setAtStart(el.scrollLeft <= 4)
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 4)
  }

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    updateArrows()
    el.addEventListener("scroll", updateArrows, { passive: true })
    return () => el.removeEventListener("scroll", updateArrows)
  }, [products])

  const scroll = (dir: "left" | "right") => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector("a")
    const step = ((card?.offsetWidth ?? 200) + 12) * 2
    el.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" })
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-6">
      {/* Header */}
      <div className="mb-5 flex items-end justify-between gap-4 sm:mb-6">
        <div>
          {subtitle && (
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground sm:text-sm">
              {subtitle}
            </p>
          )}
          <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl lg:text-4xl">
            {title}
          </h2>
        </div>
        {viewAllHref && (
          <a href={viewAllHref} className="shrink-0 text-sm font-medium text-primary hover:underline">
            View all →
          </a>
        )}
      </div>

      {/* Carousel — bleeds to screen edge on mobile */}
      <div className="relative -mx-4 sm:mx-0">
        {/* Left arrow (desktop only) */}
        <button
          type="button"
          aria-label="Scroll left"
          onClick={() => scroll("left")}
          className={cn(
            "absolute -left-4 top-[38%] z-10 hidden size-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background shadow-md transition hover:bg-accent md:flex",
            atStart && "pointer-events-none opacity-0",
          )}
        >
          <ChevronLeft className="size-4" />
        </button>

        {/* Track */}
        <div
          ref={trackRef}
          className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 pl-4 pr-4 sm:pl-0 sm:pr-0"
          style={{ scrollbarWidth: "none" }}
        >
          {products.map((p) => (
            <Card key={p.slug} product={p} />
          ))}
        </div>

        {/* Right arrow (desktop only) */}
        <button
          type="button"
          aria-label="Scroll right"
          onClick={() => scroll("right")}
          className={cn(
            "absolute -right-4 top-[38%] z-10 hidden size-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background shadow-md transition hover:bg-accent md:flex",
            atEnd && "pointer-events-none opacity-0",
          )}
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </section>
  )
}
