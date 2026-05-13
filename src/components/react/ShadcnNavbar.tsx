import { useEffect, useState } from "react"
import { Menu, MessageCircle, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { navigation } from "@/lib/navigation";

const whatsappUrl =
  "https://wa.me/919876543210?text=Hi%20HOMEIX%2C%20I%20would%20like%20to%20enquire%20about%20furniture."

export default function ShadcnNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

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

  return (
    <>
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors duration-200",
        scrolled
          ? "bg-background/95 shadow-sm"
          : "bg-background/70 backdrop-blur"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:gap-4">
        <a href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-md bg-foreground text-sm font-semibold text-background">
            H
          </span>
          <span className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
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
          className="ml-auto inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 sm:px-4"
        >
          <MessageCircle data-icon="inline-start" />
          <span className="hidden sm:inline">WhatsApp enquiry</span>
          <span className="sm:hidden">Enquire</span>
        </a>

        <button
          type="button"
          className="inline-flex min-h-10 items-center justify-center rounded-md border border-border bg-background px-3 text-sm font-medium text-foreground md:hidden"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
        >
          <Menu data-icon="inline-start" />
        </button>
      </div>

      <nav className="hidden border-t md:block">
        <div className="mx-auto max-w-7xl px-4">
          <ul className="flex items-center gap-8 py-3">
            {navigation.map((category) => (
              <li key={category.slug} className="group relative">
                <a
                  href="/collection"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  {category.name}
                </a>

                <div className="invisible absolute left-0 top-full z-50 pt-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <div className="w-[53rem] rounded-lg border bg-background p-6 shadow-xl">
                    <div className="grid grid-cols-4 gap-8">
                      {category.departments.map((department) => (
                        <div key={department.slug}>
                          <a
                            href={`/collection/${department.slug}`}
                            className="mb-3 block text-sm font-semibold hover:underline"
                          >
                            {department.name}
                          </a>

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

    </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[2147483647] md:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-foreground/30"
            onClick={() => setMenuOpen(false)}
          />

          <aside className="absolute right-0 top-0 flex h-full w-[88vw] max-w-sm flex-col overflow-y-auto border-l border-border bg-background shadow-xl">
            <div className="flex h-16 items-center justify-between border-b border-border px-4">
              <a href="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
                <span className="flex size-9 items-center justify-center rounded-md bg-foreground text-sm font-semibold text-background">
                  H
                </span>
                <span className="text-base font-semibold tracking-tight text-foreground">HOMEIX</span>
              </a>
              <button
                type="button"
                className="inline-flex min-h-10 items-center justify-center rounded-md border border-border bg-background px-3 text-sm font-medium text-foreground"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
              >
                <X data-icon="inline-start" />
              </button>
            </div>

            <div className="border-b border-border px-4 py-4">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Shop</p>
              <div className="mt-3 grid grid-cols-1 gap-2">
                {navigation.map((category) => (
                  <a
                    key={category.slug}
                    href="/collection"
                    className="rounded-md border border-border bg-card px-3 py-3 text-sm font-medium text-foreground"
                    onClick={() => setMenuOpen(false)}
                  >
                    {category.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1 border-b border-border px-4 py-4">
              <p className="mb-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">Collections</p>
              {navigation.flatMap((category) => category.departments).slice(0, 8).map((department) => (
                <a
                  key={department.slug}
                  href={`/collection/${department.slug}`}
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
                  onClick={() => setMenuOpen(false)}
                >
                  {department.name}
                </a>
              ))}
            </div>

            <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile pages">
              <p className="mb-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">Pages</p>
              <a href="/collection" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground" onClick={() => setMenuOpen(false)}>Collection</a>
              <a href="/about" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground" onClick={() => setMenuOpen(false)}>About</a>
              <a href="/delivery" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground" onClick={() => setMenuOpen(false)}>Delivery</a>
              <a href="/contact" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground" onClick={() => setMenuOpen(false)}>Contact</a>
            </nav>

            <div className="mt-auto border-t border-border p-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
              >
                <MessageCircle data-icon="inline-start" />
                WhatsApp enquiry
              </a>
            </div>
          </aside>
        </div>
      )}
    </>
  )
}
