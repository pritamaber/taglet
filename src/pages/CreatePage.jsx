import { useRef } from "react";
import useCreatePage from "../hooks/useCreatePage";
import { useSaved } from "../hooks/useSaved";
import { useAuth } from "../context/AuthContext";

export default function CreatePage() {
  const fileInputRef = useRef(null);

  const {
    image,
    mood,
    setMood,
    style,
    setStyle,
    caption,
    hashtags,
    loading,
    setCustomMessage,
    customMessage,
    handleImageUpload,
    handleGenerateCaptions,
    clearImage,
    copyAll,
  } = useCreatePage(fileInputRef);

  const { savePost } = useSaved();
  const { user } = useAuth();

  const handleSave = async () => {
    if (!user || !caption || !hashtags) {
      alert("⚠️ Cannot save: Missing caption or user.");
      return;
    }

    const result = await savePost({
      userId: user.$id,
      caption,
      hashtags,
      mood,
      style,
    });

    if (result.success) {
      alert("✅ Saved successfully!");
    } else {
      alert("❌ Failed to save: " + result.error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 px-4 py-12 flex justify-center">
      <div className="w-full max-w-6xl space-y-10">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-purple-700">
              🧠 AI Caption Generator
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Upload an image, pick your vibe, and let Taglet create magic ✨
            </p>
          </div>
          {caption && (
            <button
              onClick={copyAll}
              className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded hover:bg-purple-200 transition"
            >
              📋 Copy All
            </button>
          )}
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow border space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Upload an image
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
            />

            <select
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="w-full border border-purple-200 rounded-md py-2 px-3 text-sm shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
            >
              <option value="">🎭 Select a mood</option>
              <option value="funny">😆 Funny</option>
              <option value="inspirational">💡 Inspirational</option>
              <option value="aesthetic">🎨 Aesthetic</option>
              <option value="romantic">💖 Romantic</option>
              <option value="motivational">🔥 Motivational</option>
              <option value="bold">💥 Bold</option>
              <option value="trendy">📈 Trendy</option>
              <option value="cute">🐾 Cute</option>
            </select>

            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full border border-purple-200 rounded-md py-2 px-3 text-sm shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
            >
              <option value="">🧢 Select a style</option>
              <option value="witty">😆 Witty</option>
              <option value="elegant">💎 Elegant</option>
              <option value="minimal">🌿 Minimal</option>
              <option value="clean">🧼 Clean</option>
              <option value="professional">🧠 Professional</option>
              <option value="luxury">👑 Luxury</option>
            </select>

            <input
              type="text"
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Optional message to guide AI"
              className="w-full border border-purple-200 rounded-md py-2 px-3 text-sm shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />

            <div className="flex gap-3 pt-3">
              <button
                onClick={handleGenerateCaptions}
                disabled={loading || !image}
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded font-semibold hover:scale-105 disabled:bg-purple-300"
              >
                ✨ Generate Captions
              </button>
              <button
                onClick={clearImage}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
              >
                Clear
              </button>
            </div>
          </div>

          {image && (
            <div className="bg-white p-6 rounded-xl shadow border relative">
              <img
                src={image}
                alt="Preview"
                className="w-full h-64 object-contain rounded border"
              />

              {loading ? (
                <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center rounded">
                  <div className="animate-spin h-8 w-8 border-t-2 border-purple-500 border-b-2 rounded-full"></div>
                  <p className="text-sm text-purple-700 mt-3">Generating...</p>
                </div>
              ) : (
                <>
                  {caption && (
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold text-purple-700">
                        📝 Caption
                      </h3>
                      <p className="italic text-gray-800 mt-1 whitespace-pre-wrap">
                        {caption}
                      </p>
                    </div>
                  )}

                  {hashtags && (
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold text-purple-700">
                        🏷️ Hashtags
                      </h3>
                      <div className="mt-1 text-sm text-purple-600 leading-relaxed break-words">
                        {hashtags
                          .split(/\s+/)
                          .filter((tag) => tag.startsWith("#"))
                          .map((tag) => tag.replace(/^\d+\.*\s*/, ""))
                          .join(" ")}
                      </div>
                    </div>
                  )}

                  {caption && hashtags && (
                    <div className="mt-4">
                      <button
                        onClick={handleSave}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow text-sm"
                      >
                        💾 Save this post
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
