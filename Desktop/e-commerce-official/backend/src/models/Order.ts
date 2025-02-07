import { Schema, model, Document, Types } from "mongoose";

interface IOrderItem {
  product: Types.ObjectId;
  variant: {
    options: { name: string; value: string }[];
    images: { secure_url: string; publicId: string }[];
    price: number;
  };
  quantity: number;
  subtotal: number; // price * quantity
  address: string;
  phone: string;
}

interface IOrder extends Document {
  customer: Types.ObjectId;
  seller: Types.ObjectId;
  items: IOrderItem[];
  totalAmount: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentStatus: "pending" | "paid" | "failed";
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    customer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        variant: {
          options: [{ name: String, value: String }],
          images: [
            {
              secure_url: { type: String, required: true },
              publicId: { type: String, required: true },
            },
          ],
          price: { type: Number, required: true },
        },
        quantity: { type: Number, required: true, min: 1 },
        subtotal: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

orderSchema.pre(/^find/, function (next) {
  //@ts-ignore
  this.populate("customer").populate("seller").populate("items.product");
  next();
});

export const Order = model<IOrder>("Order", orderSchema);
