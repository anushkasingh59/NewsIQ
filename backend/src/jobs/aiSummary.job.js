import cron from "node-cron";
import Event from "../models/Event.js";
import { generateSummary } from "../services/aiService.js";

cron.schedule("*/2 * * * *", async () => {
  console.log("🤖 Running Llama AI summary job...");

  // Pick only events without summary
  const pending = await Event.find({
  $or: [
    { summary: "" },
    { summary: null },
    { summary: { $exists: false } }
  ]
}).limit(3);


  for (let event of pending) {
    console.log(" .........Summarizing:", event.headline);
    const output = await generateSummary(event.headline);

    const lines = output.split("\n");

    event.summary = lines[0]?.replace("Summary:", "").trim() || "";
    event.whyItMatters =lines[1]?.replace("Why it matters:", "").trim() || "";

    await event.save();
     console.log("........ Saved summary to DB");


  }
});
