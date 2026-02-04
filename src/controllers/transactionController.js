import { createTransaction } from "../services/transactionService.js";

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

export { createTransactionController };
