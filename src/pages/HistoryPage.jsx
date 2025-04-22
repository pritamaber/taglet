import { useHistory } from "../hooks/useHistory";

export default function HistoryPage() {
  const { history, loading } = useHistory();

  if (loading) return <p className="text-center py-10">Loading history...</p>;

  if (history.length === 0)
    return <p className="text-center py-10">No history yet.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 px-4 py-10">
      <h1 className="text-4xl font-extrabold text-purple-700 mb-8 text-center">
        📜 Your Caption History
      </h1>

      <div className="grid gap-6 max-w-4xl mx-auto">
        {history.map((item) => (
          <div
            key={item.$id}
            className="flex items-start gap-4 bg-white p-4 rounded-xl shadow border border-purple-200"
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
    </div>
  );
}
