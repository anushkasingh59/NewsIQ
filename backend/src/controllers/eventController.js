import Event from "../models/Event.js";

// GET /api/events
export const getAllEvents = async (req, res) => {
  const events = await Event.find().sort({ createdAt: -1 }).limit(20);
  res.json(events);
};

// GET /api/events/top
export const getTopEvents = async (req, res) => {
  const events = await Event.find()
    .sort({ trustScore: -1, createdAt: -1 })
    .limit(10);

  res.json(events);
};
