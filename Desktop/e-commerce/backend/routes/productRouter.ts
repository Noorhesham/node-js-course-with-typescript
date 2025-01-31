// routes/product.routes.ts
import express from "express";
import {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  addVariant,
  updateVariant,
  deleteVariant,
} from "../controllers/productController";

const router = express.Router();

// Product routes
router.route("/").get(getAllProducts).post(createProduct);

router.route("/:id").get(getProduct).patch(updateProduct).delete(deleteProduct);

// Variant routes
router.route("/:productId/variants").post(addVariant);

router.route("/:productId/variants/:variantId").patch(updateVariant).delete(deleteVariant);

export default router;
