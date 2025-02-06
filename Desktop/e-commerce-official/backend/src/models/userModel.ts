import { Document, model, Schema } from "mongoose";
import bcrypt from "bcrypt";
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  passwordChangeAt: Date;
  role: "user" | "admin";
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  passwordConfirm: string;
  isAdmin: boolean;
  refreshToken: string;
  age: number;
  comparePassword(password: string): Promise<boolean>;
  changedPasswordAfter(JWTTimestamp: number): boolean;
  image: { secure_url: string; publicId: string };
  cart: { productId: Schema.Types.ObjectId; quantity: number }[];
}
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    createdAt: { type: Date, default: Date.now },
    passwordChangeAt: { type: Date },
    isAdmin: { type: Boolean, default: false },
    refreshToken: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    active: { type: Boolean, default: true },
    age: { type: Number },
    image: {
      secure_url: { type: String },
      publicId: { type: String },
    },
    cart: [{ productId: { type: Schema.Types.ObjectId, ref: "Product" }, quantity: Number }],
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export const User = model<IUser>("User", userSchema);
