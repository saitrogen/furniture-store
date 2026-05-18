import { useMemo, useState } from "react"
import { ArrowUpDown, ChevronDown, LayoutGrid, SlidersHorizontal, X } from "lucide-react"
import { cn } from "@/lib/utils"
import ProductCard from "./ProductCard"
import type { ProductCardItem } from "./ProductCard"

/* Prop types */
export interface GridProduct {
  id: string
  name: string
  slug: string
  image: string
  price: number
  rating: number
  type: string
  department?: string
}

export interface ProductGridProps {
  products: GridProduct[]
  filterBy?: "type" | "department" | "none"
  initialFilter?: string
  pageSize?: number
}

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "name", label: "Name A–Z" },
] as const

type SortValue = (typeof SORT_OPTIONS)[number]["value"]

function applySort(list: GridProduct[], by: SortValue): GridProduct[] {
  const copy = [...list]
  if (by === "price-low") return copy.sort((a, b) => a.price - b.price)
  if (by === "price-high") return copy.sort((a, b) => b.price - a.price)
  if (by === "rating") return copy.sort((a, b) => b.rating - a.rating)
  if (by === "name") return copy.sort((a, b) => a.name.localeCompare(b.name))
  return copy
}

function getBadge(product: GridProduct, idx: number): ProductCardItem["badge"] {
  if (product.rating >= 4.8) return "bestseller"
  if (idx < 4) return "new"
  return undefined
}

/* Custom checkbox */
function Checkbox({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onChange}
      className={cn(
        "flex size-[18px] shrink-0 items-center justify-center rounded border-2 transition-colors",
        checked ? "border-primary bg-primary" : "border-border bg-background",
      )}
    >
      {checked && (
        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
          <path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  )
}

/* Radio dot */
function Radio({ checked }: { checked: boolean }) {
  return (
    <span
      className={cn(
        "flex size-[18px] shrink-0 items-center justify-center rounded-full border-2 transition-colors",
        checked ? "border-primary" : "border-border",
      )}
    >
      {checked && <span className="size-2 rounded-full bg-primary" />}
    </span>
  )
}

/* ── Desktop left sidebar ──────────────────────────────────────── */
function FilterSidebar({
  filterValues,
  activeFilters,
  onToggle,
  onClear,
  sortBy,
  onSort,
}: {
  filterValues: { value: string; count: number }[]
  activeFilters: string[]
  onToggle: (val: string) => void
  onClear: () => void
  sortBy: SortValue
  onSort: (v: SortValue) => void
}) {
  return (
    <aside className="hidden w-56 shrink-0 lg:block xl:w-64">
      {/* Sort */}
      <div className="mb-5 border-b border-border pb-5">
        <h3 className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-foreground">
          Sort By
        </h3>
        {SORT_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onSort(opt.value)}
            className="flex w-full items-center gap-3 py-1.5 text-left"
          >
            <Radio checked={sortBy === opt.value} />
            <span className={cn("text-sm", sortBy === opt.value ? "font-medium text-foreground" : "text-muted-foreground")}>
              {opt.label}
            </span>
          </button>
        ))}
      </div>

      {/* Category filter */}
      {filterValues.length > 0 && (
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-foreground">
              Category
            </h3>
            {activeFilters.length > 0 && (
              <button type="button" onClick={onClear} className="text-xs text-muted-foreground hover:text-foreground">
                Clear
              </button>
            )}
          </div>
          {filterValues.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => onToggle(f.value)}
              className="flex w-full items-center gap-3 py-1.5 text-left"
            >
              <Checkbox checked={activeFilters.includes(f.value)} onChange={() => onToggle(f.value)} />
              <span className="flex-1 text-sm text-foreground">{f.value}</span>
              <span className="text-xs text-muted-foreground">({f.count})</span>
            </button>
          ))}
        </div>
      )}
    </aside>
  )
}

