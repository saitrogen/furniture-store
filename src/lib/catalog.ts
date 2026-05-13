import products from "@/content/data/new/product.json";

export const site = {
  name: "HOMEIX",
  tagline: "Furniture shaped for calm, useful homes.",
  whatsappNumber: "919876543210",
  whatsappBaseMessage: "Hi HOMEIX, I would like to enquire about furniture.",
  email: "hello@homeix.example",
  phone: "+91 98765 43210",
  location: "Nilambur, Kerala",
};

export type Product = (typeof products)[number];

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getProducts() {
  return products;
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function getWhatsAppUrl(message = site.whatsappBaseMessage) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function getDepartments() {
  const departments = new Map<string, Product[]>();

  products.forEach((product) => {
    const current = departments.get(product.department) ?? [];
    current.push(product);
    departments.set(product.department, current);
  });

  return Array.from(departments.entries()).map(([name, items]) => ({
    name,
    slug: slugify(name),
    image: items[0]?.image,
    count: items.length,
    products: items,
    types: Array.from(new Set(items.map((product) => product.type))).map((type) => ({
      name: type,
      slug: slugify(type),
      count: items.filter((product) => product.type === type).length,
    })),
  }));
}

export function getDepartmentBySlug(slug: string) {
  return getDepartments().find((department) => department.slug === slug);
}

export function getProductsByType(departmentSlug: string, typeSlug: string) {
  return products.filter(
    (product) =>
      slugify(product.department) === departmentSlug && slugify(product.type) === typeSlug
  );
}

export function getFeaturedProducts(limit = 6) {
  return [...products].sort((a, b) => b.rating - a.rating).slice(0, limit);
}
