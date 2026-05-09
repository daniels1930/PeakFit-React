export type CategoryProduct = {
  id: string;
  name: string;
  price: string;
  isNew: boolean;
  category: "accessories" | "equipment";
  images: [string, string, string];
};

export const categoryProducts: CategoryProduct[] = [
  {
    id: "ac-1",
    name: "PeakFit Training Cap",
    price: "$24.00 USD",
    isNew: true,
    category: "accessories",
    images: [
      "/assets/images/pages/Categories/accessories/ac-1-a.png",
      "/assets/images/pages/Categories/accessories/ac-1-b.png",
      "/assets/images/pages/Categories/accessories/ac-1-c.png",
    ],
  },
  {
    id: "ac-2",
    name: "Performance Gym Bag",
    price: "$58.00 USD",
    isNew: true,
    category: "accessories",
    images: [
      "/assets/images/pages/Categories/accessories/ac-2-a.png",
      "/assets/images/pages/Categories/accessories/ac-2-b.png",
      "/assets/images/pages/Categories/accessories/ac-2-c.png",
    ],
  },
  {
    id: "ac-3",
    name: "Grip Training Gloves",
    price: "$32.00 USD",
    isNew: true,
    category: "accessories",
    images: [
      "/assets/images/pages/Categories/accessories/ac-3-a.png",
      "/assets/images/pages/Categories/accessories/ac-3-b.png",
      "/assets/images/pages/Categories/accessories/ac-3-c.png",
    ],
  },
  {
    id: "ac-4",
    name: "Core Crew Socks",
    price: "$18.00 USD",
    isNew: false,
    category: "accessories",
    images: [
      "/assets/images/pages/Categories/accessories/ac-4-a.png",
      "/assets/images/pages/Categories/accessories/ac-4-b.png",
      "/assets/images/pages/Categories/accessories/ac-4-c.png",
    ],
  },
  {
    id: "ac-5",
    name: "Hydration Bottle",
    price: "$22.00 USD",
    isNew: true,
    category: "accessories",
    images: [
      "/assets/images/pages/Categories/accessories/ac-5-a.png",
      "/assets/images/pages/Categories/accessories/ac-5-b.png",
      "/assets/images/pages/Categories/accessories/ac-5-c.png",
    ],
  },
  {
    id: "ac-6",
    name: "Wrist Support Wraps",
    price: "$20.00 USD",
    isNew: false,
    category: "accessories",
    images: [
      "/assets/images/pages/Categories/accessories/ac-6-a.png",
      "/assets/images/pages/Categories/accessories/ac-6-b.png",
      "/assets/images/pages/Categories/accessories/ac-6-c.png",
    ],
  },
  {
    id: "ac-7",
    name: "Training Towel",
    price: "$16.00 USD",
    isNew: false,
    category: "accessories",
    images: [
      "/assets/images/pages/Categories/accessories/ac-7-a.png",
      "/assets/images/pages/Categories/accessories/ac-7-b.png",
      "/assets/images/pages/Categories/accessories/ac-7-c.png",
    ],
  },
  {
    id: "ac-8",
    name: "Running Waist Pack",
    price: "$28.00 USD",
    isNew: true,
    category: "accessories",
    images: [
      "/assets/images/pages/Categories/accessories/ac-8-a.png",
      "/assets/images/pages/Categories/accessories/ac-8-b.png",
      "/assets/images/pages/Categories/accessories/ac-8-c.png",
    ],
  },
  {
    id: "eq-1",
    name: "Adjustable Dumbbell Set",
    price: "$120.00 USD",
    isNew: true,
    category: "equipment",
    images: [
      "/assets/images/pages/Categories/equipment/eq-1-a.png",
      "/assets/images/pages/Categories/equipment/eq-1-b.png",
      "/assets/images/pages/Categories/equipment/eq-1-c.png",
    ],
  },
  {
    id: "eq-2",
    name: "Resistance Band Kit",
    price: "$36.00 USD",
    isNew: true,
    category: "equipment",
    images: [
      "/assets/images/pages/Categories/equipment/eq-2-a.png",
      "/assets/images/pages/Categories/equipment/eq-2-b.png",
      "/assets/images/pages/Categories/equipment/eq-2-c.png",
    ],
  },
  {
    id: "eq-3",
    name: "Premium Yoga Mat",
    price: "$44.00 USD",
    isNew: false,
    category: "equipment",
    images: [
      "/assets/images/pages/Categories/equipment/eq-3-a.png",
      "/assets/images/pages/Categories/equipment/eq-3-b.png",
      "/assets/images/pages/Categories/equipment/eq-3-c.png",
    ],
  },
  {
    id: "eq-4",
    name: "Speed Jump Rope",
    price: "$26.00 USD",
    isNew: true,
    category: "equipment",
    images: [
      "/assets/images/pages/Categories/equipment/eq-4-a.png",
      "/assets/images/pages/Categories/equipment/eq-4-b.png",
      "/assets/images/pages/Categories/equipment/eq-4-c.png",
    ],
  },
  {
    id: "eq-5",
    name: "Core Stability Ball",
    price: "$34.00 USD",
    isNew: false,
    category: "equipment",
    images: [
      "/assets/images/pages/Categories/equipment/eq-5-a.png",
      "/assets/images/pages/Categories/equipment/eq-5-b.png",
      "/assets/images/pages/Categories/equipment/eq-5-c.png",
    ],
  },
  {
    id: "eq-6",
    name: "Foam Recovery Roller",
    price: "$30.00 USD",
    isNew: true,
    category: "equipment",
    images: [
      "/assets/images/pages/Categories/equipment/eq-6-a.png",
      "/assets/images/pages/Categories/equipment/eq-6-b.png",
      "/assets/images/pages/Categories/equipment/eq-6-c.png",
    ],
  },
  {
    id: "eq-7",
    name: "Kettlebell Trainer",
    price: "$48.00 USD",
    isNew: false,
    category: "equipment",
    images: [
      "/assets/images/pages/Categories/equipment/eq-7-a.png",
      "/assets/images/pages/Categories/equipment/eq-7-b.png",
      "/assets/images/pages/Categories/equipment/eq-7-c.png",
    ],
  },
  {
    id: "eq-8",
    name: "Push-Up Bar Pair",
    price: "$24.00 USD",
    isNew: false,
    category: "equipment",
    images: [
      "/assets/images/pages/Categories/equipment/eq-8-a.png",
      "/assets/images/pages/Categories/equipment/eq-8-b.png",
      "/assets/images/pages/Categories/equipment/eq-8-c.png",
    ],
  },
];