/* ── Mobile: Sort bottom sheet ─────────────────────────────────── */
function SortSheet({ sortBy, onSort, onClose }: { sortBy: SortValue; onSort: (v: SortValue) => void; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[200] lg:hidden">
      <button type="button" aria-label="Close" className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute bottom-0 left-0 right-0 rounded-t-2xl bg-background shadow-xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h3 className="text-base font-semibold">Sort By</h3>
          <button type="button" onClick={onClose} aria-label="Close"><X className="size-5" /></button>
        </div>
        <div className="px-5 pt-2 pb-8">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { onSort(opt.value); onClose() }}
              className="flex w-full items-center gap-4 border-b border-border py-3.5 last:border-0"
            >
              <Radio checked={sortBy === opt.value} />
              <span className={cn("text-sm", sortBy === opt.value ? "font-semibold text-foreground" : "text-muted-foreground")}>
                {opt.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Mobile: Filter full-screen sheet ─────────────────────────── */
function FilterSheet({
  filterValues,
  activeFilters,
  onToggle,
  onClear,
  onClose,
}: {
  filterValues: { value: string; count: number }[]
  activeFilters: string[]
  onToggle: (val: string) => void
  onClear: () => void
  onClose: () => void
}) {
  return (
    <div className="fixed inset-0 z-[200] flex flex-col bg-background lg:hidden">
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-border px-4">
        <h3 className="text-base font-semibold">Filters</h3>
        <button type="button" onClick={onClose} aria-label="Close"><X className="size-5" /></button>
      </div>

      {/* Two-panel body — matches Urban Ladder layout */}
      <div className="flex min-h-0 flex-1">
        {/* Left: category tabs */}
        <div className="w-[110px] shrink-0 overflow-y-auto border-r border-border bg-muted/40">
          <button
            type="button"
            className="w-full border-l-[3px] border-primary bg-background px-4 py-3.5 text-left text-sm font-semibold text-foreground"
          >
            Category
          </button>
        </div>

        {/* Right: checkboxes */}
        <div className="flex-1 overflow-y-auto px-4 py-2">
          {filterValues.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => onToggle(f.value)}
              className="flex w-full items-center gap-3 border-b border-border/50 py-3 last:border-0 text-left"
            >
              <Checkbox checked={activeFilters.includes(f.value)} onChange={() => onToggle(f.value)} />
              <span className="flex-1 text-sm text-foreground">{f.value}</span>
              <span className="text-xs text-muted-foreground">({f.count})</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex shrink-0 gap-3 border-t border-border p-4">
        <button type="button" onClick={onClear} className="h-11 flex-1 rounded-lg border border-border text-sm font-medium transition hover:bg-accent">
          Reset Filter
        </button>
        <button type="button" onClick={onClose} className="h-11 flex-1 rounded-lg bg-primary text-sm font-medium text-primary-foreground transition hover:bg-primary/90">
          Apply Filter
        </button>
      </div>
    </div>
  )
}

/* ── Main component ───────────────────────────────────────────── */
export default function ProductGrid({
  products,
  filterBy = "type",
  initialFilter,
  pageSize = 12,
}: ProductGridProps) {
  const [activeFilters, setActiveFilters] = useState<string[]>(
    initialFilter ? [initialFilter] : [],
  )
  const [sortBy, setSortBy] = useState<SortValue>("featured")
  const [showing, setShowing] = useState(pageSize)
  const [sortOpen, setSortOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)

  const filterKey = filterBy === "department" ? "department" : "type"

  const filterValues = useMemo(() => {
    if (filterBy === "none") return []
    const counts = new Map<string, number>()
    products.forEach((p) => {
      const k = (p[filterKey] ?? "") as string
      if (k) counts.set(k, (counts.get(k) ?? 0) + 1)
    })
    return Array.from(counts.entries()).map(([value, count]) => ({ value, count }))
  }, [products, filterBy, filterKey])

  const filtered = useMemo(() => {
    const base =
      activeFilters.length > 0
        ? products.filter((p) => activeFilters.includes((p[filterKey] ?? "") as string))
        : products
    return applySort(base, sortBy)
  }, [products, filterBy, filterKey, activeFilters, sortBy])

  const visible = filtered.slice(0, showing)
  const hasMore = showing < filtered.length
  const activeCount = activeFilters.length

  function toggleFilter(val: string) {
    setActiveFilters((prev) => prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val])
    setShowing(pageSize)
  }

  function clearFilters() {
    setActiveFilters([])
    setShowing(pageSize)
  }

  /* Grid cols depend on whether sidebar is present */
  const gridColsClass = filterBy === "none"
    ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
    : "grid-cols-2 lg:grid-cols-3"

  return (
    <>
      <div className="flex gap-8">
        {/* Desktop sidebar */}
        {filterBy !== "none" && (
          <FilterSidebar
            filterValues={filterValues}
            activeFilters={activeFilters}
            onToggle={toggleFilter}
            onClear={clearFilters}
            sortBy={sortBy}
            onSort={setSortBy}
          />
        )}

        {/* Main */}
        <div className="min-w-0 flex-1">
          {/* Desktop top-right count */}
          <div className="mb-5 hidden items-center justify-between lg:flex">
            <p className="text-sm text-muted-foreground">
              {filtered.length} {filtered.length === 1 ? "product" : "products"}
              {activeCount > 0 && (
                <> · <button type="button" onClick={clearFilters} className="text-primary hover:underline">clear filters</button></>
              )}
            </p>
          </div>

          {/* Mobile count row */}
          <div className="mb-4 flex items-center justify-between lg:hidden">
            <p className="text-sm text-muted-foreground">{filtered.length} products</p>
            {activeCount > 0 && (
              <button type="button" onClick={clearFilters} className="text-xs text-primary hover:underline">
                Clear ({activeCount})
              </button>
            )}
          </div>

          {/* Grid */}
          {visible.length > 0 ? (
            <>
              <div className={cn("grid gap-x-3 gap-y-6 sm:gap-x-4 sm:gap-y-8", gridColsClass)}>
                {visible.map((product) => (
                  <ProductCard
                    key={product.slug}
                    item={{
                      name: product.name,
                      slug: product.slug,
                      image: product.image,
                      price: product.price,
                      rating: product.rating,
                      type: product.type,
                      badge: getBadge(product, products.indexOf(product)),
                    }}
                  />
                ))}
              </div>

              {hasMore && (
                <div className="mt-12 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setShowing((n) => n + pageSize)}
                    className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                  >
                    Load more <ChevronDown className="size-4" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="py-20 text-center">
              <p className="text-sm text-muted-foreground">No products found.</p>
            </div>
          )}

          {/* Spacer for mobile sticky bar */}
          {filterBy !== "none" && <div className="h-16 lg:hidden" />}
        </div>
      </div>

      {/* Mobile sticky bottom bar */}
      {filterBy !== "none" && (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex h-14 items-stretch border-t border-border bg-background lg:hidden">
          <button
            type="button"
            onClick={() => setSortOpen(true)}
            className="flex flex-1 flex-col items-center justify-center gap-0.5 text-foreground"
          >
            <ArrowUpDown className="size-4" />
            <span className="text-[10px] font-semibold uppercase tracking-wider">Sort By</span>
          </button>

          <button
            type="button"
            onClick={() => setFilterOpen(true)}
            className="relative flex flex-1 flex-col items-center justify-center gap-0.5 border-x border-border text-foreground"
          >
            <SlidersHorizontal className="size-4" />
            <span className="text-[10px] font-semibold uppercase tracking-wider">Filters</span>
            {activeCount > 0 && (
              <span className="absolute right-3 top-2 flex size-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
                {activeCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setFilterOpen(true)}
            className="flex flex-1 flex-col items-center justify-center gap-0.5 text-foreground"
          >
            <LayoutGrid className="size-4" />
            <span className="text-[10px] font-semibold uppercase tracking-wider">Category</span>
          </button>
        </div>
      )}

      {sortOpen && (
        <SortSheet sortBy={sortBy} onSort={setSortBy} onClose={() => setSortOpen(false)} />
      )}
      {filterOpen && (
        <FilterSheet
          filterValues={filterValues}
          activeFilters={activeFilters}
          onToggle={toggleFilter}
          onClear={clearFilters}
          onClose={() => setFilterOpen(false)}
        />
      )}
    </>
  )
}
