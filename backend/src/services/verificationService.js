import Article from "../models/Article.js";
import Event from "../models/Event.js";

export const verifyAndCreateEvents = async () => {
  console.log("🔍 Running verification engine...");

  // Fetch unprocessed articles
  const articles = await Article.find({ processed: false });

  if (articles.length === 0) {
    console.log("✅ No new articles to verify");
    return;
  }

  // Group articles by similar headline prefix
  const groupedEvents = {};

  for (let article of articles) {
    const key = article.title.slice(0, 50); // simple grouping

    if (!groupedEvents[key]) groupedEvents[key] = [];
    groupedEvents[key].push(article);
  }

  // Process each group into an Event
  for (let key in groupedEvents) {
    const group = groupedEvents[key];

    // Unique sources
    const sources = [...new Set(group.map((a) => a.source))];

    // Trust scoring rule
    let trustScore = 40;
    if (sources.length === 2) trustScore = 70;
    if (sources.length >= 3) trustScore = 90;

    await Event.create({
      headline: group[0].title,
      trustScore,
      sources,
      category: "General",
      region: "World"
    });

    // Mark all articles processed
    await Article.updateMany(
      { _id: { $in: group.map((a) => a._id) } },
      { processed: true }
    );
  }

  console.log("✅ Verification complete: Events created");
};
