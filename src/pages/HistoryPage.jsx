import { useState } from "react";
import { useHistory } from "../hooks/useHistory";

export default function HistoryPage() {
  const { history, loading } = useHistory();
  const [selectedItem, setSelectedItem] = useState(null);

  const handleCopy = (text) => navigator.clipboard.writeText(text);

  if (loading) return <p className="text-center py-10">Loading history...</p>;

  if (history.length === 0)
    return <p className="text-center py-10">No history yet.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 px-4 py-10">
      <h1 className="text-4xl font-extrabold text-purple-700 mb-8 text-center">
        📜 Your Caption History
      </h1>

      <div className="grid gap-6 max-w-4xl mx-auto overflow-y-auto max-h-[75vh] scroll-smooth scrollbar-thin scrollbar-thumb-purple-300">
        {history.map((item) => (
          <div
            key={item.$id}
            onClick={() => setSelectedItem(item)}
            className="flex items-start gap-4 bg-white p-4 rounded-xl shadow border border-purple-200 transition-transform hover:scale-[1.02] hover:shadow-lg cursor-pointer"
          >
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt="Preview"
                className="w-24 h-24 object-cover rounded border"
              />
            )}

            <div className="flex-1">
              <p className="text-gray-800 mb-1 whitespace-pre-wrap">
                <strong>📝 Caption:</strong> {item.caption}
              </p>
              <p className="text-purple-700 text-sm break-words">
                <strong>🏷️ Hashtags:</strong> {item.hashtags}
              </p>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>🕒 {new Date(item.$createdAt).toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-200">
          <div className="bg-white w-[90%] max-w-sm max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-5 space-y-4 relative transform transition-transform duration-200 scale-100">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
              onClick={() => setSelectedItem(null)}
            >
              ❌
            </button>

            {selectedItem.imageUrl && (
              <img
                src={selectedItem.imageUrl}
                alt="Preview"
                className="w-full object-cover rounded border"
              />
            )}

            <div>
              <h3 className="font-semibold text-purple-700">📝 Caption</h3>
              <p className="text-gray-700 whitespace-pre-wrap">
                {selectedItem.caption}
              </p>
              <button
                onClick={() => handleCopy(selectedItem.caption)}
                className="mt-1 text-xs text-purple-600 hover:underline"
              >
                📋 Copy Caption
              </button>
            </div>

            <div>
              <h3 className="font-semibold text-purple-700">🏷️ Hashtags</h3>
              <p className="text-purple-600 break-words">
                {selectedItem.hashtags}
              </p>
              <button
                onClick={() => handleCopy(selectedItem.hashtags)}
                className="mt-1 text-xs text-purple-600 hover:underline"
              >
                📋 Copy Hashtags
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
