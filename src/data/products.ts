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
    id: "d8c54c34-a212-4f36-96b6-d2ef21f92e44",
    name: "Active Tennis Dress",
    price: "$58.00",
    category: "women",
    description: "Lightweight performance dress for training, tennis, and everyday movement.",
    imagePrimary: "/assets/images/productos/img1.png",
    imageSecondary: "/assets/images/productos/img12.png",
  },
  {
    id: "a1b023f4-345f-46e2-9bda-8f0a0d9e843c",
    name: "Training Tank",
    price: "$35.00",
    category: "women",
    description: "Breathable training tank made for high-intensity sessions.",
    imagePrimary: "/assets/images/productos/img2.png",
    imageSecondary: "/assets/images/productos/img22.png",
  },
  {
    id: "b4578e90-c081-42e1-9556-3bda5c00e1cf",
    name: "Yoga Leggings",
    price: "$60.00",
    category: "women",
    description: "Flexible leggings with a secure fit for yoga, gym, and recovery days.",
    imagePrimary: "/assets/images/productos/img3.png",
    imageSecondary: "/assets/images/productos/img32.png",
  },
  {
    id: "e7b89d01-e234-45ff-867b-1234a5b6c7d8",
    name: "Long Sleeve Top",
    price: "$45.00",
    category: "women",
    description: "Soft long sleeve top for warmups, outdoor training, and casual wear.",
    imagePrimary: "/assets/images/productos/img4.png",
    imageSecondary: "/assets/images/productos/img42.png",
  },
  {
    id: "f8c9d01a-f345-46ff-b789-5678b6c7d8e9",
    name: "Men Shorts",
    price: "$40.00",
    category: "men",
    description: "Training shorts built for mobility and daily workouts.",
    imagePrimary: "/assets/images/productos/img5.png",
    imageSecondary: "/assets/images/productos/img52.png",
  },
  {
    id: "ad01b2c3-456f-47ff-b890-6789c7d8e9a0",
    name: "Training Shirt",
    price: "$38.00",
    category: "men",
    description: "Performance shirt with a clean fit for strength and conditioning.",
    imagePrimary: "/assets/images/productos/img6.png",
    imageSecondary: "/assets/images/productos/img62.png",
  },
  {
    id: "bc12c3d4-567f-48ff-9901-7890d8e9a0b1",
    name: "Sport T-Shirt",
    price: "$42.00",
    category: "men",
    description: "Everyday sport t-shirt with breathable fabric and relaxed movement.",
    imagePrimary: "/assets/images/productos/img7.png",
    imageSecondary: "/assets/images/productos/img72.png",
  },
  {
    id: "cd23d4e5-678f-49ff-a012-8901e9a0b1c2",
    name: "Running Shorts",
    price: "$36.00",
    category: "men",
    description: "Lightweight running shorts for cardio, speed work, and training days.",
    imagePrimary: "/assets/images/productos/img8.png",
    imageSecondary: "/assets/images/productos/img82.png",
  },
];
