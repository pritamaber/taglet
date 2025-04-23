// main.js — Optimized Appwrite Function with efficient prompt + parsing
import { OpenAI } from "openai";

export default async ({ req, res, log }) => {
  try {
    const {
      base64Image,
      mood,
      style,
      customMessage,
      isReel = false,
    } = JSON.parse(req.body || "{}");

    if (!base64Image) {
      return res.json({
        caption: "",
        hashtags: "",
        error: "Base64 image is required.",
      });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const prompt = isReel
      ? `Generate a bold Gen-Z Reel caption (max 20 words) and 10 modern hashtags. Use this structure:

Caption: {caption}
---
Hashtags:
{#hashtag1 #hashtag2 ...}

Mood: ${mood || "any"}
Style: ${style || "default"}
Message: ${customMessage || "none"}`
      : `Create a scroll-stopping Instagram image caption (max 25 words) and 20 powerful hashtags.

Format exactly as:
Caption: {caption}
---
Hashtags:
{#tag1 #tag2 ...}

Mood: ${mood || "any"}
Style: ${style || "default"}
Message: ${customMessage || "none"}`;

    const messages = [
      {
        role: "user",
        content: [
          { type: "text", text: prompt },
          {
            type: "image_url",
            image_url: {
              url: `data:image/jpeg;base64,${base64Image}`,
            },
          },
        ],
      },
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages,
      max_tokens: 350, // reduced from 600
    });

    const content = response.choices[0]?.message?.content || "";

    const caption = content.match(/Caption:\s*(.*?)\n---/s)?.[1]?.trim();
    const hashtags = content.match(/Hashtags:\s*([\s\S]*)/)?.[1]?.trim();

    return res.json({
      caption: caption || "⚠️ No caption returned.",
      hashtags: hashtags || "#taglet #ai",
    });
  } catch (err) {
    log("❌ Error: " + err.message);
    return res.json({
      caption: "",
      hashtags: "",
      error: "AI generation failed. Please try again.",
    });
  }
};
