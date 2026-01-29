import axios from "axios";
import Article from "../models/Article.js";

export const fetchNews = async () => {
  try {
    const url = `https://newsapi.org/v2/top-headlines?language=en&pageSize=20&apiKey=${process.env.NEWS_API_KEY}`;

    const response = await axios.get(url);
    const articles = response.data.articles;

    for (const item of articles) {
      if (!item.url || !item.title) continue;

      await Article.updateOne(
        { url: item.url },
        {
          title: item.title,
          content: item.description,
          source: item.source.name,
          publishedAt: item.publishedAt
        },
        { upsert: true }
      );
    }

    console.log(`📰 Fetched ${articles.length} articles`);
  } catch (error) {
    console.error("❌ Error fetching news:", error.message);
  }
};
