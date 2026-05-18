import { useEffect, useRef, useState } from "react"
import {
  ChevronDown,
  ChevronRight,
  Heart,
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

/* Prop types */
export interface NavType {
  name: string
  slug: string
}

export interface NavGroup {
  heading: string  /* department/room name — becomes the column heading */
  slug: string     /* used to build /collection/[slug] and /collection/[slug]/[type] */
  items: NavType[]
}

export interface NavFeaturedCard {
  image: string
  caption: string
  href: string
}

export interface NavSection {
  name: string            /* strip label: "Furniture", "Lighting" … */
  slug: string
  groups: NavGroup[]      /* mega-menu columns */
  featured?: NavFeaturedCard[]
}

export interface NavLink {
  label: string
  href: string
}

export interface SiteHeaderProps {
  siteName?: string
  siteHref?: string
  navLinks?: NavLink[]
  sections?: NavSection[]
}

/* Logo mark */
function LogoMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="1.5" y="1.5" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2.2" />
      <rect x="11.5" y="1.5" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2.2" />
      <rect x="1.5" y="11.5" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2.2" />
    </svg>
  )
}

/* Icon button */
function IconBtn({ label, children, onClick, className }: {
  label: string
  children: React.ReactNode
  onClick?: () => void
  className?: string
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent",
        className,
      )}
    >
      {children}
    </button>
  )
}

/* Search field */
function SearchField({ placeholder, className }: { placeholder?: string; className?: string }) {
  return (
    <label className={cn("relative flex items-center", className)}>
      <Search className="pointer-events-none absolute left-3.5 size-4 text-muted-foreground" />
      <input
        type="search"
        placeholder={placeholder ?? "Search furniture…"}
        className="h-10 w-full rounded-full border border-border bg-muted pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </label>
  )
}

/* Featured image card inside mega-menu */
function FeaturedCard({ card }: { card: NavFeaturedCard }) {
  return (
    <a href={card.href} className="group/card relative w-44 shrink-0 overflow-hidden rounded-xl">
      <img
        src={card.image}
        alt={card.caption}
        className="h-44 w-full object-cover transition-transform duration-300 group-hover/card:scale-105"
      />
      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-foreground/70 to-transparent px-3 py-3">
        <p className="font-heading text-base font-bold leading-tight text-primary-foreground">
          {card.caption} →
        </p>
      </div>
    </a>
  )
}

