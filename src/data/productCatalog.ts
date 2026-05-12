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

const orderCatalogProducts: CatalogProduct[] = [
  {
    id: "order-product-1",
    name: "Hex Rubber Dumbbell with Chrome Handle Non-Slip Grip Professional Strength Training Black",
    price: "$120.00 USD",
    category: "equipment",
    collection: "Equipment",
    description: "A professional strength training dumbbell designed for stable grip, durable use, and focused workouts.",
    images: [
      "/assets/images/pages/MyOrders/producto1.jpg",
      "/assets/images/pages/MyOrders/producto1.jpg",
      "/assets/images/pages/MyOrders/producto1.jpg",
    ],
    highlights: [
      "Hex shape helps reduce rolling between sets",
      "Chrome handle supports a firm training grip",
      "Rubber coating protects floors and equipment",
      "Built for strength routines at home or in the gym",
    ],
  },
  {
    id: "order-product-2",
    name: "Hex Rubber Dumbbell with Chrome Handle Non-Slip Grip Professional Strength Training Black",
    price: "$24.00 USD",
    category: "equipment",
    collection: "Equipment",
    description: "A compact strength tool made for controlled push-up and upper body training sessions.",
    images: [
      "/assets/images/pages/MyOrders/producto2.jpg",
      "/assets/images/pages/MyOrders/producto2.jpg",
      "/assets/images/pages/MyOrders/producto2.jpg",
    ],
    highlights: [
      "Stable frame for controlled reps",
      "Compact profile for easy storage",
      "Non-slip contact points for training confidence",
      "Useful for chest, shoulder, and arm work",
    ],
  },
  {
    id: "order-product-3",
    name: "Hex Rubber Dumbbell with Chrome Handle Non-Slip Grip Professional Strength Training Black",
    price: "$22.00 USD",
    category: "accessories",
    collection: "Accessories",
    description: "A PeakFit accessory selected from your previous order and ready to buy again.",
    images: [
      "/assets/images/pages/MyOrders/producto3.jpg",
      "/assets/images/pages/MyOrders/producto3.jpg",
      "/assets/images/pages/MyOrders/producto3.jpg",
    ],
    highlights: [
      "Matches the product from your order history",
      "Easy to add back into your routine",
      "Designed for everyday training support",
      "Simple repurchase path from My Orders",
    ],
  },
  {
    id: "order-product-4",
    name: "Hex Rubber Dumbbell with Chrome Handle Non-Slip Grip Professional Strength Training Black",
    price: "$48.00 USD",
    category: "equipment",
    collection: "Equipment",
    description: "A training product from your purchase history, shown with the same image from the order card.",
    images: [
      "/assets/images/pages/MyOrders/producto4.jpg",
      "/assets/images/pages/MyOrders/producto4.jpg",
      "/assets/images/pages/MyOrders/producto4.jpg",
    ],
    highlights: [
      "Connected directly to your order history",
      "Uses the same product image from My Orders",
      "Ready for quick repurchase",
      "Made for structured strength and conditioning work",
    ],
  },
];

export const catalogProducts: CatalogProduct[] = [
  ...homeProducts,
  ...womenCatalogProducts,
  ...menCatalogProducts,
  ...categoryCatalogProducts,
  ...orderCatalogProducts,
];

export const relatedCatalogProducts = categoryCatalogProducts;
