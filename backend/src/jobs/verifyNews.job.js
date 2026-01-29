import cron from "node-cron";
import { verifyAndCreateEvents } from "../services/verificationService.js";

cron.schedule("*/1 * * * *", async () => {
  console.log("⏰ Running verification job...");
  await verifyAndCreateEvents();
});
