import cron from "node-cron";
import { fetchNews } from "../services/newsFetcher.js";

cron.schedule("*/5 * * * *", async () => {//change to 30
  console.log("⏰ Running news fetch job...");
  await fetchNews();
});
3