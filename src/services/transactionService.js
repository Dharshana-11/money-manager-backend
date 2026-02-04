import Transaction from "../models/Transaction.js";
import Account from "../models/Account.js";
import {
  CATEGORIES,
  TRANSACTION_TYPES,
  DIVISIONS,
} from "../utils/constants.js";

const createTransaction = async (transactionData) => {
  // Destructure data
  const {
    type,
    amount,
    category,
    division,
    description,
    accountId,
    toAccountId,
  } = transactionData;

  // Validate Data
  if (amount <= 0) {
    throw new Error("Amount must be greater than 0");
  }

  if (!TRANSACTION_TYPES.includes(type)) {
    throw new Error(
      "Invalid transaction type. Must only be income, expense or transfer",
    );
  }

  if (!DIVISIONS.includes(division)) {
    throw new Error(
      "Invalid transaction division. Must only be Office or Personal",
    );
  }

  if (!CATEGORIES.includes(category)) {
    throw new Error("Invalid category");
  }

  const account = await Account.findById(accountId);

  if (!account) {
    throw new Error("Invalid source account");
  }

  // Update balances according to transaction type
  if (type === "income") {
    account.balance += amount;
  } else if (type === "expense") {
    if (account.balance < amount) {
      throw new Error("Insufficient balance");
    }
    account.balance -= amount;
  } else if (type === "transfer") {
    if (!toAccountId) {
      throw new Error("Destination account is required for transfer");
    }

    if (accountId === toAccountId) {
      throw new Error("Cannot transfer to same account");
    }

    if (account.balance < amount) {
      throw new Error("Insufficient balance");
    }
    const toAccount = await Account.findById(toAccountId);

    if (!toAccount) {
      throw new Error("Invalid destination account");
    }

    account.balance -= amount;
    toAccount.balance += amount;
    await toAccount.save();
  }

  await account.save();

  // Create transaction
  const newTransaction = {
    type,
    amount,
    category,
    division,
    description,
    account: accountId,
  };

  if (type === "transfer") {
    newTransaction.toAccount = toAccountId;
  }

  const transaction = await Transaction.create(newTransaction);

  return transaction;
};

export { createTransaction };
