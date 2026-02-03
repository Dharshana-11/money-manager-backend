import mongoose from "mongoose";
import { ACCOUNT_TYPES } from "../utils/constants.js";

const { Schema } = mongoose;

const accountSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    type: {
      type: String,
      enum: ACCOUNT_TYPES,
      required: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true },
);

const Account = mongoose.model("Account", accountSchema);

export default Account;
