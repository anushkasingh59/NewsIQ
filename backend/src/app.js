import express from "express";
import cors from "cors";
import eventRoutes from "./routes/eventRoutes.js";
const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("NewsIQ API is running 🚀");
});

app.use("/api/events", eventRoutes);
export default app;
