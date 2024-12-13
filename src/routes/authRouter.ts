import express from "express";
import { login, logout, refresh, register } from "../controller/authController";
const router = express.Router();

router.route("/login").post(login);
router.route("/signup").post(register);
router.route("/refresh").get(refresh);
router.route("/logout").post(logout);

export const authRouter = router;
