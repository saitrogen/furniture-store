import { useState, useEffect } from 'react';

interface NavLink {
  label: string;
  href: string;
}

interface Props {
  links: NavLink[];
}

export default function MobileNav({ links }: Props) {
  const [open, setOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close on route change (Astro view transitions)
  useEffect(() => {
    const close = () => setOpen(false);
    document.addEventListener('astro:page-load', close);
    return () => document.removeEventListener('astro:page-load', close);
  }, []);

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="md:hidden flex flex-col gap-1.5 p-2"
      >
        <span className="block w-5 h-px bg-foreground" />
        <span className="block w-5 h-px bg-foreground" />
        <span className="block w-3 h-px bg-foreground" />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-background/80 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`
          fixed top-0 right-0 h-full w-full sm:w-96 z-50
          bg-background border-l border-border/40
          flex flex-col justify-between
          transition-transform duration-500 ease-in-out md:hidden
          ${open ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Header row */}
        <div className="flex items-center justify-between px-8 h-16 border-b border-border/40">
          <span className="font-display text-xl tracking-[0.08em] text-foreground">
            HOMEIX
          </span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="text-muted-foreground hover:text-foreground transition-colors text-2xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
          {links.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-4xl font-display font-normal text-foreground hover:text-primary transition-colors duration-200 py-3"
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Bottom CTA */}
        <div className="px-8 pb-12">
          <a
            href="/contact"
            className="block w-full text-center px-6 py-4 border border-primary text-primary text-[11px] font-semibold tracking-[0.2em] uppercase hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
            onClick={() => setOpen(false)}
          >
            INQUIRE
          </a>
        </div>
      </div>
    </>
  );
}