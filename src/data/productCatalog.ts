import { categoryProducts } from "./categoryProducts";
import { menProducts } from "./menProducts";
import { products } from "./products";
import { womenProducts } from "./womenProducts";

export type CatalogProduct = {
  id: string;
  name: string;
  price: string;
  category: "women" | "men" | "accessories" | "equipment";
  collection: "Home" | "Women" | "Men" | "Accessories" | "Equipment";
  description: string;
  images: [string, string, string];
  highlights: string[];
};

const homeProducts: CatalogProduct[] = products.map((product) => ({
  id: product.id,
  name: product.name,
  price: product.price,
  category: product.category,
  collection: "Home",
  description: product.description,
  images: [product.imagePrimary, product.imageSecondary, product.imagePrimary],
  highlights: [
    "Performance-ready comfort for daily training",
    "Lightweight feel with an easy athletic fit",
    "Made for gym sessions, movement, and everyday wear",
    "Clean PeakFit styling for a versatile wardrobe",
  ],
}));

const womenCatalogProducts: CatalogProduct[] = womenProducts.map((product) => ({
  id: product.id,
  name: product.name,
  price: product.price,
  category: product.category === "accessories" ? "accessories" : "women",
  collection: "Women",
  description: "A women-focused PeakFit piece designed for confident training and everyday movement.",
  images: product.images,
  highlights: [
    "Designed for active routines and flexible styling",
    "Soft performance feel with a flattering fit",
    "Easy to pair with other PeakFit essentials",
    "Built for training, recovery, and daily wear",
  ],
}));

const menCatalogProducts: CatalogProduct[] = menProducts.map((product) => ({
  id: product.id,
  name: product.name,
  price: product.price,
  category: "men",
  collection: "Men",
  description: "A men-focused PeakFit piece built for training, comfort, and strong everyday style.",
  images: product.images,
  highlights: [
    "Athletic cut made for movement",
    "Breathable performance-inspired construction",
    "Clean shape for gym and street wear",
    "Reliable comfort through daily workouts",
  ],
}));

const categoryCatalogProducts: CatalogProduct[] = categoryProducts.map((product) => ({
  id: product.id,
  name: product.name,
  price: product.price,
  category: product.category,
  collection: product.category === "accessories" ? "Accessories" : "Equipment",
  description:
    product.category === "accessories"
      ? "A PeakFit accessory made to support your routine before, during, and after training."
      : "A PeakFit training tool built to bring more structure and intensity to your workouts.",
  images: product.images,
  highlights:
    product.category === "accessories"
      ? [
          "Compact essential for everyday training",
          "Easy to carry, store, and pair with your kit",
          "Clean PeakFit styling with practical function",
          "Useful for gym days, outdoor sessions, and recovery",
        ]
      : [
          "Built for focused strength and conditioning work",
          "Designed for home and gym training routines",
          "Durable feel for repeated sessions",
          "Simple tool to support progressive workouts",
        ],
}));

export const catalogProducts: CatalogProduct[] = [
  ...homeProducts,
  ...womenCatalogProducts,
  ...menCatalogProducts,
  ...categoryCatalogProducts,
];

export const relatedCatalogProducts = categoryCatalogProducts;
