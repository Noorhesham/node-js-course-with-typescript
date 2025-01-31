export interface IVariantOption {
  name: string;
  value: string;
}

export interface IVariant {
  options: IVariantOption[];
  sku: string;
  price: number;
  compareAtPrice?: number;
  inventory: number;
  images: string[];
  isActive: boolean;
}

export interface IProduct {
  name: string;
  slug: string;
  _id: string;
  description: string;
  category: string;
  gender: "male" | "female" | "kids";
  variants: IVariant[];
  basePrice: number;
  brand?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  images: { secure_url: string; publicId: string }[];
}
