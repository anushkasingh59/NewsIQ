
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import app from "./app.js";
import { resetArticles } from "./utils/resetProcessed.js";

import "./jobs/fetchNews.job.js"; // ✅ Cron job starts here
import "./jobs/verifyNews.job.js";
import "./jobs/aiSummary.job.js";



const PORT = process.env.PORT || 5000;

// ✅ Start server ONLY after DB connects
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB connected");
    await resetArticles();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
