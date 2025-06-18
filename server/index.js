import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";

dotenv.config();

// call database connection here
connectDB();

const app = express();

const PORT = process.env.PORT || 3000;


app.get("/home", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Hello I am comming from backend",
  });
});

app.listen(PORT, () => console.log(`Server listen at port ${PORT}`));
