// 1️⃣ Create account

// Responsibilities:
// Accept input (name, type, description, optional balance)
// Validate:
// name exists
// type is valid (from constants)
// Create account with default balance = 0 (or given)
// Return created account

// ❌ No HTTP handling
// ❌ No req / res

import Account from "../models/Account.js";
import { ACCOUNT_TYPES } from "../utils/constants.js";

const createAccount = async (accountData) => {
  const {
    accountName,
    accountType,
    accountDescription,
    accountBalance = 0,
  } = accountData;

  // 2. validate name
  if (!accountName) {
    throw new Error("Account name is required!");
  }
  // 3. validate type using ACCOUNT_TYPES
  if (!ACCOUNT_TYPES.includes(accountType)) {
    throw new Error("Account type invalid!");
  }

  if (accountBalance < 0) {
    throw new Error("Account balance cannot be negative");
  }

  // 4. create account using Account model
  const account = await Account.create({
    name: accountName,
    type: accountType,
    description: accountDescription,
    balance: accountBalance,
  });

  // 5. return created account
  return account;
};

export { createAccount };
