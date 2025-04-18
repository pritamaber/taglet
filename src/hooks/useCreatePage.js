// ✅ useCreatePage.js — Enhanced caption animation and logic
import { useState } from "react";
import { describeImage } from "../ai/describeImage";

export default function useCreatePage(fileInputRef) {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);

  const [mood, setMood] = useState("");
  const [style, setStyle] = useState(""); // 🎨 Style option
  const [customMessage, setCustomMessage] = useState("");

  const [caption, setCaption] = useState("");
  const [displayedCaption, setDisplayedCaption] = useState(""); // 🖊️ Animated caption
  const [hashtags, setHashtags] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle file input
  const handleImageUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setImage(URL.createObjectURL(uploadedFile));
    }
  };

  // Clear everything
  const clearImage = () => {
    setImage(null);
    setFile(null);
    setCaption("");
    setDisplayedCaption("");
    setHashtags("");
    if (fileInputRef?.current) fileInputRef.current.value = "";
  };

  // 👇 Generate caption and hashtags using backend function
  const handleGenerateCaptions = async () => {
    if (!file) return alert("Please upload an image first.");
    setLoading(true);
    setDisplayedCaption("");

    try {
      const result = await describeImage({ file, mood, style, customMessage }); // 🧠 AI call
      setCaption(result.caption);
      setHashtags(result.hashtags);

      // Typing animation for caption
      let index = 0;
      const interval = setInterval(() => {
        setDisplayedCaption((prev) => prev + result.caption.charAt(index));
        index++;
        if (index >= result.caption.length) clearInterval(interval);
      }, 25);
    } catch (err) {
      console.error("❌ Caption generation failed:", err);
      alert("Failed to generate caption. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 📝 Copy caption + hashtags to clipboard
  const copyAll = () => {
    const fullText = `${caption || ""}\n\n${hashtags || ""}`;
    navigator.clipboard.writeText(fullText);
  };

  return {
    image,
    file,
    mood,
    setMood,
    style,
    setStyle,
    caption,
    displayedCaption,
    hashtags,
    loading,
    setCustomMessage,
    customMessage,
    handleImageUpload,
    handleGenerateCaptions, // ✅ exposed correctly
    clearImage,
    copyAll,
  };
}
