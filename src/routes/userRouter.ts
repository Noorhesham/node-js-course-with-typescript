import express from "express";
import { checkIfAdmin, protect } from "../controller/authController";
import { createUser, getUser, getAllUsers, updateUser, deleteUser } from "../controller/userController";
const router = express.Router();
router.route("/").post(protect,checkIfAdmin, createUser).get(getAllUsers);
router.route("/:id").patch(updateUser).delete(deleteUser).get(getUser);
export const userRouter = router;
