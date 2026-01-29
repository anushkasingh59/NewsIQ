import Article from "../models/Article.js";

export const resetArticles = async () => {
  await Article.updateMany({}, { processed: false });
  console.log("✅ Reset all articles to processed:false");
};
