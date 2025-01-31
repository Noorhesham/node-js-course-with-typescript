import express from "express";
import {
  createVariant,
  getVariant,
  getAllVariants,
  updateVariant,
  deleteVariant,
} from "../controllers/variantsController";

const router = express.Router();

router.route("/").post(createVariant).get(getAllVariants);

router.route("/:id").get(getVariant).patch(updateVariant).delete(deleteVariant);

export default router;
