import { Document, model, Schema } from "mongoose";
interface IVariant extends Document {
  name: string;
  options: string[];
}
const variantTypeSchema = new Schema<IVariant>(
  {
    name: { type: String, required: true, unique: true },
    options: [{ type: String, required: true }],
  },
  { timestamps: true }
);

export const Variant = model<IVariant>("Variant", variantTypeSchema);
