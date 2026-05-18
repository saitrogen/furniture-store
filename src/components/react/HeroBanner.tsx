import { useEffect, useState } from "react"
import { RotateCcw, Shield, Truck } from "lucide-react"
import { cn } from "@/lib/utils"

/* Prop types */
export interface HeroSlide {
  eyebrow: string
  headingAccent?: string
  heading: string
  subheading: string
  cta: { label: string; href: string }
  ctaSecondary?: { label: string; href: string }
  image: string
}

export type BadgeIcon = "truck" | "shield" | "rotate-ccw"

export interface TrustBadge {
  icon: BadgeIcon
  text: string
}

export interface HeroBannerProps {
  slides: HeroSlide[]
  badges?: TrustBadge[]
  autoplayMs?: number
}

const badgeIcons: Record<BadgeIcon, React.ReactNode> = {
  truck: <Truck className="size-4 shrink-0" />,
  shield: <Shield className="size-4 shrink-0" />,
  "rotate-ccw": <RotateCcw className="size-4 shrink-0" />,
}

export default function HeroBanner({
  slides,
  badges = [],
  autoplayMs = 5000,
}: HeroBannerProps) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (slides.length <= 1 || paused) return
    const id = setInterval(() => setActive((p) => (p + 1) % slides.length), autoplayMs)
    return () => clearInterval(id)
  }, [paused, slides.length, autoplayMs])

  const hasBadges = badges.length > 0

  return (
    <div
      className="relative w-full overflow-hidden aspect-[3/2] sm:aspect-[16/9] lg:aspect-[5/2] lg:rounded-2xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slide images */}
      {slides.map((slide, i) => (
        <img
          key={i}
          src={slide.image}
          alt={slide.eyebrow}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
            i === active ? "opacity-100" : "opacity-0",
          )}
          loading={i === 0 ? "eager" : "lazy"}
        />
      ))}

      {/* Gradient — bottom-heavy on mobile, left-heavy on desktop */}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/40 to-foreground/10 lg:hidden" />
      <div className="absolute inset-0 hidden bg-gradient-to-r from-foreground/90 via-foreground/55 lg:to-transparent lg:block" />

      {/* Slide content */}
      {slides.map((slide, i) => (
        <div
          key={i}
          aria-hidden={i !== active}
          className={cn(
            "absolute inset-0 flex items-end transition-opacity duration-500 lg:items-center",
            i === active ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          <div
            className={cn(
              "w-full px-4 sm:px-6 lg:w-[48%] lg:pl-14",
              /* pb clears dots on mobile, badge strip on desktop */
              hasBadges ? "pb-8 sm:pb-12 lg:pb-20" : "pb-8 sm:pb-10 lg:pb-10",
            )}
          >
            <p className="mb-1 sm:mb-2 text-[0.6rem] sm:text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-primary-foreground/70">
              {slide.eyebrow}
            </p>
            <h1 className="font-heading font-bold leading-[1.05] text-primary-foreground
              text-2xl mb-2
              sm:text-4xl sm:mb-3
              lg:text-[3.25rem] lg:mb-4">
              {slide.headingAccent && (
                <span className="block font-light italic">{slide.headingAccent}</span>
              )}
              {slide.heading}
            </h1>
            {/* Subheading hidden on small mobile — not enough room */}
            <p className="hidden sm:block mb-4 lg:mb-6 max-w-sm text-xs sm:text-sm leading-relaxed text-primary-foreground/75 lg:text-[0.9375rem]">
              {slide.subheading}
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <a
                href={slide.cta.href}
                className="inline-flex items-center justify-center rounded-md bg-primary font-semibold text-primary-foreground transition hover:bg-primary/90
                  h-8 px-4 text-xs
                  sm:h-10 sm:px-6 sm:text-sm
                  lg:h-11 lg:px-7"
              >
                {slide.cta.label}
              </a>
              {slide.ctaSecondary && (
                <a
                  href={slide.ctaSecondary.href}
                  className="inline-flex items-center justify-center rounded-md border border-primary-foreground/30 font-semibold text-primary-foreground backdrop-blur-sm transition hover:bg-primary-foreground/10
                    h-8 px-4 text-xs
                    sm:h-10 sm:px-6 sm:text-sm
                    lg:h-11 lg:px-7"
                >
                  {slide.ctaSecondary.label}
                </a>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Trust badge strip — desktop only */}
      {hasBadges && (
        <div className="absolute bottom-0 left-0 right-0 hidden border-t border-primary-foreground/10 bg-foreground/35 backdrop-blur-sm lg:flex">
          <div className="flex w-full items-center justify-center divide-x divide-primary-foreground/15 py-3.5">
            {badges.map((badge) => (
              <div
                key={badge.text}
                className="flex items-center gap-2 px-7 text-primary-foreground/80"
              >
                {badgeIcons[badge.icon]}
                <span className="text-xs font-medium uppercase tracking-wider">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Carousel dots */}
      {slides.length > 1 && (
        <div
          className={cn(
            "absolute left-4 flex items-center gap-1.5 sm:left-6 sm:gap-2 lg:left-14",
            hasBadges ? "bottom-3 sm:bottom-4 lg:bottom-[3.75rem]" : "bottom-3 sm:bottom-4",
          )}
        >
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setActive(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === active
                  ? "w-7 bg-primary-foreground"
                  : "w-1.5 bg-primary-foreground/50 hover:bg-primary-foreground/80",
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}
