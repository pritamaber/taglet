import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 text-gray-800">
      {/* === Hero Section === */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl sm:text-6xl font-extrabold tracking-tight"
        >
          Turn Images Into Viral Captions ⚡
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto"
        >
          Taglet uses AI to turn your uploaded images into engaging captions and
          hashtags ready for Instagram, powered by GPT-4 Vision. No creativity
          required.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-10 flex justify-center gap-6"
        >
          <Link
            to="/login"
            className="bg-purple-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow hover:bg-purple-700"
          >
            Try Taglet Now
          </Link>
          <a
            href="https://instagram.com/taglet.in.official"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 border border-purple-600 px-6 py-3 rounded-full text-lg font-semibold hover:bg-purple-50"
          >
            📸 Follow Us
          </a>
        </motion.div>
      </section>

      {/* === How It Works Section === */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          How Taglet Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-4xl mb-4">📤</div>
            <h3 className="text-xl font-semibold mb-2">Upload an Image</h3>
            <p className="text-gray-600">
              Pick any image from your device and upload it to Taglet to get
              started.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold mb-2">AI Analyzes Content</h3>
            <p className="text-gray-600">
              GPT-4 Vision understands your image and combines it with your
              vibe.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-4xl mb-4">📣</div>
            <h3 className="text-xl font-semibold mb-2">
              Get Captions & Hashtags
            </h3>
            <p className="text-gray-600">
              Instantly copy your viral-ready caption + tags, or save it for
              later.
            </p>
          </div>
        </div>
      </section>

      {/* === CTA Footer === */}
      <footer className="text-center py-10 text-sm text-gray-500">
        Built with ❤️ by Team Taglet ·
        <a
          href="https://taglet.in"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 underline"
        >
          taglet.in
        </a>
      </footer>
    </div>
  );
}
