import express from "express";
import {
  createTransactionController,
  updateTransactionController,
  getAllTransactionsController,
  filterTransactionsController,
  getCategorySummaryController,
  getDashboardStatsController,
} from "../controllers/transactionController.js";

const router = express.Router();

router.post("/", createTransactionController);
router.put("/:id", updateTransactionController);
router.get("/", getAllTransactionsController);
router.get("/filter", filterTransactionsController);
router.get("/summary/category", getCategorySummaryController);
router.get("/dashboard/:range", getDashboardStatsController);

export default router;
