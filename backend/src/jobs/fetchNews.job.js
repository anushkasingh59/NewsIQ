import cron from "node-cron";
import { fetchNews } from "../services/newsFetcher.js";

cron.schedule("*/30 * * * *", async () => {
  console.log("⏰ Running news fetch job...");
  await fetchNews();
});
3