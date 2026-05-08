'use client';
import { useEffect, useMemo, useState } from 'react';

interface Product {
  slug: string;
  title: string;
  price: number;
  category: string;
  coverImageSrc: string;
}

interface Props {
  products: Product[];
}

const TABS = [
  { label: 'All', value: 'all' },
  { label: 'Sofas', value: 'living-room' },
  { label: 'L-Shaped', value: 'living-room' }, // same category, filtered by title
  { label: 'Beds', value: 'bedroom' },
  { label: 'Wardrobes', value: 'storage' },
  { label: 'Dining', value: 'dining' },
  { label: 'Combos', value: 'combo' },
];

const FILTER_VALUES = new Set(TABS.map((tab) => tab.value));

const getFilterFromUrl = () => {
  if (typeof window === 'undefined') return 'all';
  const params = new URLSearchParams(window.location.search);
  const filter = params.get('filter');
  return filter && FILTER_VALUES.has(filter) ? filter : 'all';
};

const CATEGORY_LABELS: Record<string, string> = {
  'living-room': 'Living Room',
  'bedroom': 'Bedroom',
  'dining': 'Dining',
  'storage': 'Storage',
  'seating': 'Seating',
  'combo': 'Combo Deals',
};

export default function FilterTabs({ products }: Props) {
  const [active, setActive] = useState('all');

  useEffect(() => {
    setActive(getFilterFromUrl());
  }, []);

  useEffect(() => {
    const sync = () => setActive(getFilterFromUrl());
    window.addEventListener('popstate', sync);
    document.addEventListener('astro:page-load', sync);
    return () => {
      window.removeEventListener('popstate', sync);
      document.removeEventListener('astro:page-load', sync);
    };
  }, []);

  const filtered = useMemo(() => (
    active === 'all'
      ? products
      : products.filter((product) => product.category === active)
  ), [active, products]);

  const handleTabClick = (value: string) => {
    const next = value === active && value !== 'all' ? 'all' : value;
    setActive(next);

    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (next === 'all') {
        url.searchParams.delete('filter');
      } else {
        url.searchParams.set('filter', next);
      }
      window.history.replaceState({}, '', url);
    }
  };

  return (
    <div className="flex flex-col gap-12">
      {/* Tab bar */}
      <div className="sticky top-16 z-30 bg-background/90 backdrop-blur border-b border-border">
        <div className="flex items-center justify-between gap-4 overflow-x-auto">
          <div className="flex items-center gap-2">
            {TABS.map(tab => (
              <button
                key={tab.label}
                onClick={() => handleTabClick(tab.value)}
                className={`
                  px-4 py-3 text-[11px] font-semibold tracking-[0.2em] uppercase whitespace-nowrap
                  border-b-2 -mb-px transition-colors duration-200
                  ${active === tab.value
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'}
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Sort by
            </label>
            <select className="bg-background border border-border px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-foreground">
              <option>Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map(product => (
          <article key={product.slug} className="group flex flex-col gap-4">
            <a href={`/collections/${product.slug}`} className="block overflow-hidden border border-border bg-card aspect-4/5">
              <img
                src={product.coverImageSrc}
                alt={product.title}
                loading="lazy"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
            </a>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-muted-foreground">
                {CATEGORY_LABELS[product.category] ?? product.category}
              </span>
              <h3 className="font-display text-xl text-foreground leading-snug">
                <a href={`/collections/${product.slug}`} className="hover:text-primary transition-colors duration-200">
                  {product.title}
                </a>
              </h3>
              <p className="text-sm text-muted-foreground">
                ₹{product.price.toLocaleString('en-IN')}
              </p>
            </div>
            <a
              href={`/collections/${product.slug}`}
              className="inline-flex items-center px-4 py-2 text-[10px] font-semibold tracking-[0.2em] uppercase border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
            >
              View Details
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}