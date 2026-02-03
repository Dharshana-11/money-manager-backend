import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import accountRoutes from "./routes/accountRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Backend working successfully!");
});

app.use("/api/accounts", accountRoutes);

export default app;
