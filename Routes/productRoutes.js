import express from "express";
import { getProducts, postProduct, text } from "../Controller/productController.js";
import { verifyToken } from "../middleware/tokenVerification.js";

const router = express.Router();

router.get("/test", text);
router.post("/post-product",verifyToken, postProduct);
router.get("/get-product/:id", getProducts)
export default router;
