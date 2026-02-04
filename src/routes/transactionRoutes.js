import express from "express";
import {
  createTransactionController,
  updateTransactionController,
  getAllTransactionsController,
} from "../controllers/transactionController.js";

const router = express.Router();

router.post("/", createTransactionController);
router.put("/:id", updateTransactionController);
router.get("/", getAllTransactionsController);

export default router;
