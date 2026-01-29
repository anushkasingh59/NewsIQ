import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    headline: String,
    summary: String,
    whyItMatters: String,
    category: String,
    region: String,
    trustScore: Number,
    sources: [String]
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
