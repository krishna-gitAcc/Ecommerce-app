import express from "express";
const router = express.Router();
import { signin, signup, test } from "../Controller/authController.js";

router.get("/test", test);
router.post("/signup", signup);
router.post("/login", signin);

export default router;
