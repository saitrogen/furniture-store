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
export type CatalogProduct = Product & {
  departmentSlug: string;
  typeSlug: string;
  categorySlug: string;
  searchText: string;
};

export const CATALOG_PAGE_SIZE = 16;

export function slugify(value: string) {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function normalizeLabel(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

export function normalizeSearchText(value: string) {
  return normalizeLabel(value)
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function normalizeProduct(product: Product): CatalogProduct {
  const category = normalizeLabel(product.category);
  const department = normalizeLabel(product.department);
  const type = normalizeLabel(product.type);
  const searchText = normalizeSearchText(
    [product.id, product.name, category, department, type].join(" ")
  );

  return {
    ...product,
    category,
    department,
    type,
    categorySlug: slugify(category),
    departmentSlug: slugify(department),
    typeSlug: slugify(type),
    searchText,
  };
}

export function getProducts() {
  return products.map(normalizeProduct);
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
  const departments = new Map<string, CatalogProduct[]>();

  getProducts().forEach((product) => {
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
  return getProducts().filter(
    (product) =>
      product.departmentSlug === departmentSlug && product.typeSlug === typeSlug
  );
}

export function getFeaturedProducts(limit = 6) {
  return [...getProducts()].sort((a, b) => b.rating - a.rating).slice(0, limit);
}

export function getCatalogIndex() {
  const normalizedProducts = getProducts();
  const departments = getDepartments();

  return {
    meta: {
      generatedAt: new Date().toISOString(),
      totalProducts: normalizedProducts.length,
      pageSize: CATALOG_PAGE_SIZE,
    },
    facets: {
      departments: departments.map(({ name, slug, count, image, types }) => ({
        name,
        slug,
        count,
        image,
        types,
      })),
      categories: Array.from(
        new Map(
          normalizedProducts.map((product) => [
            product.categorySlug,
            {
              name: product.category,
              slug: product.categorySlug,
              count: normalizedProducts.filter(
                (item) => item.categorySlug === product.categorySlug
              ).length,
            },
          ])
        ).values()
      ),
    },
    products: normalizedProducts.map((product) => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      category: product.category,
      categorySlug: product.categorySlug,
      department: product.department,
      departmentSlug: product.departmentSlug,
      type: product.type,
      typeSlug: product.typeSlug,
      price: product.price,
      image: product.image,
      rating: product.rating,
      searchText: product.searchText,
    })),
  };
}
