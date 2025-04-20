import { useEffect, useState } from "react";
import { useSaved } from "../hooks/useSaved";
import { useAuth } from "../context/AuthContext";

export default function SavedPage() {
  const { user } = useAuth();
  const { fetchSavedPosts, deletePost } = useSaved();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterMood, setFilterMood] = useState("");
  const [filterStyle, setFilterStyle] = useState("");

  useEffect(() => {
    const loadSaved = async () => {
      if (!user) return;
      const data = await fetchSavedPosts(user.$id);
      setPosts(data);
      setLoading(false);
    };
    loadSaved();
  }, [user]);

  const handleDelete = async (id) => {
    const confirmed = confirm("Are you sure you want to delete this post?");
    if (!confirmed) return;

    const result = await deletePost(id);
    if (result.success) {
      setPosts((prev) => prev.filter((post) => post.$id !== id));
    } else {
      alert("Failed to delete: " + result.error);
    }
  };

  const filteredPosts = posts.filter((post) => {
    return (
      (!filterMood || post.mood === filterMood) &&
      (!filterStyle || post.style === filterStyle)
    );
  });

  // Emoji-enhanced options for filters
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
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 px-4 py-10">
      <h1 className="text-4xl font-extrabold text-purple-700 mb-8 text-center">
        📁 Your Saved Captions
      </h1>

      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <select
          value={filterMood}
          onChange={(e) => setFilterMood(e.target.value)}
          className="border border-purple-300 bg-white text-sm px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
        >
          <option value="">🎭 Filter by mood</option>
          {moodOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <select
          value={filterStyle}
          onChange={(e) => setFilterStyle(e.target.value)}
          className="border border-purple-300 bg-white text-sm px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
        >
          <option value="">🧢 Filter by style</option>
          {styleOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {(filterMood || filterStyle) && (
          <button
            onClick={() => {
              setFilterMood("");
              setFilterStyle("");
            }}
            className="text-sm text-purple-700 bg-purple-100 px-4 py-2 rounded-md hover:bg-purple-200 transition"
          >
            🔄 All Posts
          </button>
        )}
      </div>

      {loading ? (
        <p className="text-center text-purple-600 text-sm">
          Loading your saved posts...
        </p>
      ) : filteredPosts.length === 0 ? (
        <p className="text-center text-gray-600 text-sm">
          No matching results found.
        </p>
      ) : (
        <div className="grid gap-6 max-w-4xl mx-auto">
          {filteredPosts.map((post) => (
            <div
              key={post.$id}
              className="flex items-start gap-4 bg-white p-4 rounded-xl shadow border border-purple-200"
            >
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded border"
                />
              )}

              <div className="flex-1">
                <p className="text-gray-800 mb-1 whitespace-pre-wrap">
                  <strong>📝 Caption:</strong> {post.caption}
                </p>
                <p className="text-purple-700 text-sm break-words">
                  <strong>🏷️ Hashtags:</strong> {post.hashtags}
                </p>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  {post.mood && <span>🎭 {post.mood}</span>}
                  {post.style && <span>🧢 {post.style}</span>}
                  <span>🕒 {new Date(post.createdAt).toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => handleDelete(post.$id)}
                className="text-red-500 text-xs hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
