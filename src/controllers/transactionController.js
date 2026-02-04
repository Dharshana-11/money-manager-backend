import {
  createTransaction,
  updateTransaction,
  getAllTransactions,
} from "../services/transactionService.js";

const createTransactionController = async (req, res) => {
  try {
    const transactionData = req.body;
    const transaction = await createTransaction(transactionData);

    return res
      .status(201)
      .json({ data: transaction, message: "Transaction created successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const updateTransactionController = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedTransaction = await updateTransaction(id, updatedData);

    return res.status(200).json({
      data: updatedTransaction,
      message: "Transaction updated successfully",
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getAllTransactionsController = async (req, res) => {
  try {
    const transactions = await getAllTransactions();
    return res.status(200).json({ data: transactions });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export {
  createTransactionController,
  updateTransactionController,
  getAllTransactionsController,
};
