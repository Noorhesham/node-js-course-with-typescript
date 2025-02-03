import { NextFunction, Request, Response } from "express";
import { catchError } from "../utils/catchError";
import mongoose from "mongoose";

export const addToCart = catchError(async (req: Request | any, res: Response, next: NextFunction) => {
  const user = req.user;
  const { productId } = req.body;
  console.log(user, productId);
  const cartItem = user.cart.find((p: any) => p?.productId?.toString() === productId);

  if (cartItem) {
    user.cart = user.cart.map((c: any) =>
      c.productId.toString() === productId
        ? { productId: new mongoose.Types.ObjectId(productId), quantity: c.quantity + 1 }
        : c
    );
  } else {
    user.cart.push({ productId: new mongoose.Types.ObjectId(productId), quantity: 1 });
  }

  await user.save();

  res.status(200).json({ data: { user: user }, status: "success", message: "Product added to cart" });
});
//@ts-ignore
export const removeFromCart = catchError(async (req: Request | any, res: Response, next: NextFunction) => {
  const user = req.user;
  const { productId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ status: "error", message: "Invalid product ID" });
  }

  const cartItem = user.cart.find(
    (c: any) => c.productId.toString() === new mongoose.Types.ObjectId(productId).toString()
  );

  if (!cartItem) {
    return res.status(404).json({ status: "error", message: "Product not found in cart" });
  }

  if (cartItem.quantity > 1) {
    user.cart = user.cart.map((c: any) =>
      c.productId.toString() === new mongoose.Types.ObjectId(productId).toString()
        ? { productId: c.productId, quantity: c.quantity - 1 }
        : c
    );
  } else {
    user.cart = user.cart.filter(
      (c: any) => c.productId.toString() !== new mongoose.Types.ObjectId(productId).toString()
    );
  }

  await user.save();

  res.status(200).json({ data: { user }, status: "success", message: "Product removed from cart" });
});
