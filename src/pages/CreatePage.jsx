import { useRef, useState } from "react";
import useCreatePage from "../hooks/useCreatePage";

export default function CreatePage() {
  const fileInputRef = useRef(null);
  const resultRef = useRef(null);
  const [saving, setSaving] = useState(false);

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
    isReel,
    setIsReel,
    handleSave,
  } = useCreatePage(fileInputRef);

  const scrollToResult = () => {
    if (window.innerWidth < 768 && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const onGenerateClick = async () => {
    await handleGenerateCaptions();
    scrollToResult();
  };

  const moodOptions = [
    { label: "😆 Funny", value: "funny" },
    { label: "💡 Inspirational", value: "inspirational" },
    { label: "🎨 Aesthetic", value: "aesthetic" },
    { label: "💖 Romantic", value: "romantic" },
    { label: "🔥 Motivational", value: "motivational" },
    { label: "💥 Bold", value: "bold" },
    { label: "📈 Trendy", value: "trendy" },
    { label: "🐾 Cute", value: "cute" },
    { label: "💅 Sassy", value: "sassy" },
    { label: "🕰️ Nostalgic", value: "nostalgic" },
    { label: "⚡ Edgy", value: "edgy" },
    { label: "🧘 Calm", value: "calm" },
    { label: "🕵️ Mysterious", value: "mysterious" },
    { label: "🎉 Celebratory", value: "celebratory" },
    { label: "😢 Emotional", value: "emotional" },
  ];

  const styleOptions = [
    { label: "😆 Witty", value: "witty" },
    { label: "💎 Elegant", value: "elegant" },
    { label: "🌿 Minimal", value: "minimal" },
    { label: "🧼 Clean", value: "clean" },
    { label: "🧠 Professional", value: "professional" },
    { label: "👑 Luxury", value: "luxury" },
    { label: "📸 Vintage", value: "vintage" },
    { label: "🎲 Playful", value: "playful" },
    { label: "🙃 Sarcastic", value: "sarcastic" },
    { label: "🖤 Dark", value: "dark" },
    { label: "🧃 Youthful", value: "youthful" },
    { label: "🎭 Artsy", value: "artsy" },
    { label: "📈 Trendy", value: "trendy" },
    { label: "💬 Relatable", value: "relatable" },
  ];

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
        </header>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-1/2 bg-white p-6 rounded-xl shadow border space-y-4">
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

            <label className="flex items-center gap-2 text-sm font-medium text-purple-700">
              <input
                type="checkbox"
                checked={isReel}
                onChange={() => setIsReel(!isReel)}
                className="h-4 w-4 text-purple-600 border-gray-300 rounded"
              />
              Treat this as a Reel
            </label>

            <select
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="w-full border border-purple-200 rounded-md py-2 px-3 text-sm shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
            >
              <option value="">🎭 Select a mood</option>
              {moodOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full border border-purple-200 rounded-md py-2 px-3 text-sm shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
            >
              <option value="">🧢 Select a style</option>
              {styleOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <input
              type="text"
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Optional message to guide AI"
              className="w-full border border-purple-200 rounded-md py-2 px-3 text-sm shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />

            <p className="text-xs text-gray-500 text-center mt-2 italic">
              💡 AI-powered content: Results may vary. Regenerate if needed. ⚠️
              Each generation costs <strong>1 credit</strong>
            </p>

            <div className="flex gap-3 pt-3">
              <button
                onClick={onGenerateClick}
                disabled={loading || !image}
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded font-semibold hover:scale-105 active:scale-95 transition transform duration-150 disabled:bg-purple-300"
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
            <div
              ref={resultRef}
              className="w-full md:w-1/2 bg-white p-6 rounded-xl shadow border relative overflow-y-auto max-h-[700px]"
            >
              <h2 className="text-xl font-bold text-purple-700 mb-2">
                Generated Post
              </h2>
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
                    <div className="mt-4 space-y-2">
                      <h3 className="text-lg font-semibold text-purple-700">
                        📝 {isReel ? "Reel Caption" : "Caption"}
                      </h3>
                      <p className="italic text-gray-800 whitespace-pre-wrap">
                        {caption}
                      </p>
                      <button
                        onClick={() => navigator.clipboard.writeText(caption)}
                        className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded hover:bg-purple-200 transition"
                      >
                        📋 Copy Caption
                      </button>
                    </div>
                  )}

                  {hashtags && (
                    <div className="mt-4 space-y-2">
                      <h3 className="text-lg font-semibold text-purple-700">
                        🏷️ Hashtags
                      </h3>
                      <div className="text-sm text-purple-600 leading-relaxed break-words">
                        {hashtags
                          .split(/\s+/)
                          .filter((tag) => tag.startsWith("#"))
                          .map((tag) => tag.replace(/^\d+\.*\s*/, ""))
                          .join(" ")}
                      </div>
                      <button
                        onClick={() => navigator.clipboard.writeText(hashtags)}
                        className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded hover:bg-purple-200 transition"
                      >
                        📋 Copy Hashtags
                      </button>
                    </div>
                  )}

                  {caption && hashtags && (
                    <>
                      <button
                        onClick={() => {
                          const text = `${caption}\n\n${hashtags}`;
                          const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
                            text
                          )}`;
                          window.open(url, "_blank");
                        }}
                        className="mt-3 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm transition"
                      >
                        📤 Share on WhatsApp
                      </button>

                      <div className="mt-4">
                        <button
                          onClick={handleSave}
                          disabled={saving}
                          className={`w-full flex items-center justify-center gap-2 text-white px-4 py-2 rounded shadow text-sm transition duration-150 transform 
                            ${
                              saving
                                ? "bg-green-400 cursor-not-allowed"
                                : "bg-green-600 hover:bg-green-700 active:scale-95 focus:scale-95 focus:outline-none"
                            }`}
                        >
                          {saving ? (
                            <>
                              <svg
                                className="w-4 h-4 animate-spin"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                                ></path>
                              </svg>
                              Saving...
                            </>
                          ) : (
                            <>💾 Save this post</>
                          )}
                        </button>
                      </div>
                    </>
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
