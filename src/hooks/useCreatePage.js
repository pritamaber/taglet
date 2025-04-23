import { useState } from "react";
import { toast } from "react-hot-toast";
import { describeImage } from "../ai/describeImage";
import imageCompression from "browser-image-compression";
import { storage, ID, databases } from "../appwrite/appwriteConfig";
import { useSaved } from "../hooks/useSaved.jsx";
import { useAuth } from "../context/AuthContext";

export default function useCreatePage(fileInputRef) {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [mood, setMood] = useState("");
  const [style, setStyle] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [isReel, setIsReel] = useState(false);
  const [caption, setCaption] = useState("");
  const [displayedCaption, setDisplayedCaption] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [loading, setLoading] = useState(false);

  const { savePost } = useSaved();
  const { user, setUser } = useAuth();

  const handleImageUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setImage(URL.createObjectURL(uploadedFile));
    }
  };

  const clearImage = () => {
    setImage(null);
    setFile(null);
    setCaption("");
    setDisplayedCaption("");
    setHashtags("");
    if (fileInputRef?.current) fileInputRef.current.value = "";
  };

  const uploadCompressedImage = async () => {
    if (!file) return null;

    try {
      const compressed = await imageCompression(file, {
        maxSizeMB: 0.2,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      });

      const compressedFile = new File([compressed], file.name, {
        type: file.type,
      });

      const uploaded = await storage.createFile(
        import.meta.env.VITE_APPWRITE_BUCKET_ID_HISTORY,
        ID.unique(),
        compressedFile
      );

      const previewUrl = storage.getFilePreview(
        import.meta.env.VITE_APPWRITE_BUCKET_ID_HISTORY,
        uploaded.$id,
        400,
        400,
        "top",
        60
      );

      const imageUrl =
        typeof previewUrl === "string" ? previewUrl : previewUrl.href;
      if (!imageUrl) throw new Error("⚠️ imageUrl generation failed.");
      return imageUrl;
    } catch (err) {
      console.error("❌ Image upload failed:", err);
      return null;
    }
  };

  const handleGenerateCaptions = async () => {
    if (!file) return alert("Please upload an image first.");
    if (!user || user.credits <= 0) {
      toast.error("You don’t have enough credits. Please upgrade your plan.");
      return;
    }

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

      const imageUrl = await uploadCompressedImage();
      if (!imageUrl)
        throw new Error("📛 imageUrl missing — history upload failed.");

      await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID_HISTORY,
        ID.unique(),
        {
          userId: user.$id,
          caption: result.caption,
          hashtags: result.hashtags,
          imageUrl,
        }
      );

      const updatedCredits = user.credits - 1;

      await databases.updateDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID_USERS,
        user.$id,
        { credits: updatedCredits }
      );

      const updatedUser = await databases.getDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID_USERS,
        user.$id
      );

      setUser(updatedUser);
      toast.success("✅ Caption generated, saved to history");
    } catch (err) {
      console.error("❌ Caption generation failed:", err);
      toast.error(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user || !caption || !hashtags) {
      toast("⚠️ Cannot save: Missing caption or user.");
      return;
    }

    const imageUrl = await uploadCompressedImage();
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
    customMessage,
    setCustomMessage,
    isReel,
    setIsReel,
    caption,
    displayedCaption,
    hashtags,
    loading,
    handleImageUpload,
    handleGenerateCaptions,
    clearImage,
    copyAll,
    uploadCompressedImage,
    handleSave,
  };
}
