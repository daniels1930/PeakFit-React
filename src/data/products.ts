export type Product = {
  id: string;
  name: string;
  price: string;
  category: "women" | "men" | "accessories" | "equipment";
  description: string;
  imagePrimary: string;
  imageSecondary: string;
};

export const products: Product[] = [
  {
    id: "active-tennis-dress",
    name: "Active Tennis Dress",
    price: "$58.00",
    category: "women",
    description: "Lightweight performance dress for training, tennis, and everyday movement.",
    imagePrimary: "/assets/images/productos/img1.png",
    imageSecondary: "/assets/images/productos/img12.png",
  },
  {
    id: "training-tank",
    name: "Training Tank",
    price: "$35.00",
    category: "women",
    description: "Breathable training tank made for high-intensity sessions.",
    imagePrimary: "/assets/images/productos/img2.png",
    imageSecondary: "/assets/images/productos/img22.png",
  },
  {
    id: "yoga-leggings",
    name: "Yoga Leggings",
    price: "$60.00",
    category: "women",
    description: "Flexible leggings with a secure fit for yoga, gym, and recovery days.",
    imagePrimary: "/assets/images/productos/img3.png",
    imageSecondary: "/assets/images/productos/img32.png",
  },
  {
    id: "long-sleeve-top",
    name: "Long Sleeve Top",
    price: "$45.00",
    category: "women",
    description: "Soft long sleeve top for warmups, outdoor training, and casual wear.",
    imagePrimary: "/assets/images/productos/img4.png",
    imageSecondary: "/assets/images/productos/img42.png",
  },
  {
    id: "men-shorts",
    name: "Men Shorts",
    price: "$40.00",
    category: "men",
    description: "Training shorts built for mobility and daily workouts.",
    imagePrimary: "/assets/images/productos/img5.png",
    imageSecondary: "/assets/images/productos/img52.png",
  },
  {
    id: "training-shirt",
    name: "Training Shirt",
    price: "$38.00",
    category: "men",
    description: "Performance shirt with a clean fit for strength and conditioning.",
    imagePrimary: "/assets/images/productos/img6.png",
    imageSecondary: "/assets/images/productos/img62.png",
  },
  {
    id: "sport-t-shirt",
    name: "Sport T-Shirt",
    price: "$42.00",
    category: "men",
    description: "Everyday sport t-shirt with breathable fabric and relaxed movement.",
    imagePrimary: "/assets/images/productos/img7.png",
    imageSecondary: "/assets/images/productos/img72.png",
  },
  {
    id: "running-shorts",
    name: "Running Shorts",
    price: "$36.00",
    category: "men",
    description: "Lightweight running shorts for cardio, speed work, and training days.",
    imagePrimary: "/assets/images/productos/img8.png",
    imageSecondary: "/assets/images/productos/img82.png",
  },
];
