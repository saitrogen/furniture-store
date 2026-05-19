import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ShopCategory } from "@/content/localData/shopCategories"

/* Prop types */
export interface CategoryGridProps {
  label?: string
  title?: string
  viewAllHref?: string
  categories: ShopCategory[]
  mobileInitialRows?: number
}

export default function CategoryGrid({
  label = "Quick navigation",
  title = "Shop by Category",
  viewAllHref = "/collection",
  categories,
  mobileInitialRows = 2,
}: CategoryGridProps) {
  const [showAll, setShowAll] = useState(false)

  const initialRows = mobileInitialRows
  /* 3/4/6 columns by breakpoint */
  const baseVisible = initialRows * 3
  const smVisible = initialRows * 4
  const lgVisible = initialRows * 6
  const showOnBase = categories.length > baseVisible
  const showOnSm = categories.length > smVisible
  const showOnLg = categories.length > lgVisible
  const hasMore = showOnBase

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-6">
      {/* Header */}
      <div className="mb-5 flex items-end justify-between gap-4 sm:mb-7">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground sm:text-sm">
            {label}
          </p>
          <h2 className="mt-0.5 font-heading text-2xl font-semibold text-foreground sm:text-3xl lg:text-4xl">
            {title}
          </h2>
        </div>
        <a
          href={viewAllHref}
          className="shrink-0 text-sm font-medium text-primary hover:underline"
        >
          View all →
        </a>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-x-3 gap-y-5 sm:grid-cols-4 sm:gap-x-4 sm:gap-y-6 lg:grid-cols-6">
        {categories.map((cat, i) => (
          <a
            key={cat.href}
            href={cat.href}
            className={cn(
              "group flex-col items-center gap-2",
              /* Hide beyond the initial rows per breakpoint unless expanded */
              showAll
                ? "flex"
                : i < baseVisible
                  ? "flex"
                  : i < smVisible
                    ? "hidden sm:flex"
                    : i < lgVisible
                      ? "hidden lg:flex"
                      : "hidden",
            )}
          >
            <div className="relative w-full overflow-hidden rounded-xl bg-secondary aspect-square">
              {cat.badge && (
                <span className="absolute left-2 top-2 z-10 rounded-full bg-primary px-2 py-0.5 text-[0.55rem] font-bold uppercase tracking-wider text-primary-foreground">
                  {cat.badge}
                </span>
              )}
              <img
                src={cat.image}
                alt={cat.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 rounded-xl bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/8" />
            </div>
            <p className="text-center text-xs font-medium text-foreground transition-colors duration-200 group-hover:text-primary sm:text-sm">
              {cat.name}
            </p>
          </a>
        ))}
      </div>

      {/* Load more — disappears once expanded */}
      {hasMore && !showAll && (
        <div
          className={cn(
            "mt-6 flex justify-center",
            !showOnBase && "hidden",
            showOnBase && !showOnSm && "sm:hidden",
            showOnSm && !showOnLg && "lg:hidden",
          )}
        >
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Load more <ChevronDown className="size-4" />
          </button>
        </div>
      )}
    </section>
  )
}
