import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  addTransaction,
  getTransaction,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactionController.js";

const router = express.Router();

router.post("/",protect, addTransaction);

router.get("/", protect, getTransaction);

router.put("/:id",protect, updateTransaction);

router.delete("/:id", protect, deleteTransaction);

router.get("/test", (req, res) => {
  res.send("Transaction Route Working");
});

console.log("Transaction Routes Loaded");
export default router;