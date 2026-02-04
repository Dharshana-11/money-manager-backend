import mongoose from "mongoose";
import { DIVISIONS, TRANSACTION_TYPES } from "../utils/constants.js";

const { Schema } = mongoose;

const transactionSchema = new Schema(
  {
    type: {
      type: String,
      enum: TRANSACTION_TYPES,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 1, //must be greater than 0
    },
    category: {
      type: String,
      required: true,
    },
    division: {
      type: String,
      enum: DIVISIONS,
      required: true,
    },
    description: {
      type: String,
    },
    account: {
      type: Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    toAccount: {
      type: Schema.Types.ObjectId,
      ref: "Account",
    },
  },
  { timestamps: true },
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
