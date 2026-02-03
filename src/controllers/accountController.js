import { createAccount, getAllAccounts } from "../services/accountService.js";

const createAccountController = async (req, res) => {
  try {
    const accountData = req.body;
    const account = await createAccount(accountData);

    return res
      .status(201)
      .json({ data: account, message: "Account created successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getAllAccountsController = async (req, res) => {
  try {
    const accounts = await getAllAccounts();
    return res.status(200).json({ data: accounts });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export { createAccountController, getAllAccountsController };
