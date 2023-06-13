import express from "express";

const router = express.Router();

import authRoutes from "./authRoutes.js";
import productRoutes from "./productRoutes.js";

router.use("/auth", authRoutes);
router.use("/product", productRoutes);

export default router;