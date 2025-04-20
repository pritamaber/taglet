import { useState } from "react";
import { toast } from "react-hot-toast";
import { describeImage } from "../ai/describeImage";
import imageCompression from "browser-image-compression";
import { storage, ID } from "../appwrite/appwriteConfig";
import { useSaved } from "../hooks/useSaved.jsx";
import { useAuth } from "../context/AuthContext";
/**
 * Custom hook to manage caption generation logic for Taglet.
 * Supports image upload, AI captioning, typing animation, and Appwrite image compression/upload.
 */
export default function useCreatePage(fileInputRef) {
  // === Upload State ===
  const [image, setImage] = useState(null); // For preview
  const [file, setFile] = useState(null); // Raw file object

  // === User Inputs ===
  const [mood, setMood] = useState("");
  const [style, setStyle] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [isReel, setIsReel] = useState(false); // Reel support toggle

  // === Output State ===
  const [caption, setCaption] = useState("");
  const [displayedCaption, setDisplayedCaption] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [loading, setLoading] = useState(false);

  // === Import variable to facilate save post ===

  const { savePost } = useSaved();
  const { user } = useAuth();

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
   * Upload a compressed image to Appwrite bucket and return its preview URL
   */
  const uploadCompressedImage = async () => {
    if (!file) return null;

    try {
      const compressed = await imageCompression(file, {
        maxSizeMB: 0.2,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      });

      // ✅ Wrap blob into a File with a filename
      const compressedFile = new File([compressed], file.name, {
        type: file.type,
      });

      const uploaded = await storage.createFile(
        import.meta.env.VITE_APPWRITE_BUCKET_ID_CAPTION_IMAGES,
        ID.unique(),
        compressedFile
      );

      const imageUrl = storage.getFilePreview(
        import.meta.env.VITE_APPWRITE_BUCKET_ID_CAPTION_IMAGES,
        uploaded.$id
      );

      return imageUrl;
    } catch (err) {
      console.error("❌ Image compression/upload failed:", err);
      return null;
    }
  };

  /**
   * Call the backend AI function to generate captions and hashtags
   */
  const handleGenerateCaptions = async () => {
    if (!file) return alert("Please upload an image first.");
    setLoading(true);
    setDisplayedCaption("");

    try {
      const result = await describeImage({
        file,
        mood,
        style,
        customMessage,
        isReel,
      });

      setCaption(result.caption);
      setHashtags(result.hashtags);

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

  //  Function to save the post at CreatePage.jsx

  const handleSave = async () => {
    if (!user || !caption || !hashtags) {
      toast("⚠️ Cannot save: Missing caption or user.");
      return;
    }

    const imageUrl = await uploadCompressedImage();

    // ✅ Trim hashtags to 15 max to avoid Appwrite 255-char limit
    const trimmedHashtags = hashtags.split(" ").slice(0, 15).join(" ");

    const result = await savePost({
      userId: user.$id,
      caption,
      hashtags: trimmedHashtags,
      mood,
      style,
      imageUrl,
    });

    if (result.success) {
      toast.success("✅ Saved successfully!");
    } else {
      toast.error("❌ Failed to save");
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
    uploadCompressedImage,
    handleSave,
  };
}
