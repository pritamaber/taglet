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

  // Handle delete
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

  // Filtered list
  const filteredPosts = posts.filter((post) => {
    return (
      (!filterMood || post.mood === filterMood) &&
      (!filterStyle || post.style === filterStyle)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        📁 Saved Captions
      </h1>

      {/* Filters */}
      <div className="flex gap-4 justify-center mb-6">
        <select
          value={filterMood}
          onChange={(e) => setFilterMood(e.target.value)}
          className="border rounded px-3 py-2 text-sm"
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

        <select
          value={filterStyle}
          onChange={(e) => setFilterStyle(e.target.value)}
          className="border rounded px-3 py-2 text-sm"
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
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading your saved posts...</p>
      ) : filteredPosts.length === 0 ? (
        <p className="text-center text-gray-600">No matching results found.</p>
      ) : (
        <div className="grid gap-6 max-w-4xl mx-auto">
          {filteredPosts.map((post) => (
            <div
              key={post.$id}
              className="bg-white p-6 rounded-lg shadow border relative"
            >
              <p className="text-gray-700 mb-2 whitespace-pre-wrap">
                <strong>📝 Caption:</strong> {post.caption}
              </p>
              <p className="text-blue-700 text-sm break-words">
                <strong>🏷️ Hashtags:</strong> {post.hashtags}
              </p>
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                {post.mood && <span>🎭 Mood: {post.mood}</span>}
                {post.style && <span>🧢 Style: {post.style}</span>}
                <span>🕒 {new Date(post.createdAt).toLocaleString()}</span>
              </div>

              {/* 🗑️ Delete Button */}
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
