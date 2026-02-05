import Groq from "groq-sdk";
export const generateSummary = async (headline) => {
    const client = new Groq({
        apiKey: process.env.GROQ_API_KEY
    });
  const chatCompletion = await client.chat.completions.create({
    model: "llama3-8b-8192",
    messages: [
      {
        role: "system",
        content:
          "You are NewsIQ, a professional verified news summarizer."
      },
      {
        role: "user",
        content: `
Headline: ${headline}

Task:
1. Write a 2-3 line summary.
2. Write one line: Why it matters.

Format:
Summary: ...
Why it matters: ...
        `
      }
    ]
  });

  return chatCompletion.choices[0].message.content;
};
