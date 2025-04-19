import { useRef } from "react";
import useCreatePage from "../hooks/useCreatePage";
import Navbar from "../components/Navbar";
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

  // Save post to Appwrite
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
    <>
      <div className="min-h-screen bg-gray-50 flex items-start justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl space-y-10">
          {/* Page Header */}
          <header className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">
                Taglet.in Caption Generator
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Upload an image, select a vibe, and let AI craft the perfect
                caption.
              </p>
            </div>
            {caption && (
              <button
                onClick={copyAll}
                className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition"
              >
                📋 Copy All
              </button>
            )}
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            {/* === Upload & Options === */}
            <div className="bg-white p-6 rounded-lg shadow border">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload an image
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />

              {/* Style and mood controls */}
              <div className="mt-4 space-y-3">
                {/* Mood Dropdown */}
                <select
                  id="mood"
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">🎭 Select a mood (optional)</option>
                  <option value="funny">😆 Funny</option>
                  <option value="inspirational">💡 Inspirational</option>
                  <option value="aesthetic">🎨 Aesthetic</option>
                  <option value="romantic">💖 Romantic</option>
                  <option value="sarcastic">🙃 Sarcastic</option>
                  <option value="edgy">⚡ Edgy</option>
                  <option value="motivational">🔥 Motivational</option>
                  <option value="sad">😢 Sad</option>
                  <option value="celebratory">🎉 Celebratory</option>
                  <option value="chill">🧘 Chill</option>
                  <option value="mysterious">🕵️ Mysterious</option>
                  <option value="trendy">📈 Trendy</option>
                  <option value="cute">🐾 Cute</option>
                  <option value="bold">💥 Bold</option>
                  <option value="vintage">📸 Vintage</option>
                </select>

                {/* Style Dropdown */}
                <select
                  id="style"
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">🧢 Select a style (optional)</option>
                  <option value="witty">😆 Witty</option>
                  <option value="elegant">💎 Elegant</option>
                  <option value="trendy">📈 Trendy</option>
                  <option value="professional">🧠 Professional</option>
                  <option value="casual">😎 Casual</option>
                  <option value="minimal">🌿 Minimal</option>
                  <option value="bold">💥 Bold</option>
                  <option value="playful">🎲 Playful</option>
                  <option value="luxury">👑 Luxury</option>
                  <option value="grunge">🖤 Grunge</option>
                  <option value="vintage">📷 Vintage</option>
                  <option value="youthful">🧃 Youthful</option>
                  <option value="artsy">🎭 Artsy</option>
                  <option value="geeky">🤓 Geeky</option>
                  <option value="clean">🧼 Clean</option>
                </select>

                {/* Custom Message Input */}
                <input
                  type="text"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Add a custom message (optional)"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="mt-6 flex space-x-3">
                <button
                  onClick={handleGenerateCaptions}
                  disabled={loading || !image}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
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

            {/* === Right Side: Preview === */}
            {image && (
              <div className="bg-white p-6 rounded-lg shadow border relative">
                <img
                  src={image}
                  alt="Preview"
                  className="w-full h-64 object-contain rounded border"
                />

                {loading ? (
                  <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center rounded">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                    <p className="text-sm text-blue-800 mt-3">
                      Generating magic...
                    </p>
                  </div>
                ) : (
                  <>
                    {caption && (
                      <div className="mt-4">
                        <h3 className="text-lg font-semibold">📝 Caption</h3>
                        <p className="italic text-gray-700 mt-1 whitespace-pre-wrap">
                          {caption}
                        </p>
                      </div>
                    )}

                    {hashtags && (
                      <div className="mt-4">
                        <h3 className="text-lg font-semibold">🏷️ Hashtags</h3>
                        <div className="mt-1 text-sm text-blue-700 leading-relaxed break-words">
                          {hashtags
                            .split(/\s+/)
                            .filter((tag) => tag.startsWith("#"))
                            .map((tag) => tag.replace(/^\d+\.*\s*/, ""))
                            .join(" ")}
                        </div>
                      </div>
                    )}

                    {/* 💾 Save Button */}
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
    </>
  );
}
