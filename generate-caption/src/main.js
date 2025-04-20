// main.js — Appwrite Cloud Function with Reel + Image Prompt Logic
import { OpenAI } from "openai";

export default async ({ req, res, log }) => {
  try {
    // ✅ Parse incoming request
    const {
      base64Image,
      mood,
      style,
      customMessage,
      isReel = false,
    } = JSON.parse(req.body || "{}");

    // ✅ Basic check
    if (!base64Image) {
      return res.json({
        caption: "",
        hashtags: "",
        error: "Base64 image is required.",
      });
    }

    // ✅ Init OpenAI
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    // ✅ Build prompt
    const prompt = isReel
      ? `You're a viral Reels expert on Instagram.

Generate a high-impact hook-style caption and 10 Instagram hashtags for the REEL below.

- Caption must be under 20 words.
- Avoid hashtags in the caption.
- Use bold, punchy, Gen-Z tone.
- Hashtags must be relevant, modern, and Reel-optimized.

Mood: ${mood || "any"}
Style: ${style || "default"}
Message: ${customMessage || "none"}`
      : `You are a professional social media growth expert.

Generate a short, highly engaging, emotionally resonant caption for the Instagram IMAGE below. 
Make sure it is unique, scroll-stopping, and under 25 words. Avoid using hashtags in the caption itself.

Then generate exactly 20 diverse and high-performing Instagram hashtags that:
- Are directly relevant to the image’s mood and style
- Are a mix of broad, niche, and trending tags
- Have no numbers or duplicates
- Begin with #

Use a modern Gen-Z voice that resonates with creators and audiences alike.

Mood: ${mood || "any"}
Style: ${style || "default"}
Message: ${customMessage || "none"}`;

    // ✅ Construct messages for OpenAI Vision API
    const messages = [
      {
        role: "user",
        content: [
          { type: "text", text: prompt },
          {
            type: "image_url",
            image_url: { url: base64Image },
          },
        ],
      },
    ];

    // ✅ Call GPT-4 Vision API
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages,
      max_tokens: 600,
    });

    const content = response.choices[0]?.message?.content || "";
    const [rawCaption, hashtags] = content.split("Hashtags:");

    const caption = rawCaption?.replace(/^caption[:\-]?\s*/i, "").trim();

    return res.json({
      caption: caption || "⚠️ No caption returned.",
      hashtags: hashtags?.trim() || "#taglet #ai",
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
