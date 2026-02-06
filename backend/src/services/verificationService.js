import Article from "../models/Article.js";
import Event from "../models/Event.js";

// words we don’t care about
const STOP_WORDS = [
  "the", "is", "at", "on", "in", "for", "to", "of", "and", "with", "as",
  "by", "from", "that", "this", "it", "are"
];

// extract meaningful keywords from title
const extractKeywords = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z\s]/g, "")
    .split(" ")
    .filter(word => word.length > 3 && !STOP_WORDS.includes(word));
};

// check if two titles talk about the same thing
const areTitlesSimilar = (titleA, titleB) => {
  const aKeywords = extractKeywords(titleA);
  const bKeywords = extractKeywords(titleB);

  const common = aKeywords.filter(word => bKeywords.includes(word));
  return common.length >= 2; // similarity threshold
};

export const verifyAndCreateEvents = async () => {
  console.log("🔍 Running verification engine...");

  const articles = await Article.find({ processed: false });

  if (articles.length === 0) {
    console.log("✅ No new articles to verify");
    return;
  }

  const groupedEvents = [];

  for (let article of articles) {
    let added = false;

    for (let group of groupedEvents) {
      if (areTitlesSimilar(group[0].title, article.title)) {
        group.push(article);
        added = true;
        break;
      }
    }

    if (!added) {
      groupedEvents.push([article]);
    }
  }

  for (let group of groupedEvents) {
    const sources = [...new Set(group.map(a => a.source))];

    // better default trust logic
    let trustScore = 70;
    if (sources.length >= 2) trustScore = 85;
    if (sources.length >= 3) trustScore = 95;

    await Event.create({
      headline: group[0].title,
      trustScore,
      sources,
      category: "General",
      region: "World"
    });

    await Article.updateMany(
      { _id: { $in: group.map(a => a._id) } },
      { processed: true }
    );
  }

  console.log("✅ Verification complete: Events created");
};