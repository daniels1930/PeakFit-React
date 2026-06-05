import {
  catalogProducts,
  fetchCatalogProducts,
  type CatalogCategory,
  type CatalogProduct,
} from "./productCatalog";

const searchKeywords: Record<CatalogCategory, string[]> = {
  accessories: ["accessory", "accesorios", "gear", "cap", "bag", "gloves", "bottle", "towel"],
  equipment: ["equipos", "training tools", "dumbbell", "weights", "mat", "rope", "kettlebell", "bar"],
  men: ["hombre", "male", "shorts", "shirt"],
  women: ["mujer", "female", "dress", "tank", "leggings", "top"],
};

export function normalizeSearch(value: string) {
  return value.trim().toLowerCase();
}

function rankProducts(products: CatalogProduct[], query: string) {
  const normalizedQuery = normalizeSearch(query);

  if (!normalizedQuery) {
    return [];
  }

  const terms = normalizedQuery.split(/\s+/).filter(Boolean);

  return products
    .map((product) => {
      const keywordText = searchKeywords[product.category].join(" ");
      const searchableText = normalizeSearch(
        [
          product.name,
          product.price,
          product.category,
          product.collection,
          product.productType,
          product.description,
          product.highlights.join(" "),
          keywordText,
        ].join(" ")
      );
      const name = normalizeSearch(product.name);
      let score = 0;

      if (name === normalizedQuery) score += 100;
      if (name.includes(normalizedQuery)) score += 50;
      if (searchableText.includes(normalizedQuery)) score += 20;

      score += terms.filter((term) => searchableText.includes(term)).length * 8;

      return { product, score };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((result) => result.product);
}

export function searchCatalogProducts(query: string) {
  return rankProducts(catalogProducts, query);
}

export async function searchCatalogProductsAsync(query: string) {
  const products = await fetchCatalogProducts();
  return rankProducts(products, query);
}
