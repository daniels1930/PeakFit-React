export type OrderLine = {
  productId: string;
  name: string;
  image: string;
  quantity: number;
  price: string;
};

export type MyOrder = {
  id: string;
  purchaseDate: string;
  status: string;
  arrivalDate: string;
  deliverySummary: string;
  line: OrderLine;
  payment: {
    method: string;
    lastFour: string;
    transactionId: string;
    subtotal: string;
    shipping: string;
    tax: string;
    total: string;
  };
  shipping: {
    recipient: string;
    address: string;
    carrier: string;
    trackingNumber: string;
  };
};

export const myOrders: MyOrder[] = [
  {
    id: "pf-1007",
    purchaseDate: "January 7, 2025",
    status: "Delivered",
    arrivalDate: "January 9th",
    deliverySummary: "January 9th arrived",
    line: {
      productId: "order-product-1",
      name: "Hex Rubber Dumbbell with Chrome Handle Non-Slip Grip Professional Strength Training Black",
      image: "/assets/images/pages/MyOrders/producto1.jpg",
      quantity: 1,
      price: "$120.00 USD",
    },
    payment: {
      method: "Visa",
      lastFour: "4821",
      transactionId: "TXN-PF-1007",
      subtotal: "$120.00 USD",
      shipping: "$0.00 USD",
      tax: "$9.60 USD",
      total: "$129.60 USD",
    },
    shipping: {
      recipient: "Mateo Rivera",
      address: "123 PeakFit Ave, Bogota, Colombia",
      carrier: "PeakFit Express",
      trackingNumber: "PKF-1007-CO",
    },
  },
  {
    id: "pf-1008",
    purchaseDate: "January 7, 2025",
    status: "Delivered",
    arrivalDate: "January 9th",
    deliverySummary: "January 9th arrived",
    line: {
      productId: "order-product-2",
      name: "Hex Rubber Dumbbell with Chrome Handle Non-Slip Grip Professional Strength Training Black",
      image: "/assets/images/pages/MyOrders/producto2.jpg",
      quantity: 1,
      price: "$24.00 USD",
    },
    payment: {
      method: "Mastercard",
      lastFour: "1190",
      transactionId: "TXN-PF-1008",
      subtotal: "$24.00 USD",
      shipping: "$4.00 USD",
      tax: "$2.24 USD",
      total: "$30.24 USD",
    },
    shipping: {
      recipient: "Mateo Rivera",
      address: "123 PeakFit Ave, Bogota, Colombia",
      carrier: "PeakFit Express",
      trackingNumber: "PKF-1008-CO",
    },
  },
  {
    id: "pf-1009",
    purchaseDate: "January 7, 2025",
    status: "Delivered",
    arrivalDate: "January 9th",
    deliverySummary: "January 9th arrived",
    line: {
      productId: "order-product-3",
      name: "Hex Rubber Dumbbell with Chrome Handle Non-Slip Grip Professional Strength Training Black",
      image: "/assets/images/pages/MyOrders/producto3.jpg",
      quantity: 1,
      price: "$22.00 USD",
    },
    payment: {
      method: "Visa",
      lastFour: "4821",
      transactionId: "TXN-PF-1009",
      subtotal: "$22.00 USD",
      shipping: "$4.00 USD",
      tax: "$2.08 USD",
      total: "$28.08 USD",
    },
    shipping: {
      recipient: "Mateo Rivera",
      address: "123 PeakFit Ave, Bogota, Colombia",
      carrier: "PeakFit Express",
      trackingNumber: "PKF-1009-CO",
    },
  },
  {
    id: "pf-1010",
    purchaseDate: "January 7, 2025",
    status: "Delivered",
    arrivalDate: "January 9th",
    deliverySummary: "January 9th arrived",
    line: {
      productId: "order-product-4",
      name: "Hex Rubber Dumbbell with Chrome Handle Non-Slip Grip Professional Strength Training Black",
      image: "/assets/images/pages/MyOrders/producto4.jpg",
      quantity: 1,
      price: "$48.00 USD",
    },
    payment: {
      method: "Mastercard",
      lastFour: "1190",
      transactionId: "TXN-PF-1010",
      subtotal: "$48.00 USD",
      shipping: "$0.00 USD",
      tax: "$3.84 USD",
      total: "$51.84 USD",
    },
    shipping: {
      recipient: "Mateo Rivera",
      address: "123 PeakFit Ave, Bogota, Colombia",
      carrier: "PeakFit Express",
      trackingNumber: "PKF-1010-CO",
    },
  },
];
