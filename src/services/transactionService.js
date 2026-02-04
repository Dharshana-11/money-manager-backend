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

const updateTransaction = async (transactionId, updatedData) => {
  //Fetch transaction
  const transaction = await Transaction.findById(transactionId);

  if (!transaction) {
    throw new Error("Transaction not found");
  }

  // 12 hour rule
  const now = new Date();
  const diffInMilliSeconds = now - transaction.createdAt;
  const diffInHours = diffInMilliSeconds / (1000 * 60 * 60); //Convert ms to hours

  if (diffInHours > 12) {
    throw new Error("Transaction can only be edited within 12 hours");
  }

  // Fetch source account
  const account = await Account.findById(transaction.account);
  if (!account) {
    throw new Error("Source account not found");
  }

  //Fetch destination account if applicable
  let toAccount;
  if (transaction.type === "transfer") {
    toAccount = await Account.findById(transaction.toAccount);
    if (!toAccount) {
      throw new Error("Destination account not found");
    }
  }

  // Revert old transactions
  if (transaction.type === "income") {
    account.balance -= transaction.amount;
  } else if (transaction.type === "expense") {
    account.balance += transaction.amount;
  } else if (transaction.type === "transfer") {
    account.balance += transaction.amount;
    toAccount.balance -= transaction.amount;
  }

  // Changes for new amount
  const newAmount =
    updatedData.amount != undefined ? updatedData.amount : transaction.amount;

  if (newAmount <= 0) {
    throw new Error("Amount must be greater than 0");
  }

  // Apply changes for transaction amount
  if (transaction.type === "income") {
    account.balance += newAmount;
  } else if (transaction.type === "expense") {
    if (account.balance < newAmount) {
      throw new Error("Insufficient balance in edit");
    }
    account.balance -= newAmount;
  } else if (transaction.type === "transfer") {
    if (account.balance < newAmount) {
      throw new Error("Insufficent balance after edit");
    }
    account.balance -= newAmount;
    toAccount.balance += newAmount;

    await toAccount.save();
  }

  await account.save();

  // Update transaction fields
  transaction.amount = newAmount;
  if (updatedData.category) transaction.category = updatedData.category;
  if (updatedData.division) transaction.division = updatedData.division;
  if (updatedData.description)
    transaction.description = updatedData.description;

  await transaction.save();

  return transaction;
};

const getAllTransactions = async () => {
  const transactions = await Transaction.find({})
    .populate("account", "name type") // Update accountId to actual acc. obj.
    .populate("toAccount", "name type")
    .sort({ createdAt: -1 });

  return transactions;
};

const filterTransactions = async (filters) => {
  const { startDate, endDate, category, division, type } = filters;

  const query = {};

  if (category) query.category = category;
  if (division) query.division = division;
  if (type) query.type = type;

  if (startDate && endDate) {
    query.createdAt = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  const transactions = await Transaction.find(query).sort({ createdAt: -1 });

  return transactions;
};

const getCategorySummary = async () => {
  const summary = await Transaction.aggregate([
    {
      $group: {
        _id: "$category",
        totalAmount: { $sum: "$amount" },
      },
    },
    { $sort: { totalAmount: -1 } },
  ]);

  return summary;
};

const getDashboardStats = async (range) => {
  let startDate = new Date();

  if (range === "weekly") {
    startDate.setDate(startDate.getDate() - 7);
  } else if (range === "monthly") {
    startDate.setMonth(startDate.getMonth() - 1);
  } else if (range === "yearly") {
    startDate.setFullYear(startDate.getFullYear() - 1);
  }

  const stats = await Transaction.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate },
      },
    },
    {
      $group: {
        _id: "$type",
        totalAmount: { $sum: "$amount" },
      },
    },
  ]);

  return stats;
};

export {
  createTransaction,
  updateTransaction,
  getAllTransactions,
  filterTransactions,
  getCategorySummary,
  getDashboardStats,
};
