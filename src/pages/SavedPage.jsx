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

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 px-4 py-10">
      <h1 className="text-4xl font-extrabold text-purple-700 mb-8 text-center">
        📁 Your Saved Captions
      </h1>

      <div className="flex gap-4 justify-center mb-8">
        <select
          value={filterMood}
          onChange={(e) => setFilterMood(e.target.value)}
          className="border border-purple-300 bg-white text-sm px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
        >
          <option value="">🎭 Filter by mood</option>
          <option value="funny">😆 Funny</option>
          <option value="inspirational">💡 Inspirational</option>
          <option value="aesthetic">🎨 Aesthetic</option>
          <option value="romantic">💖 Romantic</option>
          <option value="motivational">🔥 Motivational</option>
          <option value="cute">🐾 Cute</option>
          <option value="bold">💥 Bold</option>
          <option value="vintage">📸 Vintage</option>
        </select>

        <select
          value={filterStyle}
          onChange={(e) => setFilterStyle(e.target.value)}
          className="border border-purple-300 bg-white text-sm px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
        >
          <option value="">🧢 Filter by style</option>
          <option value="witty">😆 Witty</option>
          <option value="elegant">💎 Elegant</option>
          <option value="clean">🧼 Clean</option>
          <option value="minimal">🌿 Minimal</option>
          <option value="professional">🧠 Professional</option>
        </select>
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
              className="bg-white p-6 rounded-xl shadow-lg border border-purple-200 relative"
            >
              <p className="text-gray-800 mb-2 whitespace-pre-wrap">
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

              <button
                onClick={() => handleDelete(post.$id)}
                className="absolute top-2 right-2 text-red-500 text-sm hover:underline"
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
