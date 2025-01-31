import { Schema, model, Document } from "mongoose";

export interface IVariantType extends Document {
  name: string;
  slug: string;
  type: "color" | "size" | "gender" | "material";
  values: string[];
  isActive: boolean;
}

const variantTypeSchema = new Schema<IVariantType>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["color", "size", "gender", "material"],
      required: true,
    },
    values: [
      {
        type: String,
        trim: true,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Variant = model<IVariantType>("VariantType", variantTypeSchema);
