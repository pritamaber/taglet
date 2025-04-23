// describeImage.js — Optimized for token efficiency
import { functions } from "../appwrite/appwriteConfig";
import imageCompression from "browser-image-compression";

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

const compressImage = async (file) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1024,
    useWebWorker: true,
  };
  const compressedFile = await imageCompression(file, options);
  return compressedFile;
};

export const describeImage = async ({ file, mood, style, customMessage }) => {
  try {
    const compressed = await compressImage(file);
    const base64WithHeader = await toBase64(compressed);
    const cleanBase64 = base64WithHeader.split(",")[1]; // Strip data:image/...;base64,

    const response = await functions.createExecution(
      import.meta.env.VITE_APPWRITE_FUNCTION_ID_GENERATE,
      JSON.stringify({ base64Image: cleanBase64, mood, style, customMessage }),
      false
    );

    const parsed = JSON.parse(response.responseBody);

    return {
      caption: parsed.caption || "⚠️ No caption returned.",
      hashtags: parsed.hashtags || "#nooutput",
    };
  } catch (err) {
    console.error("❌ Error talking to Appwrite Function:", err);
    return {
      caption: "❌ Failed to generate caption.",
      hashtags: "#error",
    };
  }
};
