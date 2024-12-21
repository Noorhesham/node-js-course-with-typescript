import express from "express";
import { createProduct, deleteProduct, getAllProducts, getSingleProdcut } from "../controllers/productsController.js";
//  base:/products
const router = express.Router();

router.route("/:id").get(getSingleProdcut).delete(deleteProduct);
router.route("/").get(getAllProducts).post(createProduct);

export const productRoute = router;
