import type { APIRoute } from "astro";
import { getCatalogIndex } from "@/lib/catalog";

export const GET: APIRoute = () =>
  new Response(JSON.stringify(getCatalogIndex()), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
