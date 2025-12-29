import express from "express";
import dotenv from "dotenv";
dotenv.config();
import pasteRouter from "./routes/pasteRoute.js";
import connectDB from "./config/db.js";
import cors from "cors";
import viewRouter from "./routes/viewRoute.js";
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors())
app.use(express.json());

// Connect to database
connectDB(); 

// Routes   
app.use("/api", pasteRouter);
app.use("/", viewRouter);
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
