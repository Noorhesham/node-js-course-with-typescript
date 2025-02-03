import express from "express";
import { login, logout, refresh, register, getMe,protect } from "../controllers/authController";
const router = express.Router();

router.route("/login").post(login);
router.route("/signup").post(register);
router.route("/refresh").get(refresh);
router.route("/logout").post(logout);
router.use(protect);
router.route("/me").get(getMe);

export const authRouter = router;
