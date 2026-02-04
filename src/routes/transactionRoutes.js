import express from "express";
import {
  createTransactionController,
  updateTransactionController,
  getAllTransactionsController,
  filterTransactionsController,
  getCategorySummaryController,
} from "../controllers/transactionController.js";

const router = express.Router();

router.post("/", createTransactionController);
router.put("/:id", updateTransactionController);
router.get("/", getAllTransactionsController);
router.get("/filter", filterTransactionsController);
router.get("/summary/category", getCategorySummaryController);

export default router;
