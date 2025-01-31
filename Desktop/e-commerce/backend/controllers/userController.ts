import { User } from "../models";
import { createEntitiy, deleteEntitiy, getAllEntitiy, getEntitiy, updateEntitiy } from "./factoryController";
export const getAllUsers = getAllEntitiy(User);
export const getUser = getEntitiy(User);
export const createUser = createEntitiy(User);
export const updateUser = updateEntitiy(User);
export const deleteUser = deleteEntitiy(User);
