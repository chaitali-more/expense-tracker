import express from "express";

import { loginUser, signupUser, forgotPassword, resetPassword } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;