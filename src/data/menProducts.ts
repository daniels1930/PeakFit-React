export type MenProduct = {
  id: string;
  name: string;
  price: string;
  isNew: boolean;
  category: "clothing" | "accessories" | "supplements";
  images: [string, string, string];
};

export const menProducts: MenProduct[] = [
  {
    id: "mc-1",
    name: "Core Essential Track Jacket",
    price: "$72.00 USD",
    isNew: true,
    category: "clothing",
    images: [
      "/assets/images/pages/MenCollection/mc-1-a.png",
      "/assets/images/pages/MenCollection/mc-1-b.png",
      "/assets/images/pages/MenCollection/mc-1-c.png",
    ],
  },
  {
    id: "mc-2",
    name: "Titan Precision Long Sleeve",
    price: "$55.00 USD",
    isNew: true,
    category: "clothing",
    images: [
      "/assets/images/pages/MenCollection/mc-2-a.png",
      "/assets/images/pages/MenCollection/mc-2-b.png",
      "/assets/images/pages/MenCollection/mc-2-c.png",
    ],
  },
  {
    id: "mc-3",
    name: "Elite Iron Cutoff",
    price: "$48.00 USD",
    isNew: true,
    category: "clothing",
    images: [
      "/assets/images/pages/MenCollection/mc-3-a.png",
      "/assets/images/pages/MenCollection/mc-3-b.png",
      "/assets/images/pages/MenCollection/mc-3-c.png",
    ],
  },
  {
    id: "mc-4",
    name: "Stealth Muscle Tee",
    price: "$52.00 USD",
    isNew: true,
    category: "clothing",
    images: [
      "/assets/images/pages/MenCollection/mc-4-a.png",
      "/assets/images/pages/MenCollection/mc-4-b.png",
      "/assets/images/pages/MenCollection/mc-4-c.png",
    ],
  },
  {
    id: "mc-5",
    name: "Midnight Core Performance Set",
    price: "$52.00 USD",
    isNew: true,
    category: "clothing",
    images: [
      "/assets/images/pages/MenCollection/mc-5-a.png",
      "/assets/images/pages/MenCollection/mc-5-b.png",
      "/assets/images/pages/MenCollection/mc-5-c.png",
    ],
  },
  {
    id: "mc-6",
    name: "Apex Performance Tech Tee",
    price: "$42.00 USD",
    isNew: true,
    category: "clothing",
    images: [
      "/assets/images/pages/MenCollection/mc-6-a.png",
      "/assets/images/pages/MenCollection/mc-6-b.png",
      "/assets/images/pages/MenCollection/mc-6-c.png",
    ],
  },
  {
    id: "mc-7",
    name: "Oversized Pullover",
    price: "$55.00 USD",
    isNew: true,
    category: "clothing",
    images: [
      "/assets/images/pages/MenCollection/mc-7-a.png",
      "/assets/images/pages/MenCollection/mc-7-b.png",
      "/assets/images/pages/MenCollection/mc-7-c.png",
    ],
  },
  {
    id: "mc-8",
    name: "Cloud-Soft Court Hoodie",
    price: "$67.00 USD",
    isNew: true,
    category: "clothing",
    images: [
      "/assets/images/pages/MenCollection/mc-8-a.png",
      "/assets/images/pages/MenCollection/mc-8-b.png",
      "/assets/images/pages/MenCollection/mc-8-c.png",
    ],
  },
];
