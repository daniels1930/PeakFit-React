export type ProductReview = {
  id: string;
  author: string;
  date: string;
  rating: number;
  title: string;
  body: string;
};

const reviewNames = ["Sarah M.", "Daniel R.", "Emily C.", "Mateo S.", "Laura P.", "Chris A."];

export function getInitialReviews(productId: string): ProductReview[] {
  const seed = productId.split("").reduce((total, letter) => total + letter.charCodeAt(0), 0);
  const first = seed % reviewNames.length;
  const second = (first + 2) % reviewNames.length;
  const third = (first + 4) % reviewNames.length;

  return [
    {
      id: `${productId}-review-1`,
      author: reviewNames[first],
      date: "Feb 15, 2026",
      rating: 5,
      title: "Best gym purchase this year!",
      body: "I am impressed with the fit and finish. It feels comfortable, looks clean, and works well for regular training days.",
    },
    {
      id: `${productId}-review-2`,
      author: reviewNames[second],
      date: "Mar 02, 2026",
      rating: 4,
      title: "Great quality and easy to use",
      body: "The product feels reliable and matches the PeakFit style. I would recommend it for anyone building a simple training setup.",
    },
    {
      id: `${productId}-review-3`,
      author: reviewNames[third],
      date: "Apr 18, 2026",
      rating: 5,
      title: "Looks even better in person",
      body: "The details are clean and the product fits naturally into my workout routine. It arrived exactly as expected.",
    },
  ];
}
