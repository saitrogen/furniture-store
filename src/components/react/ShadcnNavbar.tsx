import { useEffect, useState } from "react"
import { MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { navigation } from "@/lib/navigation";

const whatsappUrl =
  "https://wa.me/919876543210?text=Hi%20HOMEIX%2C%20I%20would%20like%20to%20enquire%20about%20furniture."

export default function ShadcnNavbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8)
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors duration-200",
        scrolled
          ? "bg-background/95 shadow-sm"
          : "bg-background/70 backdrop-blur"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4">
        <a href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-md bg-foreground text-sm font-semibold text-background">
            H
          </span>
          <span className="hidden text-lg font-semibold tracking-tight text-foreground sm:inline">
            HOMEIX
          </span>
        </a>

        <nav className="hidden flex-1 items-center justify-center gap-6 md:flex" aria-label="Main navigation">
          <a href="/collection" className="text-sm font-medium text-muted-foreground hover:text-foreground">Collection</a>
          <a href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground">About</a>
          <a href="/delivery" className="text-sm font-medium text-muted-foreground hover:text-foreground">Delivery</a>
          <a href="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground">Contact</a>
        </nav>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
        >
          <MessageCircle data-icon="inline-start" />
          <span className="hidden sm:inline">WhatsApp enquiry</span>
          <span className="sm:hidden">Enquire</span>
        </a>
      </div>

<nav className="hidden border-t md:block">
  <div className="mx-auto max-w-7xl px-4">
    <ul className="flex items-center gap-8 py-3">
      {navigation.map((category) => (
        <li
          key={category.slug}
          className="group relative"
        >
          {/* Category */}
          <a
            href="/collection"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            {category.name}
          </a>

          {/* Dropdown */}
          <div className="invisible absolute left-0 top-full z-50 pt-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
            <div className="w-212 rounded-lg border bg-background p-6 shadow-xl">
            <div className="grid grid-cols-4 gap-8">
                {category.departments.map((department) => (
                  <div key={department.slug}>
                    {/* Department Link */}
                    <a
                      href={`/collection/${department.slug}`}
                      className="mb-3 block text-sm font-semibold hover:underline"
                    >
                      {department.name}
                    </a>

                    {/* Types */}
                    <ul className="flex flex-col gap-2">
                      {department.types.map((type) => (
                        <li key={type.slug}>
                          <a
                            href={`/collection/${department.slug}/${type.slug}`}
                            className="text-sm text-muted-foreground hover:text-foreground"
                          >
                            {type.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
</nav>
      <nav className="border-t md:hidden" aria-label="Mobile navigation">
        <div className="mx-auto flex max-w-7xl items-center gap-4 overflow-x-auto px-4 py-3">
          <a href="/collection" className="shrink-0 text-sm font-medium text-muted-foreground hover:text-foreground">Collection</a>
          <a href="/about" className="shrink-0 text-sm font-medium text-muted-foreground hover:text-foreground">About</a>
          <a href="/delivery" className="shrink-0 text-sm font-medium text-muted-foreground hover:text-foreground">Delivery</a>
          <a href="/contact" className="shrink-0 text-sm font-medium text-muted-foreground hover:text-foreground">Contact</a>
        </div>
      </nav>
    </header>
  )
}
