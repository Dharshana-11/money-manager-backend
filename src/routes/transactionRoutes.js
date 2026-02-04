import express from "express";
import {
  createTransactionController,
  updateTransactionController,
  getAllTransactionsController,
  filterTransactionsController,
} from "../controllers/transactionController.js";

const router = express.Router();

router.post("/", createTransactionController);
router.put("/:id", updateTransactionController);
router.get("/", getAllTransactionsController);
router.get("/filter", filterTransactionsController);

export default router;
