#!/usr/bin/env node
/**
 * Transforms temp/IKEA_SA_Furniture.csv → src/content/localData/products.ts
 * Run: node scripts/generate-products.mjs
 */
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

// ── Confirmed Unsplash photo IDs (all verified in existing codebase) ──────────
const POOLS = {
  sofa:      ["1555041469-a586c61ea9bc", "1493663284031-b7e3aefcae8e"],
  chair:     ["1586023492125-27b2c045efd7", "1589384267710-7a170981ca78", "1582582621959-48d27397dc69"],
  table:     ["1538688423619-a81d3f23454b", "1617104551722-3b2d51366400"],
  desk:      ["1593642632559-0c6d3fc62b89", "1538688423619-a81d3f23454b"],
  bed:       ["1505693416388-ac5ce068fe85", "1595526114035-0d45ed16cfbf"],
  dresser:   ["1595526114035-0d45ed16cfbf", "1505693416388-ac5ce068fe85"],
  bookcase:  ["1481277542470-605612bd2d61", "1556909114-44e3e70034e2"],
  cabinet:   ["1556909114-44e3e70034e2", "1481277542470-605612bd2d61"],
  tv:        ["1505693416388-ac5ce068fe85", "1538688423619-a81d3f23454b"],
  outdoor:   ["1600566753086-00f18fb6b3ea"],
  dining:    ["1582582621959-48d27397dc69", "1617104551722-3b2d51366400"],
  sideboard: ["1556909114-44e3e70034e2", "1481277542470-605612bd2d61"],
};

function imgUrl(pool, idx) {
  const arr = POOLS[pool] ?? POOLS.table;
  return `https://images.unsplash.com/photo-${arr[idx % arr.length]}?q=80&w=1200&auto=format&fit=crop`;
}