/* Main component */
export default function SiteHeader({
  siteName = "HOMEIX",
  siteHref = "/",
  navLinks = [],
  sections = [],
}: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSlug, setActiveSlug] = useState<string | null>(null)
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8)
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [])

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", menuOpen)
    return () => document.body.classList.remove("overflow-hidden")
  }, [menuOpen])

  const activeSection = sections.find((s) => s.slug === activeSlug) ?? null

  const handleEnter = (slug: string) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current)
    setActiveSlug(slug)
  }
  const handleLeave = () => {
    leaveTimer.current = setTimeout(() => setActiveSlug(null), 120)
  }

  const LogoLink = ({ onClick }: { onClick?: () => void }) => (
    <a href={siteHref} onClick={onClick} className="flex shrink-0 items-center gap-2">
      <span className="flex size-8 items-center justify-center rounded-sm border-[2.2px] border-primary text-primary">
        <LogoMark />
      </span>
      <span className="font-heading text-[1.25rem] font-semibold leading-none tracking-tight text-foreground">
        {siteName}
      </span>
    </a>
  )

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b border-border bg-background transition-shadow duration-200",
          scrolled && "shadow-sm",
        )}
      >
        {/* Top bar */}
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 lg:gap-5 lg:px-6">
          <IconBtn label="Open menu" onClick={() => setMenuOpen(true)} className="lg:hidden">
            <Menu className="size-5" />
          </IconBtn>

          <div className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
            <LogoLink />
          </div>

          {navLinks.length > 0 && (
            <nav className="hidden items-center gap-5 lg:flex" aria-label="Main">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                  {link.label}
                </a>
              ))}
            </nav>
          )}

          <div className="hidden flex-1 justify-center lg:flex">
            <SearchField className="w-full max-w-sm xl:max-w-md" />
          </div>

          <div className="flex-1 lg:hidden" aria-hidden />

          <div className="flex items-center">
            <IconBtn label="Account"><User className="size-5" /></IconBtn>
            <IconBtn label="Wishlist"><Heart className="size-5" /></IconBtn>
            <IconBtn label="Cart"><ShoppingCart className="size-5" /></IconBtn>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="border-t border-border px-4 py-2.5 lg:hidden">
          <SearchField placeholder="What are you looking for?" className="w-full" />
        </div>

        {/* Desktop category strip */}
        {sections.length > 0 && (
          <nav
            aria-label="Shop categories"
            className="relative hidden border-t border-border lg:block"
            onMouseLeave={handleLeave}
          >
            <div className="mx-auto max-w-7xl px-4 lg:px-6">
              <ul className="flex items-center gap-7 whitespace-nowrap">
                {sections.map((section) => (
                  <li key={section.slug} onMouseEnter={() => handleEnter(section.slug)}>
                    <a
                      href={`/collection/${section.slug}`}
                      className={cn(
                        "relative flex items-center gap-1 py-3 text-sm font-medium transition-colors",
                        "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-200",
                        activeSlug === section.slug
                          ? "text-foreground after:scale-x-100"
                          : "text-muted-foreground hover:text-foreground hover:after:scale-x-100",
                      )}
                    >
                      {section.name}
                      {section.groups.length > 0 && (
                        <ChevronDown className={cn(
                          "size-3.5 transition-transform duration-150",
                          activeSlug === section.slug && "rotate-180",
                        )} />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mega-menu panel */}
            {activeSection && activeSection.groups.length > 0 && (
              <div
                className="absolute left-0 right-0 top-full z-50 border-t border-border"
                onMouseEnter={() => handleEnter(activeSection.slug)}
              >
                <div className="mx-auto max-w-7xl px-4 lg:px-6">
                  <div className="rounded-b-xl border-x border-b border-border bg-background p-6 shadow-xl">
                    <div className="flex gap-10">
                      {/* Columns — each group = one department column */}
                      <div className="flex flex-1 flex-wrap gap-8">
                        {activeSection.groups.map((group) => (
                          <div key={group.slug} className="min-w-[130px]">
                            <a
                              href={`/collection/${group.slug}`}
                              className="mb-3 block text-sm font-semibold text-foreground transition-colors hover:text-primary"
                            >
                              {group.heading}
                            </a>
                            <ul className="flex flex-col gap-2">
                              {group.items.map((item) => (
                                <li key={item.slug}>
                                  <a
                                    href={`/collection/${group.slug}/${item.slug}`}
                                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                  >
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      {/* Featured image cards */}
                      {activeSection.featured && activeSection.featured.length > 0 && (
                        <div className="flex shrink-0 gap-3">
                          {activeSection.featured.map((card) => (
                            <FeaturedCard key={card.href} card={card} />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </nav>
        )}
      </header>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 flex w-[85vw] max-w-xs flex-col overflow-y-auto border-r border-border bg-background shadow-2xl">
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-4">
              <LogoLink onClick={() => setMenuOpen(false)} />
              <IconBtn label="Close menu" onClick={() => setMenuOpen(false)}>
                <X className="size-5" />
              </IconBtn>
            </div>

            {/* Sections → groups as rows */}
            {sections.map((section) => (
              <section key={section.slug} className="border-b border-border px-4 py-4">
                <a
                  href={`/collection/${section.slug}`}
                  onClick={() => setMenuOpen(false)}
                  className="mb-2 block text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
                >
                  {section.name}
                </a>
                <div className="flex flex-col">
                  {section.groups.map((group) => (
                    <a
                      key={group.slug}
                      href={`/collection/${group.slug}`}
                      onClick={() => setMenuOpen(false)}
                      className="group flex items-center justify-between rounded-lg px-2 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground active:bg-accent/70"
                    >
                      {group.heading}
                      <ChevronRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
                    </a>
                  ))}
                </div>
              </section>
            ))}

            {/* Page links */}
            {navLinks.length > 0 && (
              <nav className="px-4 py-4" aria-label="Pages">
                <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Pages
                </p>
                <div className="flex flex-col">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="rounded-lg px-2 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground active:bg-accent/70"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </nav>
            )}
          </aside>
        </div>
      )}
    </>
  )
}
