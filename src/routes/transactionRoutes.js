import express from "express";
import {
  createTransactionController,
  updateTransactionController,
} from "../controllers/transactionController.js";

const router = express.Router();

router.post("/", createTransactionController);
router.put("/:id", updateTransactionController);

export default router;
