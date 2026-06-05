import { supabase } from "../lib/supabase";

export type CatalogCategory = "women" | "men" | "accessories" | "equipment";
export type CatalogCollection = "Home" | "Women" | "Men" | "Accessories" | "Equipment";
export type CatalogProductType = "clothing" | "accessories" | "supplements" | "equipment";

export type CatalogProduct = {
  id: string;
  name: string;
  price: string;
  category: CatalogCategory;
  collection: CatalogCollection;
  productType: CatalogProductType;
  description: string;
  images: [string, string, string];
  highlights: string[];
  isNew: boolean;
};

type RawCatalogProduct = Record<string, unknown>;

const catalogApiUrl = import.meta.env.VITE_CATALOG_API_URL as string | undefined;

const defaultImage = "/assets/images/footer/logo.png";
const cachedCatalogProducts: CatalogProduct[] = [];

export const catalogProducts = cachedCatalogProducts;
export const relatedCatalogProducts = cachedCatalogProducts;

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function asBoolean(value: unknown) {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value === 1;
  if (typeof value === "string") return ["true", "1", "yes", "new"].includes(value.toLowerCase());
  return false;
}

function toArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(asString).filter(Boolean);
  const stringValue = asString(value);
  if (!stringValue) return [];

  try {
    const parsed = JSON.parse(stringValue) as unknown;
    if (Array.isArray(parsed)) return parsed.map(asString).filter(Boolean);
  } catch {
    return stringValue
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function pickString(raw: RawCatalogProduct, keys: string[]) {
  for (const key of keys) {
    const value = asString(raw[key]);
    if (value) return value;
  }
  return "";
}

function normalizePrice(value: unknown) {
  if (typeof value === "number") return `$${value.toFixed(2)} USD`;

  const text = asString(value);
  if (!text) return "$0.00 USD";
  if (text.includes("$")) return text;

  const numberValue = Number(text);
  if (!Number.isNaN(numberValue)) return `$${numberValue.toFixed(2)} USD`;

  return text;
}

function normalizeCollection(raw: RawCatalogProduct): CatalogCollection {
  const value = pickString(raw, ["collection", "gender", "section", "audience", "department"]).toLowerCase();
  const category = pickString(raw, ["category", "type", "product_type", "productType"]).toLowerCase();

  if (value.includes("women") || value.includes("mujer") || value.includes("female")) return "Women";
  if (value.includes("men") || value.includes("hombre") || value.includes("male")) return "Men";
  if (value.includes("accessor") || category.includes("accessor")) return "Accessories";
  if (value.includes("equipment") || value.includes("gear") || category.includes("equipment")) return "Equipment";

  return "Home";
}

function normalizeCategory(raw: RawCatalogProduct, collection: CatalogCollection): CatalogCategory {
  const value = pickString(raw, ["category", "gender", "collection", "section", "type", "product_type"]).toLowerCase();

  if (value.includes("accessor")) return "accessories";
  if (value.includes("equipment") || value.includes("gear")) return "equipment";
  if (value.includes("women") || value.includes("mujer") || value.includes("female")) return "women";
  if (value.includes("men") || value.includes("hombre") || value.includes("male")) return "men";
  if (collection === "Women") return "women";
  if (collection === "Men") return "men";
  if (collection === "Accessories") return "accessories";
  if (collection === "Equipment") return "equipment";

  return "equipment";
}

function normalizeProductType(raw: RawCatalogProduct, category: CatalogCategory): CatalogProductType {
  const value = pickString(raw, ["product_type", "productType", "type", "subcategory", "category"]).toLowerCase();

  if (value.includes("supplement")) return "supplements";
  if (value.includes("accessor")) return "accessories";
  if (value.includes("equipment") || value.includes("gear")) return "equipment";
  if (value.includes("clothing") || value.includes("apparel") || value.includes("wear")) return "clothing";
  if (category === "accessories") return "accessories";
  if (category === "equipment") return "equipment";

  return "clothing";
}

function normalizeImages(raw: RawCatalogProduct): [string, string, string] {
  const imageList = [
    ...toArray(raw.images),
    ...toArray(raw.image_urls),
    ...toArray(raw.imageUrls),
    pickString(raw, ["image", "image_url", "imageUrl", "imagePrimary", "thumbnail", "photo_url"]),
    pickString(raw, ["image_secondary", "imageSecondary", "secondary_image"]),
    pickString(raw, ["image_tertiary", "imageTertiary", "tertiary_image"]),
  ].filter(Boolean);

  const first = imageList[0] ?? defaultImage;
  const second = imageList[1] ?? first;
  const third = imageList[2] ?? second;

  return [first, second, third];
}

function normalizeHighlights(raw: RawCatalogProduct, category: CatalogCategory) {
  const highlights = toArray(raw.highlights);
  if (highlights.length > 0) return highlights;

  if (category === "equipment") {
    return [
      "Built for focused strength and conditioning work",
      "Designed for home and gym training routines",
      "Durable feel for repeated sessions",
      "Simple tool to support progressive workouts",
    ];
  }

  return [
    "Designed for active routines and flexible styling",
    "Easy to pair with other PeakFit essentials",
    "Built for training, recovery, and daily wear",
    "Clean PeakFit styling for a versatile wardrobe",
  ];
}

function normalizeCatalogProduct(raw: RawCatalogProduct): CatalogProduct | null {
  const id = pickString(raw, ["id", "uuid", "slug", "product_id", "productId"]);
  const name = pickString(raw, ["name", "title", "product_name", "productName"]);

  if (!id || !name) return null;

  const collection = normalizeCollection(raw);
  const category = normalizeCategory(raw, collection);
  const productType = normalizeProductType(raw, category);
  const description =
    pickString(raw, ["description", "details", "summary"]) ||
    "A PeakFit product designed for training, movement, and everyday performance.";

  return {
    id,
    name,
    price: normalizePrice(raw.price ?? raw.unit_price ?? raw.amount),
    category,
    collection,
    productType,
    description,
    images: normalizeImages(raw),
    highlights: normalizeHighlights(raw, category),
    isNew: asBoolean(raw.is_new ?? raw.isNew ?? raw.new),
  };
}

function updateCatalogCache(products: CatalogProduct[]) {
  cachedCatalogProducts.splice(0, cachedCatalogProducts.length, ...products);
}

async function fetchCatalogRows(): Promise<RawCatalogProduct[]> {
  if (catalogApiUrl) {
    const response = await fetch(catalogApiUrl);
    if (!response.ok) throw new Error("Catalog API request failed.");
    const data = (await response.json()) as unknown;
    const rows = Array.isArray(data) ? data : (data as { products?: unknown[] }).products ?? [];
    return rows.filter((row): row is RawCatalogProduct => Boolean(row) && typeof row === "object");
  }

  const { data, error } = await supabase.from("products").select("*");
  if (error) throw error;
  return (data ?? []) as RawCatalogProduct[];
}

export async function fetchCatalogProducts() {
  const rows = await fetchCatalogRows();
  const products = rows
    .map((row) => normalizeCatalogProduct(row as RawCatalogProduct))
    .filter((product): product is CatalogProduct => product !== null);

  updateCatalogCache(products);
  return products;
}

export async function getCatalogProduct(productId: string) {
  const cachedProduct = cachedCatalogProducts.find((product) => product.id === productId);
  if (cachedProduct) return cachedProduct;

  const products = await fetchCatalogProducts();
  return products.find((product) => product.id === productId) ?? null;
}

export async function getCollectionProducts(collection: CatalogCollection) {
  const products = await fetchCatalogProducts();
  return products.filter((product) => product.collection === collection || product.category === collection.toLowerCase());
}

export async function getCategoryProducts(category: "accessories" | "equipment") {
  const products = await fetchCatalogProducts();
  return products.filter((product) => product.category === category || product.productType === category);
}

export async function getRelatedCatalogProducts(product?: CatalogProduct | null) {
  const products = await fetchCatalogProducts();
  if (!product) return products.slice(0, 8);

  return products
    .filter((item) => item.id !== product.id)
    .sort((a, b) => {
      const aScore = Number(a.category === product.category) + Number(a.productType === product.productType);
      const bScore = Number(b.category === product.category) + Number(b.productType === product.productType);
      return bScore - aScore;
    })
    .slice(0, 8);
}
