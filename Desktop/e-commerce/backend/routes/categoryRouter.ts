import express from "express";
import {
  createCategory,
  getCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController";

const router = express.Router();

router.route("/").post(createCategory).get(getAllCategories);

router.route("/:id").get(getCategory).patch(updateCategory).delete(deleteCategory);

export default router;
