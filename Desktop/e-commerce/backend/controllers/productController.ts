import { Request, Response, NextFunction } from "express";
import { Product } from "../models/Product";
import { createEntitiy, deleteEntitiy, getAllEntitiy, getEntitiy, updateEntitiy } from "./factoryController";
import AppError from "../utils/AppError";
import { catchError } from "../utils/catchError";

export const createProduct = createEntitiy(Product);

export const getProduct = getEntitiy(Product);

export const getAllProducts = getAllEntitiy(Product);

export const updateProduct = updateEntitiy(Product);

export const deleteProduct = deleteEntitiy(Product);

export const addVariant = catchError(async (req: Request, res: Response, next: NextFunction) => {
  const product = await Product.findByIdAndUpdate(
    req.params.productId,
    { $push: { variants: req.body } },
    { new: true, runValidators: true }
  ).lean();

  if (!product) return next(new AppError("No product found with this id", 404));
  res.status(201).json({ data: { product } });
});
export const updateVariant = catchError(async (req: Request, res: Response, next: NextFunction) => {
  const updateOps = Object.entries(req.body).reduce((acc, [key, value]) => {
    acc[`variants.$[variant].${key}`] = value;
    return acc;
  }, {} as Record<string, any>);

  const product = await Product.findByIdAndUpdate(
    req.params.productId,
    { $set: updateOps },
    {
      new: true,
      runValidators: true,
      arrayFilters: [{ "variant._id": req.params.variantId }],
    }
  ).lean();

  if (!product) return next(new AppError("No product found with this id", 404));
  res.status(200).json({ data: { product } });
});
export const deleteVariant = catchError(async (req: Request, res: Response, next: NextFunction) => {
  const product = await Product.findByIdAndUpdate(
    req.params.productId,
    { $pull: { variants: { _id: req.params.variantId } } },
    { new: true }
  ).lean();

  if (!product) return next(new AppError("No product found with this id", 404));
  res.status(204).json({ message: "succsessfully deleted", data: { product } });
});
