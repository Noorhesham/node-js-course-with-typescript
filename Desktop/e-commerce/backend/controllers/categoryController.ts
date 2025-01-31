import { NextFunction, Request, Response } from "express";
import { Category } from "../models";
import { catchError } from "../utils/catchError";
import { createEntitiy, deleteEntitiy, getAllEntitiy, getEntitiy, updateEntitiy } from "./factoryController";

export const createCategory = createEntitiy(Category);
export const getCategory = getEntitiy(Category);
export const getAllCategories = getAllEntitiy(Category);
export const updateCategory = updateEntitiy(Category);
export const deleteCategory = deleteEntitiy(Category);
