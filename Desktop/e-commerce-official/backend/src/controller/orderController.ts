import { Order } from "../models";
import { createEntitiy, deleteEntitiy, getAllEntitiy, getEntitiy, updateEntitiy } from "./factoryController";

export const createOrder = createEntitiy(Order);

export const getOrder = getEntitiy(Order);

export const getAllOrders = getAllEntitiy(Order);

export const updateOrder = updateEntitiy(Order);

export const deleteOrder = deleteEntitiy(Order);
