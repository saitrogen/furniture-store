import type { APIRoute } from "astro";
import { getProducts } from "@/lib/catalog";

export const GET: APIRoute = () => {
  const searchIndex = getProducts().map((product) => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    department: product.department,
    departmentSlug: product.departmentSlug,
    type: product.type,
    typeSlug: product.typeSlug,
    price: product.price,
    rating: product.rating,
    searchText: product.searchText,
  }));

  return new Response(JSON.stringify(searchIndex), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
