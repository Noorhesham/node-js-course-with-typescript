import express from "express";
import variantRoutes from "./variantRouter";
import categoryRoutes from "./categoryRouter";
import productRouter from "./productRouter";

const router = express.Router();

router.use("/variants", variantRoutes);
router.use("/categories", categoryRoutes);
router.use("/products", productRouter);

export default router;
