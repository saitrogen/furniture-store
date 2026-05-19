import { memo } from "react"
import { Heart, Star } from "lucide-react"
import { cn, formatPrice } from "@/lib/utils"

/* Prop types */
export interface ProductCardItem {
  name: string
  slug: string
  image: string
  price: number
  rating: number
  type: string
  badge?: "new" | "bestseller"
}

const badgeLabel: Record<string, string> = {
  new: "New Arrivals",
  bestseller: "Bestseller",
}

const ProductCard = memo(function ProductCard({
  item,
  className,
}: {
  item: ProductCardItem
  className?: string
}) {
  const price = formatPrice(item.price)

  return (
    <article
      className={cn(
        "group",
        /* Mobile (Urban Ladder): visible card container */
        "overflow-hidden rounded-xl border border-border bg-card",
        /* Desktop (Litfad): open — card disappears, image stands alone */
        "md:overflow-visible md:rounded-none md:border-0 md:bg-transparent",
        className,
      )}
    >
      {/* Image — own rounding + bg only on desktop; mobile inherits article's overflow-hidden */}
      <div className="relative overflow-hidden bg-secondary aspect-4/3 md:rounded-xl">
        <a href={`/products/${item.slug}`} className="block h-full">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </a>

        {/* Badge */}
        {item.badge && (
          <span
            className={cn(
              "absolute left-2.5 top-2.5 rounded-md px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide",
              item.badge === "new"
                ? "bg-primary text-primary-foreground"
                : "bg-foreground/85 text-primary-foreground",
            )}
          >
            {badgeLabel[item.badge]}
          </span>
        )}

        {/* Wishlist */}
        <button
          type="button"
          aria-label="Save to wishlist"
          className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur-sm transition hover:bg-background md:size-8"
        >
          <Heart className="size-3.5 md:size-4" />
        </button>
      </div>

      {/* Info — padded inside card on mobile, bare below image on desktop */}
      <div className="p-3 md:p-0 md:pt-3">
        <p className="text-[0.6rem] uppercase tracking-[0.14em] text-muted-foreground sm:text-[0.65rem]">
          {item.type}
        </p>
        <a href={`/products/${item.slug}`}>
          <h3 className="mt-0.5 line-clamp-2 text-sm font-medium leading-snug text-foreground transition-colors group-hover:text-primary">
            {item.name}
          </h3>
        </a>
        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
            <Star className="size-3 fill-primary text-primary" />
            {item.rating.toFixed(1)}
          </span>
          <p className="text-sm font-semibold text-foreground">{price}</p>
        </div>
      </div>
    </article>
  )
})

export default ProductCard
