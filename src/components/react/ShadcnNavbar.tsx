import { useEffect, useState } from "react"
import { Search } from "lucide-react"
import { navigation } from "@/lib/navigation";
import { cn } from "@/lib/utils"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"


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
          <span className="flex size-9 items-center justify-center rounded-full bg-foreground text-sm font-semibold text-background">
            H
          </span>
          <span className="hidden text-lg font-semibold tracking-tight text-foreground sm:inline">
            HOMEIX
          </span>
        </a>

        <div className="hidden flex-1 items-center gap-3 md:flex">


          <InputGroup className="flex-1">
            <InputGroupInput
              type="search"
              placeholder="Search for furniture and decor"
              aria-label="Search products"
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton size="icon-xs" aria-label="Search">
                <Search data-icon="inline-start" />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>

        <div className="flex flex-1 items-center gap-3 md:hidden">
          <InputGroup className="flex-1">
            <InputGroupInput
              type="search"
              placeholder="Search"
              aria-label="Search products"
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton size="icon-xs" aria-label="Search">
                <Search data-icon="inline-start" />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>
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
            href={`/category/${category.slug}`}
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            {category.name}
          </a>

          {/* Dropdown */}
          <div className="invisible absolute left-0 top-full z-50 pt-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
            <div className="w-212.5 rounded-2xl border bg-background p-6 shadow-xl">
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
                    <ul className="space-y-2">
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
  )
}
