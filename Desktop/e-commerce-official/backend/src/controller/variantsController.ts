import { Variant } from "../models/VariantModel";
import { createEntitiy, deleteEntitiy, getAllEntitiy, getEntitiy, updateEntitiy } from "./factoryController";

export const createVariant = createEntitiy(Variant);

export const getVariant = getEntitiy(Variant);

export const getAllVariants = getAllEntitiy(Variant);

export const updateVariant = updateEntitiy(Variant);

export const deleteVariant = deleteEntitiy(Variant);
