export type WomenProduct = {
  id: string;
  name: string;
  price: string;
  isNew: boolean;
  category: "clothing" | "accessories" | "supplements";
  images: [string, string, string];
};

export const womenProducts: WomenProduct[] = [
  {
    id: "wc-1",
    name: "Set – Crop top + athletic shorts",
    price: "$54.90 USD",
    isNew: true,
    category: "clothing",
    images: [
      "/assets/images/pages/WomenCollection/wc-1-a.png",
      "/assets/images/pages/WomenCollection/wc-1-b.png",
      "/assets/images/pages/WomenCollection/wc-1-c.png",
    ],
  },
  {
    id: "wc-2",
    name: "Oversized – Accolade Full Zip Hoodie",
    price: "$49.90 USD",
    isNew: true,
    category: "clothing",
    images: [
      "/assets/images/pages/WomenCollection/wc-2-a.png",
      "/assets/images/pages/WomenCollection/wc-2-b.png",
      "/assets/images/pages/WomenCollection/wc-2-c.png",
    ],
  },
  {
    id: "wc-3",
    name: "Set – Sports Top + High Impact Leggings",
    price: "$62.00 USD",
    isNew: true,
    category: "clothing",
    images: [
      "/assets/images/pages/WomenCollection/wc-3-a.png",
      "/assets/images/pages/WomenCollection/wc-3-b.png",
      "/assets/images/pages/WomenCollection/wc-3-c.png",
    ],
  },
  {
    id: "wc-4",
    name: "Set – Seamless gray top + leggings",
    price: "$59.90 USD",
    isNew: false,
    category: "clothing",
    images: [
      "/assets/images/pages/WomenCollection/wc-4-a.png",
      "/assets/images/pages/WomenCollection/wc-4-b.png",
      "/assets/images/pages/WomenCollection/wc-4-c.png",
    ],
  },
  {
    id: "wc-5",
    name: "Sports jacket – Long sleeve with zipper",
    price: "$42.00 USD",
    isNew: false,
    category: "clothing",
    images: [
      "/assets/images/pages/WomenCollection/wc-5-a.png",
      "/assets/images/pages/WomenCollection/wc-5-b.png",
      "/assets/images/pages/WomenCollection/wc-5-c.png",
    ],
  },
  {
    id: "wc-6",
    name: "Jogger – Wide-leg athletic pants",
    price: "$42.00 USD",
    isNew: true,
    category: "clothing",
    images: [
      "/assets/images/pages/WomenCollection/wc-6-a.png",
      "/assets/images/pages/WomenCollection/wc-6-b.png",
      "/assets/images/pages/WomenCollection/wc-6-c.png",
    ],
  },
  {
    id: "wc-7",
    name: "Set – Tank Top + Sport Shorts",
    price: "$52.00 USD",
    isNew: true,
    category: "clothing",
    images: [
      "/assets/images/pages/WomenCollection/wc-7-a.png",
      "/assets/images/pages/WomenCollection/wc-7-b.png",
      "/assets/images/pages/WomenCollection/wc-7-c.png",
    ],
  },
  {
    id: "wc-8",
    name: "Top – Medium support sports bra",
    price: "$28.50 USD",
    isNew: false,
    category: "accessories",
    images: [
      "/assets/images/pages/WomenCollection/wc-8-a.png",
      "/assets/images/pages/WomenCollection/wc-8-b.png",
      "/assets/images/pages/WomenCollection/wc-8-c.png",
    ],
  },
];