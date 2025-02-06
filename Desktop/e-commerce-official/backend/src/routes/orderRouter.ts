import express from "express";
import { getAllOrders, getOrder, createOrder, updateOrder, deleteOrder } from "../controller/orderController";
const router = express.Router();
router.route("/").get(getAllOrders).post(createOrder);
router.route("/:id").get(getOrder).patch(updateOrder).delete(deleteOrder);
export const OrderRouter = router;
