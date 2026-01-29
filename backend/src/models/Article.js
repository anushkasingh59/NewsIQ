import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    source: String,
    url: { type: String, unique: true },
    publishedAt: Date,
    processed: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Article", articleSchema);
