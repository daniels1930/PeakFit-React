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
    id: "a3b4c5d6-e7f8-4001-8001-000000000001",
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
    id: "a3b4c5d6-e7f8-4001-8001-000000000002",
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
    id: "a3b4c5d6-e7f8-4001-8001-000000000003",
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
    id: "a3b4c5d6-e7f8-4001-8001-000000000004",
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
    id: "a3b4c5d6-e7f8-4001-8001-000000000005",
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
    id: "a3b4c5d6-e7f8-4001-8001-000000000006",
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
    id: "a3b4c5d6-e7f8-4001-8001-000000000007",
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
    id: "a3b4c5d6-e7f8-4001-8001-000000000008",
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
    id: "e3d4c5b6-a7f8-4002-8002-000000000001",
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
    id: "e3d4c5b6-a7f8-4002-8002-000000000002",
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
    id: "e3d4c5b6-a7f8-4002-8002-000000000003",
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
    id: "e3d4c5b6-a7f8-4002-8002-000000000004",
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
    id: "e3d4c5b6-a7f8-4002-8002-000000000005",
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
    id: "e3d4c5b6-a7f8-4002-8002-000000000006",
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
    id: "e3d4c5b6-a7f8-4002-8002-000000000007",
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
    id: "e3d4c5b6-a7f8-4002-8002-000000000008",
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
