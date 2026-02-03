import express from "express";
import {
  createAccountController,
  getAllAccountsController,
} from "../controllers/accountController.js";

const router = express.Router();

router.post("/", createAccountController); // POST /accounts will create a new account
router.get("/", getAllAccountsController); // GET /accounts will get all accounts

export default router;
