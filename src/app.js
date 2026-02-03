import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Backend working successfully!");
});

export default app;
