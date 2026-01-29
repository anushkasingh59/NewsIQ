import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";

import "./jobs/fetchNews.job.js"; // ✅ Cron job starts here
import "./jobs/verifyNews.job.js";
dotenv.config();

const PORT = process.env.PORT || 5000;

// ✅ Start server ONLY after DB connects
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
