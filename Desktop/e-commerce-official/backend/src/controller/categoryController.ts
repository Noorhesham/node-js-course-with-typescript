import { Category } from "../models";
import { createEntitiy, deleteEntitiy, getAllEntitiy, getEntitiy, updateEntitiy } from "./factoryController";
export const getAllCategory = getAllEntitiy(Category);
export const getCategory = getEntitiy(Category);
export const createCategory = createEntitiy(Category);
export const updateCategory = updateEntitiy(Category);
export const deleteCategory = deleteEntitiy(Category);
