import express from "express";
import { checkIfAdmin, protect } from "../controller/authController";
import {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  addToCart,
  removeFromCart,
} from "../controller/userController";

const router = express.Router();

// Apply protect middleware to all routes
router.use(protect);

// ✅ Move these cart routes to the top
router.post("/cart/addToCart", addToCart);
router.post("/cart/removeFromCart", removeFromCart);

// Define user routes
router.route("/").post(checkIfAdmin, createUser).get(getAllUsers);
router.route("/:id").patch(updateUser).delete(deleteUser).get(getUser);

export const userRouter = router;
