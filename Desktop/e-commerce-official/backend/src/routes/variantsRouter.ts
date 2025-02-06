import express from "express";
import {
  getAllVariants,
  getVariant,
  createVariant,
  updateVariant,
  deleteVariant,
} from "../controller/variantsController";
const router = express.Router();
router.route("/").get(getAllVariants).post(createVariant);
router.route("/:id").get(getVariant).patch(updateVariant).delete(deleteVariant);
export const VariantRouter = router;
