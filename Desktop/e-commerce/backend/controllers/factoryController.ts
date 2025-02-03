import { Model, Document } from "mongoose";
import AppError from "../utils/AppError";
import { catchError } from "../utils/catchError";
import { Request, Response, NextFunction } from "express";
import APIFeatures from "../utils/APIFeatures";

export const createEntitiy = <T extends Document>(Model: Model<T>) =>
  catchError(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.create(req.body);
    res.status(200).json({ data: { doc } });
  });

export const getEntitiy = <T extends Document>(Model: Model<T>) =>
  catchError(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const doc = await Model.findById(id);
    res.status(200).json({ data: { doc } });
  });

export const getAllEntitiy = <T extends Document>(Model: Model<T>) =>
  catchError(async (req: Request, res: Response, next: NextFunction) => {
    // await User.find()
    const features = new APIFeatures(Model.find(), req.query).filter();
    const docs = await features.paginate().sort().limitFields().query; // Use the same query for docs
    const count = await Model.countDocuments(features.query.getQuery()); // Get count with filters applied

    const limit = req.query.limit || ("10" as String);
    const maxPages = Math.ceil(count / +limit);
    res.status(200).json({ data: { docs }, totalPages: maxPages });
  });

export const updateEntitiy = <T extends Document>(Model: Model<T>) =>
  catchError(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const doc = await Model.findByIdAndUpdate(id, req.body, { new: true });
    if (!doc) return next(new AppError("No document found with this id", 404));
    res.status(200).json({ data: { doc } });
  });

export const deleteEntitiy = <T extends Document>(Model: Model<T>) =>
  catchError(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const doc = await Model.findByIdAndDelete(id);
    if (!doc) return next(new AppError("No document found with this id", 404));

    res.status(200).json({ message: "succsessfully deleted" });
  });
