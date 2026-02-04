import Account from "../models/Account.js";
import { ACCOUNT_TYPES } from "../utils/constants.js";

const createAccount = async (accountData) => {
  // 1. destructure values
  const { name, type, description, balance = 0 } = accountData;

  // 2. validate name
  if (!name) {
    throw new Error("Account name is required!");
  }
  // 3. validate type using ACCOUNT_TYPES
  if (!ACCOUNT_TYPES.includes(type)) {
    throw new Error("Account type invalid!");
  }

  if (balance < 0) {
    throw new Error("Account balance cannot be negative");
  }

  // 4. create account using Account model
  const account = await Account.create({
    name,
    type,
    description,
    balance,
  });

  // 5. return created account
  return account;
};

const getAllAccounts = async () => {
  const accounts = await Account.find({}).sort({ createdAt: 1 });
  return accounts;
};

export { createAccount, getAllAccounts };
