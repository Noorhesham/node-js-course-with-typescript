// models/Product.ts
import { Schema, model, Document, Types } from "mongoose";

interface IVariantOption {
  name: string;
  value: string;
}

interface IVariant {
  options: IVariantOption[];
  sku: string;
  price: number;
  compareAtPrice?: number;
  inventory: number;
  images: string[];
  isActive: boolean;
}

interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  category: Types.ObjectId;
  gender: "male" | "female" | "kids";
  variants: IVariant[];
  basePrice: number;
  brand?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  images: { secure_url: string; publicId: string }[];
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "kids"],
      required: true,
    },
    variants: [
      {
        options: [
          {
            name: { type: String, required: true },
            value: { type: String, required: true },
          },
        ],
        sku: { type: String, required: true, unique: true },
        price: { type: Number, required: true, min: 0 },
        compareAtPrice: { type: Number, min: 0 },
        inventory: { type: Number, required: true, min: 0 },
        images: [
          {
            secure_url: { type: String, required: true },
            publicId: { type: String, required: true },
          },
        ],
        isActive: { type: Boolean, default: true },
      },
    ],
    basePrice: { type: Number, required: true, min: 0 },
    brand: String,
    isActive: { type: Boolean, default: true },
    images: [
      {
        secure_url: { type: String, required: true },
        publicId: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Product = model<IProduct>("Product", productSchema);
