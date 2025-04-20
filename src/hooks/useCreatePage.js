import { useState } from "react";
import { describeImage } from "../ai/describeImage";

/**
 * Custom hook to manage caption generation logic for Taglet.
 * Supports image upload, AI captioning, typing animation, and state management.
 */
export default function useCreatePage(fileInputRef) {
  // === Upload State ===
  const [image, setImage] = useState(null); // For preview
  const [file, setFile] = useState(null); // Raw file object

  // === User Inputs ===
  const [mood, setMood] = useState("");
  const [style, setStyle] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [isReel, setIsReel] = useState(false); // ✅ Reel support toggle

  // === Output State ===
  const [caption, setCaption] = useState("");
  const [displayedCaption, setDisplayedCaption] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [loading, setLoading] = useState(false);

  /**
   * Handle file input from user
   */
  const handleImageUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setImage(URL.createObjectURL(uploadedFile));
    }
  };

  /**
   * Reset all state to initial
   */
  const clearImage = () => {
    setImage(null);
    setFile(null);
    setCaption("");
    setDisplayedCaption("");
    setHashtags("");
    if (fileInputRef?.current) fileInputRef.current.value = "";
  };

  /**
   * Call the backend AI function to generate captions and hashtags
   */
  const handleGenerateCaptions = async () => {
    if (!file) return alert("Please upload an image first.");
    setLoading(true);
    setDisplayedCaption("");

    try {
      // 🧠 Call AI service (pass isReel flag to influence prompt)
      const result = await describeImage({
        file,
        mood,
        style,
        customMessage,
        isReel, // ✅ Include reel context
      });

      setCaption(result.caption);
      setHashtags(result.hashtags);

      // ✨ Typing animation
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

  /**
   * Copy final caption and hashtags to clipboard
   */
  const copyAll = () => {
    const fullText = `${caption || ""}\n\n${hashtags || ""}`;
    navigator.clipboard.writeText(fullText);
  };

  return {
    // Upload + file
    image,
    file,

    // Inputs
    mood,
    setMood,
    style,
    setStyle,
    customMessage,
    setCustomMessage,
    isReel,
    setIsReel,

    // Output
    caption,
    displayedCaption,
    hashtags,
    loading,

    // Functions
    handleImageUpload,
    handleGenerateCaptions,
    clearImage,
    copyAll,
  };
}
