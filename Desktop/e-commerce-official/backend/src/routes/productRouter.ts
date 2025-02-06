import express from "express";
import {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  addNewVariant,
  updateVariant,
  deleteVariant,
} from "../controller/productController";
const router = express.Router();
router.get("/", getAllProducts);
router.route("/").get(getAllProducts).post(createProduct);

router.route("/:id").get(getProduct).patch(updateProduct).delete(deleteProduct);

// Variant routes
router.route("/:id/variants").post(addNewVariant);

router.route("/:id/variants/:variantId").patch(updateVariant).delete(deleteVariant);
export const productRouter = router;
