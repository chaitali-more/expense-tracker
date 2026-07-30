import express from "express";

import {
  addTransaction,
  getTransaction,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactionController.js";

const router = express.Router();

router.post("/", addTransaction);

router.get("/", getTransaction);

router.put("/:id", updateTransaction);

router.delete("/:id", deleteTransaction);

router.get("/test", (req, res) => {
  res.send("Transaction Route Working");
});

console.log("Transaction Routes Loaded");
export default router;