export interface ProductSectionProps {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  description: string;
  images: { src: string; alt: string }[];
  sizes: string[];
  weights: string[];
  reviews: {
    name: string;
    avatar: string;
    review: string;
    images?: string[];
    rating?: number;
  }[];
}