// ── Slugify ───────────────────────────────────────────────────────────────────
function slugify(str) {
  return str
    .normalize("NFKD")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ── Category mapping ─────────────────────────────────────────────────────────
// Uses short_description to disambiguate generic IKEA categories
function mapRow(ikeaCategory, shortDesc) {
  const d = shortDesc.toLowerCase();

  switch (ikeaCategory) {
    case "Sofas & armchairs":
      if (d.includes("armchair") || d.includes("footstool") || d.includes("pouf"))
        return { category: "Furniture", department: "Living Room Furniture", type: "Accent Chairs", pool: "chair" };
      return { category: "Furniture", department: "Living Room Furniture", type: "Sofas", pool: "sofa" };

    case "Chairs":
      if (d.includes("office") || d.includes("swivel") || d.includes("task") || d.includes("mesh"))
        return { category: "Furniture", department: "Office Furniture", type: "Office Chairs", pool: "chair" };
      return { category: "Furniture", department: "Kitchen & Dining Furniture", type: "Dining Chairs", pool: "chair" };

    case "Tables & desks":
      if (d.includes("desk") || d.includes("writing table") || d.includes("computer table"))
        return { category: "Furniture", department: "Office Furniture", type: "Desks", pool: "desk" };
      if (d.includes("dining table") || d.includes("extendable") || d.includes("drop-leaf table"))
        return { category: "Furniture", department: "Kitchen & Dining Furniture", type: "Dining Tables", pool: "table" };
      if (d.includes("coffee table") || d.includes("nest of tables"))
        return { category: "Furniture", department: "Living Room Furniture", type: "Coffee Tables", pool: "table" };
      return { category: "Furniture", department: "Living Room Furniture", type: "Side Tables", pool: "table" };

    case "Beds":
      return { category: "Furniture", department: "Bedroom Furniture", type: "Beds", pool: "bed" };

    case "Wardrobes":
      return { category: "Furniture", department: "Bedroom Furniture", type: "Wardrobes", pool: "dresser" };

    case "Chests of drawers & drawer units":
      return { category: "Furniture", department: "Bedroom Furniture", type: "Dressers", pool: "dresser" };

    case "Bookcases & shelving units":
      return { category: "Furniture", department: "Storage Furniture", type: "Bookcases", pool: "bookcase" };

    case "Cabinets & cupboards":
      return { category: "Furniture", department: "Storage Furniture", type: "Cabinets", pool: "cabinet" };

    case "TV & media furniture":
      return { category: "Furniture", department: "Living Room Furniture", type: "TV Stands", pool: "tv" };

    case "Bar furniture":
      return { category: "Furniture", department: "Kitchen & Dining Furniture", type: "Bar Furniture", pool: "dining" };

    case "Café furniture":
      return { category: "Furniture", department: "Kitchen & Dining Furniture", type: "Dining Sets", pool: "dining" };

    case "Sideboards, buffets & console tables":
      return { category: "Furniture", department: "Storage Furniture", type: "Sideboards", pool: "sideboard" };

    case "Room dividers":
      return { category: "Furniture", department: "Storage Furniture", type: "Room Dividers", pool: "bookcase" };

    case "Outdoor furniture":
      return { category: "Furniture", department: "Outdoor Furniture", type: "Outdoor Furniture", pool: "outdoor" };

    case "Children's furniture":
      return { category: "Furniture", department: "Children's Furniture", type: "Children's Furniture", pool: "chair" };

    case "Nursery furniture":
      return { category: "Furniture", department: "Children's Furniture", type: "Nursery Furniture", pool: "bed" };

    default:
      return null; // skip Trolleys, unknown
  }
}

// ── How many products to take per IKEA category ───────────────────────────────
const LIMITS = {
  "Sofas & armchairs":                    30,
  "Chairs":                               30,
  "Tables & desks":                       30,
  "Beds":                                 15,
  "Wardrobes":                            12,
  "Chests of drawers & drawer units":     10,
  "Bookcases & shelving units":           12,
  "Cabinets & cupboards":                 12,
  "TV & media furniture":                 10,
  "Bar furniture":                         6,
  "Café furniture":                        5,
  "Sideboards, buffets & console tables":  8,
  "Room dividers":                         4,
  "Outdoor furniture":                    12,
  "Children's furniture":                  6,
  "Nursery furniture":                     5,
};

// ── Deterministic rating seeded on item_id ────────────────────────────────────
function genRating(itemId) {
  const n = parseInt(String(itemId).replace(/\D/g, "").slice(-3)) || 500;
  return Math.round((3.8 + (n % 12) / 10) * 10) / 10;
}

// ── CSV parser (handles quoted fields containing commas) ──────────────────────
function parseCSV(text) {
  const lines = text.split("\n").filter((l) => l.trim());
  const headers = splitLine(lines[0]);
  return lines.slice(1).map((line) => {
    const vals = splitLine(line);
    return Object.fromEntries(headers.map((h, i) => [h.trim(), (vals[i] ?? "").trim()]));
  });
}

function splitLine(line) {
  const out = [];
  let cur = "";
  let inQ = false;
  for (const c of line) {
    if (c === '"') { inQ = !inQ; }
    else if (c === "," && !inQ) { out.push(cur); cur = ""; }
    else cur += c;
  }
  out.push(cur);
  return out;
}

// ── Build a readable product name from IKEA model + short_description ─────────
function buildName(rawName, shortDesc) {
  // Title-case the model name (IKEA uses ALL CAPS)
  const model = rawName
    .split(" / ")[0]
    .trim()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
  // First comma-segment of short_description is the product type ("Bar table", "Armchair" …)
  const typeLabel = shortDesc.split(",")[0].trim();
  if (!typeLabel || model.toLowerCase().includes(typeLabel.toLowerCase())) return model;
  return `${model} ${typeLabel}`;
}

// ── Main ──────────────────────────────────────────────────────────────────────
const csv = readFileSync(join(ROOT, "temp/IKEA_SA_Furniture.csv"), "utf8");
const rows = parseCSV(csv);

const counts = {};
const slugsSeen = new Set();
const products = [];
let pid = 1;

for (const row of rows) {
  const cat = row.category?.trim() ?? "";
  const limit = LIMITS[cat] ?? 0;
  counts[cat] ??= 0;
  if (counts[cat] >= limit) continue;

  const sarPrice = parseFloat((row.price ?? "").replace(/[^0-9.]/g, ""));
  if (!sarPrice || sarPrice <= 0) continue;
  const price = Math.round(sarPrice * 22);

  const mapped = mapRow(cat, row.short_description ?? "");
  if (!mapped) continue;

  const rawName = row.name?.trim() ?? "";
  if (!rawName) continue;

  const name = buildName(rawName, (row.short_description ?? "").trim());

  let slug = slugify(name);
  if (!slug) slug = `product-${row.item_id}`;
  if (slugsSeen.has(slug)) slug = `${slug}-${row.item_id}`;
  slugsSeen.add(slug);

  // Build properties for the detail page spec table
  const properties = {
    "Product ID": `IK${row.item_id}`,
    Type: mapped.type,
  };
  if (row.designer?.trim()) properties["Designer"] = row.designer.trim();
  if (row.width && parseFloat(row.width)) properties["Width"] = `${parseFloat(row.width)} cm`;
  if (row.height && parseFloat(row.height)) properties["Height"] = `${parseFloat(row.height)} cm`;
  if (row.depth && parseFloat(row.depth)) properties["Depth"] = `${parseFloat(row.depth)} cm`;

  const product = {
    id: `P${String(pid).padStart(3, "0")}`,
    name,
    slug,
    category: mapped.category,
    department: mapped.department,
    type: mapped.type,
    price,
    image: imgUrl(mapped.pool, counts[cat]),
    rating: genRating(row.item_id),
    ...(row.designer?.trim() ? { designer: row.designer.trim() } : {}),
    ...(row.short_description?.trim() ? { shortDescription: row.short_description.trim() } : {}),
    ...(row.other_colors === "Yes" ? { hasColorOptions: true } : {}),
    properties,
  };

  products.push(product);
  counts[cat]++;
  pid++;
}

// ── Write products.ts ─────────────────────────────────────────────────────────
const output = `export interface Product {
  id: string
  name: string
  slug: string
  category: string
  department: string
  type: string
  price: number
  image: string
  rating: number
  designer?: string
  shortDescription?: string
  hasColorOptions?: boolean
  properties?: Record<string, string | number>
}

export const products: Product[] = ${JSON.stringify(products, null, 2)}
`;

writeFileSync(join(ROOT, "src/content/localData/products.ts"), output);

console.log(`\n✓ Generated ${products.length} products\n`);

const byDept = {};
products.forEach((p) => { byDept[p.department] = (byDept[p.department] ?? 0) + 1; });
const table = Object.entries(byDept)
  .sort((a, b) => b[1] - a[1])
  .map(([dept, count]) => ({ Department: dept, Products: count }));
console.table(table);
