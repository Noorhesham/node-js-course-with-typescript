import { ZodTypeAny } from "zod";
export type IFormField = {
  name: string;
  label?: string;
  description?: string;
  component: "input" | "select" | "checkbox" | "textarea" | "switch" | "photo" | "array";
  type?: string;
  options?: Array<{ value: string; label: string }>;
  validation?: ZodTypeAny;
  placeholder?: string;
  className?: string;
  props?: Record<string, any>;
  password?: boolean;
};
export interface IVariantOption {
  name: string;
  values: string[];
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
interface IOrderItem {
  product: string;
  variant: {
    optionValues: { [key: string]: string };
    sku: string;
  };
  quantity: number;
  price: number;
}

export interface IOrder {
  user: string;
  items: IOrderItem[];
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  shippingAddress: string;
  billingAddress: string;
  paymentMethod: string;
  paymentStatus: "pending" | "paid" | "failed";
  subtotal: number;
  tax: number;
  shippingCost: number;
  total: number;
  trackingNumber?: string;
  notes?: string;
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
