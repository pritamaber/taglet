// src/components/Loader.jsx
export default function Loader() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-500 border-opacity-50" />
    </div>
  );
}
